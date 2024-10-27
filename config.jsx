// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD67KjgwcKeZtGarSG_7IEaZkNArYPVcHo",
  authDomain: "fuelfasta.firebaseapp.com",
  databaseURL: "https://fuelfasta-default-rtdb.firebaseio.com/",
  projectId: "fuelfasta",
  storageBucket: "fuelfasta.appspot.com",
  messagingSenderId: "721089069496",
  appId: "1:721089069496:web:75f8c93880f5334cd88f4d",
  measurementId: "G-F1R1E7P2FQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);

export { analytics };