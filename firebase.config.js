// firebase.config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
