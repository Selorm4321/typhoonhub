// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDv2MJ0VZFv4tKUnSxXZN99C4fs7ewE2tY',
  authDomain: 'typhoon-indie-stream.firebaseapp.com',
  projectId: 'typhoon-indie-stream',
  storageBucket: 'typhoon-indie-stream.firebasestorage.app',
  messagingSenderId: '752758817433',
  appId: '1:752758817433:web:367558c83c4e67fbb56e08',
};

// Initialize Firebase
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);