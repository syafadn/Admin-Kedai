// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAneDpVRrom3346Nt31y5_vBUvE4dZUY8",
  authDomain: "kedai-mate-a4088.firebaseapp.com",
  projectId: "kedai-mate-a4088",
  storageBucket: "kedai-mate-a4088.appspot.com",
  messagingSenderId: "871362012627",
  appId: "1:871362012627:web:eca95f487d9f66002afb26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Storeage Firebase
export const storage = getStorage(app)