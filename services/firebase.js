// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdroiv2ImJPtJnOvBwFWaSmr8NsLjpCtM",
  authDomain: "receiptscanner-d7716.firebaseapp.com",
  projectId: "receiptscanner-d7716",
  storageBucket: "receiptscanner-d7716.appspot.com",
  messagingSenderId: "121348256380",
  appId: "1:121348256380:web:91b828d3436b04d6374ff9",
};

// Initialize Firebase and Authentication SDK
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export { app };
