import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAknx-xXrXxxEfK578u51nGIQoYJSeUe3o",
    authDomain: "natflix-4b40b.firebaseapp.com",
    projectId: "natflix-4b40b",
    storageBucket: "natflix-4b40b.firebasestorage.app",
    messagingSenderId: "883977488474",
    appId: "1:883977488474:web:172f7cd90fc6c9c3dcf063",
    measurementId: "G-CV6C9HGLMB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db };