import { firebaseApp } from './firebase_config'
import {getAuth, onAuthStateChanged, signInWithCredential, GoogleAuthProvider} from 'firebase/auth';
import { getDatabase, ref, set, onValue} from 'firebase/database';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
var auth = getAuth(firebaseApp);
const appDb = getDatabase(firebaseApp);

function startAuth(interactive) {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
      if (chrome.runtime.lastError && !interactive) {
      } else if (chrome.runtime.lastError) {
      } else if (token) {
          var credential = GoogleAuthProvider.credential(null, token);
          signInWithCredential(auth, credential).then((result) => {
          }).catch((error) => {
          });
      } 
  });
}

class DBManager {
  addData(path, data) {
    set(ref(appDb, path), data);
  }

  addDataToCurrentUser(data) {
    this.addData('users/' + auth.currentUser.uid, data);
  }
}
const dbManager = new DBManager();

//when the sign out button is clicked in the popup sign the user out
document.querySelector('#sign_out').addEventListener('click', async () => {
    await auth.signOut();

    auth = getAuth(firebaseApp);
    window.location.replace('./popup.html');
});

// function addToDatabase(result, products){
//   const d = new Date();
//   const getTimeEpoch =  d.getTime().toString();
//   dbManager.addData("transactions/" +  getTimeEpoch,{
//       donationAmount: result,
//       email: auth.currentUser.email,
//       date: d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear(),
//       time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
//       products: products,
//       donatedYet: false, 
//       potentiallyPaid: false
//   });
// }

//accumulate the total amount of donations that have been paid and those that have to be paid for the user for display in popup
function updateDatabaseWithTransaction() {
  if (auth.currentUser) {
    const starCountRef = ref(appDb, 'transactions');
    var donatedAmount = 0;
    var notDonatedAmount = 0;
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        Object.entries(data).forEach((entry) => {
            const [_ , value] = entry;
            if (value['email'].localeCompare(auth.currentUser.email) == 0){
              if (value['donatedYet']){
                donatedAmount += parseFloat(value['donationAmount']);
              }
              else{
                notDonatedAmount += parseFloat(value['donationAmount']);
              }
            }
            
        });
        document.querySelector('#popupElement1').innerHTML = "Current Pending Donations: $" + (Math.round(100*notDonatedAmount)/100);
        document.querySelector('#popupElement2').innerHTML = "Donations Paid For: $" + (Math.round(100*donatedAmount)/100);
    });
  } 
  else {
    setTimeout(updateDatabaseWithTransaction, 300);
  }  
}

function waitUntilLoggedIn(){
  startAuth(true);
  updateDatabaseWithTransaction();
}

document.addEventListener('DOMContentLoaded', waitUntilLoggedIn);


