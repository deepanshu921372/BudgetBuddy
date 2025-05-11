import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAejeCK4oxl01nRKCF4s9G981kBuH1HnCE",
  authDomain: "budgetbuddy-7d8b7.firebaseapp.com",
  projectId: "budgetbuddy-7d8b7",
  storageBucket: "budgetbuddy-7d8b7.firebasestorage.app",
  messagingSenderId: "996317692825",
  appId: "1:996317692825:web:a3059729e92c43ebd90908"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = getAuth(app);

// Initialize Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

githubProvider.setCustomParameters({
  prompt: 'consent'
});

export { auth, googleProvider, githubProvider }; 