import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBZxvg8udXHKSPa_bzvIcD0urJ8w96sniM",
  authDomain: "platefullauthapp.firebaseapp.com",
  projectId: "platefullauthapp",
  storageBucket: "platefullauthapp.firebasestorage.app",
  messagingSenderId: "300494054890",
  appId: "1:300494054890:web:c68b1da08e03a3806ebe93",
  measurementId: "G-ZVT2XBP8LF"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app; 