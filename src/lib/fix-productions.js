
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const SERVICE_ACCOUNT_PATH = path.join(__dirname, '../../serviceAccount.json');
const COLLECTION_NAME = 'productions';
// -------------------

/**
 * Main script function
 */
async function migrateProductions() {
  console.log('--- Firestore Productions Migration Script ---');

  // Check for --apply flag for write mode
  const isDryRun = !process.argv.includes('--apply');
  if (isDryRun) {
    console.log('\n[DRY RUN] No changes will be saved to the database. Use --apply flag to commit changes.');
  } else {
    console.log('\n[APPLY MODE] Changes WILL be saved to the database.');
  }

  try {
    // --- Initialize Firebase Admin SDK ---
    if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
        throw new Error(`Service account file not found at: ${SERVICE_ACCOUNT_PATH}. Make sure 'serviceAccount.json' is in the root of your project.`);
    }

    const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));

    // Fix for newline characters in private key if needed
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });

    const db = admin.firestore();
    console.log(`\n✅ Successfully connected to Firebase project: ${serviceAccount.project_id}`);

    // --- Fetch Productions ---
    const productionsRef = db.collection(COLLECTION_NAME);
    const snapshot = await productionsRef.get();

    if (snapshot.empty) {
      console.log(`\nNo documents found in the '${COLLECTION_NAME}' collection. Exiting.`);
      return;
    }

    console.log(`\nFound ${snapshot.size} documents to process...`);

    let modifiedCount = 0;
    const writeBatch = db.batch();

    // --- Process Each Document ---
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const updates = {};
      let needsUpdate = false;

      // Store original values for logging
      const oldValues = {
        currentFunding: data.currentFunding,
        currentAmount: data.currentAmount,
        targetAmount: data.targetAmount,
      };

      // 1. Ensure currentFunding exists
      if (data.currentFunding === undefined || data.currentFunding === null) {
        updates.currentFunding = data.currentAmount || 0;
        needsUpdate = true;
      } else {
        updates.currentFunding = data.currentFunding;
      }
      
      // 2. Mark fields for deletion
      const fieldsToDelete = {};
      if (data.currentAmount !== undefined) {
        fieldsToDelete.currentAmount = admin.firestore.FieldValue.delete();
        needsUpdate = true;
      }
      if (data.targetAmount !== undefined) {
        fieldsToDelete.targetAmount = admin.firestore.FieldValue.delete();
        needsUpdate = true;
      }
      
      // Log and batch write if changes are needed
      if (needsUpdate) {
        modifiedCount++;
        const finalUpdate = { ...updates, ...fieldsToDelete };
        
        console.log(`\n---------------------------------`);
        console.log(`📄 Document ID: ${doc.id}`);
        console.log('   [BEFORE]', oldValues);
        console.log('   [AFTER]', { currentFunding: finalUpdate.currentFunding, currentAmount: 'DELETED', targetAmount: 'DELETED' });
        
        if (!isDryRun) {
          writeBatch.update(doc.ref, finalUpdate);
        }
      } else {
         console.log(`\n---------------------------------`);
         console.log(`📄 Document ID: ${doc.id} - No changes needed.`);
      }
    }

    // --- Commit Changes if not a dry run ---
    if (!isDryRun && modifiedCount > 0) {
      console.log('\nCommitting changes to Firestore...');
      await writeBatch.commit();
      console.log('✅ Batch write successful.');
    } else if (!isDryRun && modifiedCount === 0) {
      console.log('\nNo documents needed modification. Nothing to commit.');
    }

    console.log('\n--- Migration Complete ---');
    console.log(`Total documents scanned: ${snapshot.size}`);
    console.log(`Total documents ${isDryRun ? 'to be' : ''} modified: ${modifiedCount}`);

  } catch (error) {
    console.error('\n❌ An error occurred:', error.message);
    if (error.code === 'ERR_INVALID_ARG_TYPE' || (error.message && error.message.includes('private key'))) {
        console.error('💡 This might be an issue with the service account key. Ensure the private_key is correctly formatted.');
    }
    process.exit(1);
  }
}

// Run the script
migrateProductions();
