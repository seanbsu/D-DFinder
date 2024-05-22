import { firebase_app, firebase_auth, firebase_db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, addDoc,  Timestamp } from 'firebase/firestore';
class FirebaseUtil {
    constructor() {
      const app = firebase_app;
      this.auth = firebase_auth;
      this.db = firebase_db;
    }
  
    // Example method to update user data
    async updateUser(userId, userData) {
      const userDocRef = doc(collection(this.db, 'users'), userId);
      await setDoc(userDocRef, userData);
    }
  
    // Other methods for interacting with Firebase can be added here...
  }
  
  // Singleton pattern implementation
  let firebaseUtilInstance = null;
  
  export default function getFirebaseUtil() {
    if (!firebaseUtilInstance) {
      firebaseUtilInstance = new FirebaseUtil();
    }
    return firebaseUtilInstance;
  }