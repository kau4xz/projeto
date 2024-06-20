
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAz6TkDdUKShtgriZsa0Pf3dqnq11TImd4",
  authDomain: "appiafacial.firebaseapp.com",
  projectId: "appiafacial",
  storageBucket: "appiafacial.appspot.com",
  messagingSenderId: "17787265691",
  appId: "1:17787265691:web:8a37609136b194b86a1c3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);