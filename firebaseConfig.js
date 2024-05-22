import { initializeApp } from "firebase/app";
import {getFirestore,initializeFirestore } from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
    apiKey: "AIzaSyAMeujQxNjqGJojHH7cPzx-W7RvwgjeTzI",
    authDomain: "test-6a1d9.firebaseapp.com",
    projectId: "test-6a1d9",
    storageBucket: "test-6a1d9.appspot.com",
    messagingSenderId: "1078242046089",
    appId: "1:1078242046089:web:658a1ae7fdc0480b1b1658",
    measurementId: "G-EG22GCZD0T"
  };
  
  // Initialize Firebase
  export const firebase_app = initializeApp(firebaseConfig);
  
  // Initialize Firestore
  export const firebase_db = getFirestore(firebase_app);
  export const firebase_auth = initializeAuth(firebase_app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });