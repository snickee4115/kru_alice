// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA58rO2OL52mn-KajbeNKGgSEb__6I7zA4",
  authDomain: "react-kru-alice-test.firebaseapp.com",
  databaseURL: "http://react-kru-alice-test.firebaseio.com",
  projectId: "react-kru-alice-test",
  storageBucket: "react-kru-alice-test.appspot.com",
  messagingSenderId: "644073989033",
  appId: "1:644073989033:web:70489d20b53e43c6c55ab8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}