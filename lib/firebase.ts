// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBckiue_ekodlfiOjWS8ish_07NJUBPig0",
  authDomain: "cerita-app-1ac1c.firebaseapp.com",
  projectId: "cerita-app-1ac1c",
  storageBucket: "cerita-app-1ac1c.firebasestorage.app",
  messagingSenderId: "762265562090",
  appId: "1:762265562090:web:f4d2c20950c3c678f76093"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);