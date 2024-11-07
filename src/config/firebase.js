// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLWV9212cdv_2IMeARo8NnOkUjFXeVm1Q",
  authDomain: "koimanagement-cd9bd.firebaseapp.com",
  projectId: "koimanagement-cd9bd",
  storageBucket: "koimanagement-cd9bd.appspot.com",
  messagingSenderId: "918677205217",
  appId: "1:918677205217:web:f74b5b4c8c1ef2b773c7a0",
  measurementId: "G-SXF7MERSZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
export {storage,provider};