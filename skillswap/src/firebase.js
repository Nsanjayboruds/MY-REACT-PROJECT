// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQicdZKMXK3AkxD3RsnjZAY1E6o3GCnkE",
  authDomain: "skillswap-ef9b4.firebaseapp.com",
  projectId: "skillswap-ef9b4",
  storageBucket: "skillswap-ef9b4.firebasestorage.app",
  messagingSenderId: "840479906486",
  appId: "1:840479906486:web:5a9a5163c84aa45e236417"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Add these exports so your React app can use Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
