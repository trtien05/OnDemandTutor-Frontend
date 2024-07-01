// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import config from "../config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.publicRuntime.FIREBASE_API_KEY,
  authDomain: config.publicRuntime.FIREBASE_AUTH_DOMAIN,
  projectId: config.publicRuntime.FIREBASE_PROJECT_ID,
  storageBucket: config.publicRuntime.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.publicRuntime.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.publicRuntime.FIREBASE_APP_ID,
  measurementId: config.publicRuntime.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);