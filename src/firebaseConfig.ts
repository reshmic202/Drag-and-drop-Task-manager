import { initializeApp, FirebaseApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  Auth 
} from "firebase/auth";

// Firebase configuration (replace with your project's values)
const firebaseConfig: Record<string, string> = {
  apiKey: "AIzaSyCzl1bvZuJliD3CZm8kmxNMyzSBlsdnThA",
  authDomain: "boardtask1234.firebaseapp.com",
  projectId: "boardtask1234",
  storageBucket: "boardtask1234.firebasestorage.app",
  messagingSenderId: "662305299576",
  appId: "1:662305299576:web:25afeebb8783d6a554e18d"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Auth and Provider
const auth: Auth = getAuth(app);
const provider: GoogleAuthProvider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
