import firebase from "firebase/app";

//auth
import "firebase/auth";

//db
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCcA5ccu2jZ3RdISEBlxCnrvID9nIWi0W4",
    authDomain: "react-mp-892db.firebaseapp.com",
    projectId: "react-mp-892db",
    storageBucket: "react-mp-892db.appspot.com",
    messagingSenderId: "447053784073",
    appId: "1:447053784073:web:d0da0385d517766524c4d8",
    measurementId: "G-GF1ENHNJX7",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const app = firebase;
//db
export const db = app.firestore();
//auth
export const auth = app.auth();
//
export const a = firebase;
// Initialize Firebase
export default app;
