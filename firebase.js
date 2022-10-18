// Import the functions you need from the SDKs you need
import * as firebase from "firebase"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdroiv2ImJPtJnOvBwFWaSmr8NsLjpCtM",
  authDomain: "receiptscanner-d7716.firebaseapp.com",
  projectId: "receiptscanner-d7716",
  storageBucket: "receiptscanner-d7716.appspot.com",
  messagingSenderId: "121348256380",
  appId: "1:121348256380:web:91b828d3436b04d6374ff9"
};

// Initialize Firebase
let app;
    if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
    } else {
    app = firebase.app()
    }
    const auth = firebase.auth()

export {auth};


