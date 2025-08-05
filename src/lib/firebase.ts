// firebase-config.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDv2MJ0VZFv4tKUnSxXZN99C4fs7ewE2tY",
  authDomain: "typhoon-indie-stream.firebaseapp.com",
  projectId: "typhoon-indie-stream",
  storageBucket: "typhoon-indie-stream.appspot.com",
  messagingSenderId: "752758817433",
  appId: "1:752758817433:web:367558c83c4e67fbb56e08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
