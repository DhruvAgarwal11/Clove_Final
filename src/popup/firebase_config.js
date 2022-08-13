//configuration file for firebase to be used in various files
import { initializeApp } from 'firebase/app';

const config = {
    apiKey: "AIzaSyAU12lW7Axec4TF6aDChHuC7Nk-irx47bU",
    authDomain: "clove-4d6c4.firebaseapp.com",
    projectId: "clove-4d6c4",
    storageBucket: "clove-4d6c4.appspot.com",
    messagingSenderId: "579159556398",
    appId: "ppocdkdojbecalnifjihpablekpmpcbb",
    measurementId: "G-6YHEH9NKSG"
};

const firebaseApp = initializeApp(config)

export{
    firebaseApp
}