// Functions for firebase use
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsVvHqRLQsmQDFZHCey9N2vD0ILMMuXjU",
    authDomain: "photo-gallery-2999a.firebaseapp.com",
    projectId: "photo-gallery-2999a",
    storageBucket: "photo-gallery-2999a.appspot.com",
    messagingSenderId: "514963035982",
    appId: "1:514963035982:web:44b9949dd61b3019b8701f",
    databaseURL: "https://photo-gallery-2999a-default-rtdb.firebaseio.com",
    // measurementId: "G-36EMNYD2XT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// realtime database
export const database = getDatabase(app);