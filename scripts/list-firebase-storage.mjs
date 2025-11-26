#!/usr/bin/env node

/**
 * Script to list all files in Firebase Storage bucket
 * This will help us find the actual paths of the video files
 */

import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDv2MJ0VZFv4tKUnSxXZN99C4fs7ewE2tY",
  authDomain: "typhoon-indie-stream.firebaseapp.com",
  projectId: "typhoon-indie-stream",
  storageBucket: "typhoon-indie-stream.firebasestorage.app",
  messagingSenderId: "752758817433",
  appId: "1:752758817433:web:367558c83c4e67fbb56e08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function listStorageContents(path = '') {
  console.log('\n🔥 Listing Firebase Storage Contents...\n');
  console.log('=' .repeat(80));
  
  try {
    const listRef = ref(storage, path);
    const result = await listAll(listRef);
    
    // List all folders
    if (result.prefixes.length > 0) {
      console.log('\n📁 FOLDERS:\n');
      for (const folderRef of result.prefixes) {
        console.log(`   ${folderRef.fullPath}`);
      }
    }
    
    // List all files
    if (result.items.length > 0) {
      console.log('\n📄 FILES:\n');
      for (const itemRef of result.items) {
        console.log(`   ${itemRef.fullPath}`);
        
        // Try to get download URL
        try {
          const url = await getDownloadURL(itemRef);
          console.log(`   ✅ URL: ${url}\n`);
        } catch (error) {
          console.log(`   ❌ Cannot get URL: ${error.message}\n`);
        }
      }
    }
    
    if (result.prefixes.length === 0 && result.items.length === 0) {
      console.log('\n⚠️  No files or folders found in this path.\n');
    }
    
    console.log('=' .repeat(80));
    console.log('\n✨ Done!\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nThis could mean:');
    console.error('  1. The bucket is empty');
    console.error('  2. Firebase Storage rules prevent listing');
    console.error('  3. The files need to be uploaded first\n');
    process.exit(1);
  }
}

// Run the script
const pathArg = process.argv[2] || '';
console.log(`\n📍 Searching in: ${pathArg || '/'} (root)\n`);
listStorageContents(pathArg).catch(console.error);
