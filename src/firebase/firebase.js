import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCTB3zuM85kIQMjga9bIqdmAPatnMJJrHo",
    authDomain: "trilliant-thoughts.firebaseapp.com",
    projectId: "trilliant-thoughts",
    storageBucket: "trilliant-thoughts.appspot.com",
    messagingSenderId: "714625513579",
    appId: "1:714625513579:web:b9a3449a9cc750c0a4592e",
    measurementId: "G-KF5RZ6ZP98"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };