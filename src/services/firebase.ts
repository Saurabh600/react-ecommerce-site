import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBUj9oA-gLjRi7lMTqvTr7oQj2qJQb1II8",
  authDomain: "react-ecommerce-site-24272.firebaseapp.com",
  projectId: "react-ecommerce-site-24272",
  storageBucket: "react-ecommerce-site-24272.appspot.com",
  messagingSenderId: "789892685349",
  appId: "1:789892685349:web:5c071e75ef7d557937e9cc",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
