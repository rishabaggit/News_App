import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQNUecG2-QMs4Me_H2m7b7l4YucewrjQQ",
    authDomain: "newsfirebase-3eeff.firebaseapp.com",
    databaseURL: "https://newsfirebase-3eeff.firebaseio.com",
    projectId: "newsfirebase-3eeff",
    storageBucket: "newsfirebase-3eeff.appspot.com",
    messagingSenderId: "571174522411",
    appId: "1:571174522411:web:111a2344140f117801646e",
    measurementId: "G-63S2FXR93K"
  };

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyDQNUecG2-QMs4Me_H2m7b7l4YucewrjQQ",
//     authDomain: "newsfirebase-3eeff.firebaseapp.com",
//     databaseURL: "https://newsfirebase-3eeff.firebaseio.com",
//     projectId: "newsfirebase-3eeff",
//     storageBucket: "newsfirebase-3eeff.appspot.com",
//     messagingSenderId: "571174522411",
//     appId: "1:571174522411:web:111a2344140f117801646e",
//     measurementId: "G-63S2FXR93K"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();