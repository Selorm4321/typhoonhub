// firebase-config.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDv2MJ0VZFv4tKUnSxXZN99C4fs7ewE2tY",
  authDomain: "typhoon-indie-stream.firebaseapp.com",
  projectId: "typhoon-indie-stream",
  storageBucket: "typhoon-indie-stream.appspot.com",
  messagingSenderId: "752758817433",
  appId: "1:752758817433:web:367558c83c4e67fbb56e08"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };
