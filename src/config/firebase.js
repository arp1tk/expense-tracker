// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCcLIADKoyvybnMaz4NypfzKfLyGwZ_L7Y",
  authDomain: "try1-b9eb2.firebaseapp.com",
  projectId: "try1-b9eb2",
  storageBucket: "try1-b9eb2.appspot.com",
  messagingSenderId: "859757904141",
  appId: "1:859757904141:web:b3e5573c1fd4cc243c7044",
  measurementId: "G-DJW62MRF2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);