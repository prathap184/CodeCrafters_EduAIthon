import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrstxQLRm9R0xhpbeYB_BN3VYYhEF60bo",
  authDomain: "skillswap-c14c4.firebaseapp.com",
  projectId: "skillswap-c14c4",
  storageBucket: "skillswap-c14c4.firebasestorage.app",
  messagingSenderId: "526578805120",
  appId: "1:526578805120:web:5197a10e929d0a801c7965",
  measurementId: "G-R69SP4YJTN"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);