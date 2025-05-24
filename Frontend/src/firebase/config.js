// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB_LeQ1WZgtLM6qCQI_AiDNrEiLxPUG7_8',
  authDomain: 'chatterly-6ed2b.firebaseapp.com',
  projectId: 'chatterly-6ed2b',
  storageBucket: 'chatterly-6ed2b.firebasestorage.app',
  messagingSenderId: '873702073959',
  appId: '1:873702073959:web:89c01c4ed56360b2a716c2',
  measurementId: 'G-V3NN9J3F9B',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
