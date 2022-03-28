// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEmLFPqQXXvfAvI6yluCgNLVQlR0iU5zs",
  authDomain: "house-marketplace-379c3.firebaseapp.com",
  projectId: "house-marketplace-379c3",
  storageBucket: "house-marketplace-379c3.appspot.com",
  messagingSenderId: "866669736098",
  appId: "1:866669736098:web:c59c1e198c53249a35a7fb",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
