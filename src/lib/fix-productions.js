
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
// IMPORTANT: This script assumes it is being run from the root of your project directory.
// It looks for 'serviceAccount.json' in the root.
const SERVICE_ACCOUNT_PATH = path.join(process.cwd(), 'serviceAccount.json');
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
    console.log('\n[DRY RUN] No changes will be saved to the database. Use the --apply flag to commit changes.');
  } else {
    console.log('\n[APPLY MODE] Changes WILL be saved to the database.');
  }

  try {
    // --- Initialize Firebase Admin SDK ---
    if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
        throw new Error(`Service account file not found at: ${SERVICE_ACCOUNT_PATH}. Make sure 'serviceAccount.json' is in the root of your project.`);
    }

    const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));

    // Fix for newline characters in private key
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

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

    console.log(`\nFound ${snapshot.size} document(s) to process...`);

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

      let newFundingValue = data.currentFunding;

      // 1. Ensure currentFunding exists.
      // If currentFunding is missing (undefined or null), copy from currentAmount.
      if (data.currentFunding === undefined || data.currentFunding === null) {
        newFundingValue = data.currentAmount || 0;
        updates.currentFunding = newFundingValue;
        needsUpdate = true;
      }

      // 2. Mark fields for deletion if they exist
      if (data.currentAmount !== undefined) {
        updates.currentAmount = admin.firestore.FieldValue.delete();
        needsUpdate = true;
      }
      if (data.targetAmount !== undefined) {
        updates.targetAmount = admin.firestore.FieldValue.delete();
        needsUpdate = true;
      }

      // Log and batch write if changes are needed
      if (needsUpdate) {
        modifiedCount++;
        
        console.log(`\n---------------------------------`);
        console.log(`📄 Document ID: ${doc.id}`);
        console.log('   [BEFORE]', oldValues);
        console.log('   [AFTER]', { 
            currentFunding: newFundingValue,
            currentAmount: 'DELETED', 
            targetAmount: 'DELETED' 
        });

        if (!isDryRun) {
          writeBatch.update(doc.ref, updates);
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
        console.error('💡 This might be an issue with the service account key. Ensure the private_key is correctly formatted in your serviceAccount.json file.');
    }
    process.exit(1);
  }
}

// Run the script
migrateProductions();
