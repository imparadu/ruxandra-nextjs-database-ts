// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC781jIZHLETZHzBDgF9fVfwS2uKcc5Wbo",
  authDomain: "ruxandra-db-ts.firebaseapp.com",
  projectId: "ruxandra-db-ts",
  storageBucket: "ruxandra-db-ts.appspot.com",
  messagingSenderId: "383452694925",
  appId: "1:383452694925:web:35ade5a554667d307495c4",
  measurementId: "G-52EZL6LMVB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
export const auth = getAuth(app); // Ensure this line is present
export const storage = getStorage(app);
export default app; // This line is also necessary
