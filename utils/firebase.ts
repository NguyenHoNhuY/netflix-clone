// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBQ_2UYpVwAysiCes3tUBhsyz9PHa1cmK8',
    authDomain: 'netflix-clone-75116.firebaseapp.com',
    projectId: 'netflix-clone-75116',
    storageBucket: 'netflix-clone-75116.appspot.com',
    messagingSenderId: '886058321365',
    appId: '1:886058321365:web:ca954e7a95afc62128e95c',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export default app;
