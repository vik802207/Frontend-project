// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAJrYSyIxQs5O8DmWfGvc2k83s770AC-M8",
  authDomain: "frontend-93745.firebaseapp.com",
  projectId: "frontend-93745",
  storageBucket: "frontend-93745.firebasestorage.app",
  messagingSenderId: "269455123402",
  appId: "1:269455123402:web:2de5d56423072a5d4e2533",
  measurementId: "G-F1NW3X51YJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export {app, auth, provider,db, signInWithPopup };
