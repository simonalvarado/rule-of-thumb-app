// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4KxxBSrM-4oPURITkwVeTGg6XfNLDNM0",
  authDomain: "zemoga-8493a.firebaseapp.com",
  projectId: "zemoga-8493a",
  storageBucket: "zemoga-8493a.appspot.com",
  messagingSenderId: "830604124078",
  appId: "1:830604124078:web:5a815bd598802acba8323f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
