


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDL3NPeHT7YoDYo1yJ07WVxWDT2LUYWx4k",
  authDomain: "shapion-quiz-platform.firebaseapp.com",
  projectId: "shapion-quiz-platform",
  storageBucket: "shapion-quiz-platform.firebasestorage.app",
  messagingSenderId: "430631071879",
  appId: "1:430631071879:web:f48e6d58b089227d560822"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;