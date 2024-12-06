import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtjJCh5UtUt7sLjEnaYmXFfykO5fwbCY4",
  authDomain: "frontendtask-7b1f2.firebaseapp.com",
  projectId: "frontendtask-7b1f2",
  storageBucket: "frontendtask-7b1f2.firebasestorage.app",
  messagingSenderId: "389293733065",
  appId: "1:389293733065:web:b50a25d6526042b75a4918",
  measurementId: "G-BGMW49JZ2Q",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
