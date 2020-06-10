import * as firebase from "firebase";
import "firebase/auth"
import Rebase from 're-base';

const firebaseConfig = {
    apiKey: "AIzaSyDEv--bVCc2YqWllHxhdDxF-VYbioHdR2w",
    authDomain: "news-api-cd082.firebaseapp.com",
    databaseURL: "https://news-api-cd082.firebaseio.com",
    projectId: "news-api-cd082",
    storageBucket: "news-api-cd082.appspot.com",
    messagingSenderId: "933585731891",
    appId: "1:933585731891:web:c150a9be7832d9d73cfe46",
    measurementId: "G-96Z974FVD0"

};

const app = firebase.initializeApp(firebaseConfig);
const base = Rebase.createClass(app.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const db = firebase.firestore();
export {app , base , facebookProvider , firebaseConfig, db};