// src\firebase\firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlRN9F-oCq4GnpW3Mh3vrlhTQy0nRQI-U",
  authDomain: "photo-gallery-224b9.firebaseapp.com",
  databaseURL: "https://photo-gallery-224b9-default-rtdb.firebaseio.com/",
  projectId: "photo-gallery-224b9",
  storageBucket: "photo-gallery-224b9.appspot.com",
  messagingSenderId: "1072049145660",
  appId: "1:1072049145660:web:946e484e323907ee198039",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// realtime database
export const database = getDatabase(app);
