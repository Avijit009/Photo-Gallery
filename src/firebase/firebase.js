// Functions for firebase use
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsVvHqRLQsmQDFZHCey9N2vD0ILMMuXjU", //DOnes
    authDomain: "react-photo-gallery-app-2.firebaseapp.com",
    projectId: "photo-gallery-2999a", //Done
    storageBucket: "react-photo-gallery-app-2.appspot.com",
    messagingSenderId: "761081098835",
    appId: "1:761081098835:web:d51e8fcbdef1267b320ca6",
    databaseURL: "https://react-photo-gallery-app-2-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// realtime database
export const database = getDatabase(app);