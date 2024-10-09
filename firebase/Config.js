// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection,addDoc,serverTimestamp, query, onSnapshot } from "firebase/firestore";
//import {auth} from './Constants.js';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "chat-39fe2.firebaseapp.com",
  projectId: "chat-39fe2",
  storageBucket: "chat-39fe2.appspot.com",
  messagingSenderId: "237553749139",
  appId: "1:237553749139:web:2656a9fdaa72a69a741166"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();
const MESSAGES = 'messages';

export {
  firestore,
  collection,
  addDoc,
  serverTimestamp,
  MESSAGES,
  query,
  onSnapshot

};