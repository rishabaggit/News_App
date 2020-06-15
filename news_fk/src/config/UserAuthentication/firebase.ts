import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAGXfGQY_m2XuciUzqBagMyc7OsbSGwr0Y",
  authDomain: "fknews-mph.firebaseapp.com",
  databaseURL: "https://fknews-mph.firebaseio.com",
  projectId: "fknews-mph",
  storageBucket: "fknews-mph.appspot.com",
  messagingSenderId: "686008179025",
  appId: "1:686008179025:web:88fcfd6e1b756a6aa7db70",
  measurementId: "G-6QTGB5Y95H"
};

const app = firebase.initializeApp(firebaseConfig);
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const db = firebase.firestore();
const analytics = firebase.analytics();
const storage = firebase.storage();

export { app, facebookProvider, firebaseConfig, db, analytics, storage };