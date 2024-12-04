import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQqMtPyQtXm8dfuJQKK2ITjtjj_Ui1MkE",
  authDomain: "drgpt-ad363.firebaseapp.com",
  projectId: "drgpt-ad363",
  storageBucket: "drgpt-ad363.firebasestorage.app",
  messagingSenderId: "449715385470",
  appId: "1:449715385470:web:ed04539b6f9d0a3a8f142f",
  measurementId: "G-TQP1C7WLVZ"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence via AsyncStorage
const auth = getAuth(app);
auth.setPersistence(getReactNativePersistence(AsyncStorage));

export { auth, GoogleAuthProvider, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword };
