// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5tXWjCb_yvxx57qcYsSbwI5lc9NUS1y0",
  authDomain: "what-textapp.firebaseapp.com",
  projectId: "what-textapp",
  storageBucket: "what-textapp.appspot.com",
  messagingSenderId: "888614231957",
  appId: "1:888614231957:web:9d89221c61c392c8bfe09c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth =getAuth(app)

export {auth}