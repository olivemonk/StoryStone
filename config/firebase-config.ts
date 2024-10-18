// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "storystone-c4a24.firebaseapp.com",
  projectId: "storystone-c4a24",
  storageBucket: "storystone-c4a24.appspot.com",
  messagingSenderId: "89264754909",
  appId: "1:89264754909:web:f7756ea586f11ec8994b34",
  measurementId: "G-RJ68PJ2GZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)