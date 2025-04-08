import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBQS79-cShMtdKG9lhqovzteFbJIs5g5qg",
  authDomain: "dexer-481ca.firebaseapp.com",
  projectId: "dexer-481ca",
  storageBucket: "dexer-481ca.firebasestorage.app",
  messagingSenderId: "438780416171",
  appId: "1:438780416171:web:0c7f6632e968d38eafe7ee",
  measurementId: "G-P9TF3VJEWX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };