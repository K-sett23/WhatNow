import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCNWnFtBHuy4fhtZqHUfPCPxdkbN3eng-Q",
    authDomain: "whatnow-cc24e.firebaseapp.com",
    projectId: "whatnow-cc24e",
    storageBucket: "whatnow-cc24e.firebasestorage.app",
    messagingSenderId: "545409915334",
    appId: "1:545409915334:web:df85e1399cf1c087647ac7"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();