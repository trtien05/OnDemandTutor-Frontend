// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyATSdpozM1NjjG7uaLdZjO0Q6aaJsWa0vk',
  authDomain: 'mytutor-swp391.firebaseapp.com',
  projectId: 'mytutor-swp391',
  storageBucket: 'mytutor-swp391.appspot.com',
  messagingSenderId: '211296788775',
  appId: '1:211296788775:web:65f0f4ff21af30ec924902',
  measurementId: 'G-V67WR37JSB'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);