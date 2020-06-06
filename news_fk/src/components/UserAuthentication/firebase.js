import * as firebase from "firebase";
import "firebase/auth"
import Rebase from 're-base';

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
const base = Rebase.createClass(app.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();
export {app , base , facebookProvider , firebaseConfig};