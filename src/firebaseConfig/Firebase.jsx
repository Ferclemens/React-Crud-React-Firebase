// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB0TJdxngdYHFBmhY0fynPGw4XBoLcxujk",
  authDomain: "crud-fb-react-f693d.firebaseapp.com",
  projectId: "crud-fb-react-f693d",
  storageBucket: "crud-fb-react-f693d.appspot.com",
  messagingSenderId: "653631225311",
  appId: "1:653631225311:web:9df5b86cec887dd2ba986a",
  measurementId: "G-YNY9GFDT9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
//const analytics = getAnalytics(app);