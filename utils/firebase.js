import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// TEMPORARY HARDCODED CONFIG - For development only
const firebaseConfig = {
  apiKey: "AIzaSyCEV1QnaAVePa9VTlJFJXy38uU-_dh5vR4",
  authDomain: "job-portal-e29c2.firebaseapp.com",
  projectId: "job-portal-e29c2",
  storageBucket: "job-portal-e29c2.firebasestorage.app",
  messagingSenderId: "102195891084",
  appId: "1:102195891084:web:782ee052895c141b6d64a9",
  measurementId: "G-4RFKR3JB2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.error("Analytics initialization error:", error);
  }
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics }; 