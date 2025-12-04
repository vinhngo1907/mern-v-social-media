// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCENc03yPkq8npLjucVOKWrYJANlAOa_2M",
    authDomain: "v-project-b1b4a.firebaseapp.com",
    projectId: "v-project-b1b4a",
    storageBucket: "v-project-b1b4a.firebasestorage.app",
    messagingSenderId: "521134094099",
    appId: "1:521134094099:web:3432fa2f569fdc24bb8ce6",
    measurementId: "G-3Q8LHK52K1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);