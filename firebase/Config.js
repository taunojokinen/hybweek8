// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection,addDoc,serverTimestamp, query, onSnapshot,orderBy } from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { apikeyConst} from '../envi.js';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apikeyConst,//"AIzaSyCXkPvmNPPFpG6tSh1WYntLOVVWq37ixac",//process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "chat-39fe2.firebaseapp.com",
  projectId: "chat-39fe2",
  storageBucket: "chat-39fe2.appspot.com",
  messagingSenderId: "237553749139",
  appId: "1:237553749139:web:2656a9fdaa72a69a741166"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

const firestore = getFirestore();
const MESSAGES = 'shopping';

export {
  firestore,
  collection,
  query,
  addDoc,
  onSnapshot,
  orderBy,
  serverTimestamp,
  MESSAGES,
  getAuth,
  signInWithEmailAndPassword,
  firebaseConfig,
  app

};