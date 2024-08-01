// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARv27FwYFbiexQ5W8Jkhal0lBXK65urC4",
  authDomain: "pantry-tracker-ee4e1.firebaseapp.com",
  projectId: "pantry-tracker-ee4e1",
  storageBucket: "pantry-tracker-ee4e1.appspot.com",
  messagingSenderId: "209215869411",
  appId: "1:209215869411:web:7dd45ed2cab02d4d8c90d6",
  measurementId: "G-KDDDTFVN5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore};