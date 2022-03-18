// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX5MiNcJMO3bGNPVzngHZ3Xtj9jaqNSiE",
  authDomain: "tutor-alice.firebaseapp.com",
  databaseURL: "http://tutor-alice.firebaseio.com",
  projectId: "tutor-alice",
  storageBucket: "tutor-alice.appspot.com",
  messagingSenderId: "59473935681",
  appId: "1:59473935681:web:dff356cc43baf9505f35c0",
  measurementId: "G-DJ63TTK9PK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}