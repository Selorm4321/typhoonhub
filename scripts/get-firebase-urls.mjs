#!/usr/bin/env node

/**
 * Script to retrieve Firebase Storage download URLs for video files
 * Uses the Firebase client SDK with existing configuration
 */

import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

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

// Video file paths in Firebase Storage
// Try multiple variations of paths based on Firebase Console screenshots
const videoFiles = [
  // Ignatius Sancho variations
  {
    name: 'Ignatius Sancho (v1)',
    path: 'videos%20episodes/Legends%20of%20Legacy/Ignatius%20Sancho/Typhoonhub%20Presents_%20Ignatius%20Sancho_2025_11_16(1).mp4'
  },
  {
    name: 'Ignatius Sancho (v2)',
    path: 'videos episodes/Legends of Legacy/Ignatius Sancho/Typhoonhub Presents_ Ignatius Sancho_2025_11_16(1).mp4'
  },
  // Matilda Evans variations
  {
    name: 'Matilda C. Evans (v1)',
    path: 'videos%20episodes/Legends%20of%20Legacy/Matilda%20C.%20Evans%20-%20Healing%2C%20Advancing%2C%20Inspiring/Matilda%20C.%20Evans%20%E2%80%93%20Healing%2C%20Advancing%2C%20Inspiring..mov'
  },
  {
    name: 'Matilda C. Evans (v2)',
    path: 'videos episodes/Legends of Legacy/Matilda C. Evans - Healing, Advancing, Inspiring/Matilda C. Evans – Healing, Advancing, Inspiring..mov'
  },
  // Real McCoy variations
  {
    name: 'The Real McCoy (v1)',
    path: 'videos%20episodes/Legends%20of%20Legacy/The%20Real%20McCoy/The-RealMcCoy-Web1080p.mp4'
  },
  {
    name: 'The Real McCoy (v2)',
    path: 'videos episodes/Legends of Legacy/The Real McCoy/The-RealMcCoy-Web1080p.mp4'
  }
];

// Podcast audio file variations
const podcastFiles = [
  {
    name: 'Global Cinema (v1)',
    path: 'podcasts/Global%20Cinema/Filming%20Around%20the%20World/Global%20Cinema_%20Filming%20Around%20the%20World.mp3'
  },
  {
    name: 'Global Cinema (v2)',
    path: 'podcasts/Global Cinema/Filming Around the World/Global Cinema_ Filming Around the World.mp3'
  }
];

async function getDownloadUrls() {
  console.log('\n🔥 Fetching Firebase Storage Download URLs...\n');
  console.log('=' .repeat(80));
  
  try {
    // Get video URLs
    console.log('\n📹 VIDEO FILES:\n');
    for (const video of videoFiles) {
      try {
        const storageRef = ref(storage, video.path);
        const url = await getDownloadURL(storageRef);
        console.log(`✅ ${video.name}:`);
        console.log(`   ${url}\n`);
      } catch (error) {
        console.error(`❌ ${video.name}:`);
        console.error(`   Error: ${error.message}\n`);
      }
    }
    
    // Get podcast URLs
    console.log('\n🎙️  PODCAST FILES:\n');
    for (const podcast of podcastFiles) {
      try {
        const storageRef = ref(storage, podcast.path);
        const url = await getDownloadURL(storageRef);
        console.log(`✅ ${podcast.name}:`);
        console.log(`   ${url}\n`);
      } catch (error) {
        console.error(`❌ ${podcast.name}:`);
        console.error(`   Error: ${error.message}\n`);
      }
    }
    
    console.log('=' .repeat(80));
    console.log('\n✨ Done! Copy the URLs above and update /src/lib/data.ts\n');
    
  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);
    process.exit(1);
  }
}

// Run the script
getDownloadUrls().catch(console.error);
