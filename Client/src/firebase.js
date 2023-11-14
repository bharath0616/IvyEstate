// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// eslint-disable-next-line no-unused-vars
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "ivyestate-8abf5.firebaseapp.com",
  projectId: "ivyestate-8abf5",
  storageBucket: "ivyestate-8abf5.appspot.com",
  messagingSenderId: "980710052516",
  appId: "1:980710052516:web:12706da92dbee76e178c31",
  measurementId: "G-6JLEB3CB14"
};

// Initialize Firebase


export const app=initializeApp(firebaseConfig)