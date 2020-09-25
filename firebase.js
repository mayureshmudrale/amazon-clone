// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAmcZ64adaEaX9donETf7Hl1h9wF9sqXmA",
  authDomain: "clone-e9a5e.firebaseapp.com",
  databaseURL: "https://clone-e9a5e.firebaseio.com",
  projectId: "clone-e9a5e",
  storageBucket: "clone-e9a5e.appspot.com",
  messagingSenderId: "126074804965",
  appId: "1:126074804965:web:cc09b5a83122a8179dd20c",
  measurementId: "G-NKG91KREVD"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db,auth};