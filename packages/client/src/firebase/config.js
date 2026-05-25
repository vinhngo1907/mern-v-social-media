// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_kE7gXa4ysoZT5BpGeS5bJwkFl1KTgCc",
  authDomain: "video-sharing-35ce0.firebaseapp.com",
  databaseURL:
    "https://video-sharing-35ce0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "video-sharing-35ce0",
  storageBucket: "video-sharing-35ce0.firebasestorage.app",
  messagingSenderId: "877568509802",
  appId: "1:877568509802:web:b98dfa52dc2157a91e8713",
  measurementId: "G-QX0X7F5V4L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
