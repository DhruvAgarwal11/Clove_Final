import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';

const config = {
    apiKey: "AIzaSyAU12lW7Axec4TF6aDChHuC7Nk-irx47bU",
    authDomain: "clove-4d6c4.firebaseapp.com",
    projectId: "clove-4d6c4",
    storageBucket: "clove-4d6c4.appspot.com",
    messagingSenderId: "579159556398",
    appId: "ppocdkdojbecalnifjihpablekpmpcbb",
    measurementId: "G-6YHEH9NKSG"
};

const firebaseApp = initializeApp(config);

//   const auth = getAuth(firebaseApp);
const appDb = getDatabase(firebaseApp);

class DBManager {
addData(path, data) {
    set(ref(appDb, path), data);
}
}

const dbManager = new DBManager();   

export function contactUs (name, email){

const d = new Date();
const getTimeEpoch =  d.getTime().toString();

dbManager.addData("emails/" + getTimeEpoch,{
    Name: name,
    Email: email
});

}