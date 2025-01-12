// firebase.js
import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
// Auth and Firestore imports
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDt-1927amh2IpTz0e720YKN3nt_SGWtk4",
  authDomain: "hangapp-deba9.firebaseapp.com",
  projectId: "hangapp-deba9",
  storageBucket: "hangapp-deba9.firebasestorage.app",
  messagingSenderId: "928167077748",
  appId: "1:928167077748:web:4d95c060bcae66f86cae21",
  measurementId: "G-7265K5G837",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics if supported
isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(app);
    console.log('Firebase Analytics initialized');
  } else {
    console.log('Firebase Analytics not supported in this environment');
  }
});

// Export both Auth and Firestore references
export const auth = getAuth(app);
export const db = getFirestore(app);
