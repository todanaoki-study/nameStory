
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCiOZ4J8bWWhkYsvrQRc0XZEwQbl_bH7AU",
    authDomain: "namestodemo-1.firebaseapp.com",
    projectId: "namestodemo-1",
    storageBucket: "namestodemo-1.firebasestorage.app",
    messagingSenderId: "1082875922337",
    appId: "1:1082875922337:web:04cb219e912be964f5ede0",
    measurementId: "G-SQVR3JN2TK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };