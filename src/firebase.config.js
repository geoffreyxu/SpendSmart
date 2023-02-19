import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD0wlpwBKsBF0AZgwGWuAIAjvXBU_pC3Hs",
  authDomain: "test219-3cae3.firebaseapp.com",
  projectId: "test219-3cae3",
  storageBucket: "test219-3cae3.appspot.com",
  messagingSenderId: "937451187174",
  appId: "1:937451187174:web:610756dbfcd9d9b9324427",
  measurementId: "G-84NQX40V1W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app);
export {
    db,
    auth,
    storage
}