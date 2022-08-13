import { firebaseApp } from './firebase_config'
import { getAuth, onAuthStateChanged, signInWithCredential, GoogleAuthProvider} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const auth = getAuth(firebaseApp);
const appDb = getDatabase(firebaseApp);

class DBManager {
  addData(path, data) {
    set(ref(appDb, path), data);
  }
  addDataToCurrentUser(data) {
    this.addData('users/' + auth.currentUser.uid, data);
  }
}

const dbManager = new DBManager();

function init(){
    if (auth.currentUser) {
        window.location.replace('./main.html');
    } 
    onAuthStateChanged(auth, user => {
        if (auth.currentUser) {
            window.location.replace('./main.html');
        }
    });
};

init();

document.querySelector('.btn__google').addEventListener('click', () => {
    if (!auth.currentUser) {
        startAuth(true);
    }
});

async function startAuth(interactive) {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
        if (chrome.runtime.lastError && !interactive) {
        } else if (chrome.runtime.lastError) {
        } else if (token) {
            var credential = GoogleAuthProvider.credential(null, token);
            signInWithCredential(auth, credential).then((result) => {
                window.location.replace('./main.html');
            }).catch((error) => {
            });
        } else {
        }
    });
}