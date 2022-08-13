import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import {getAuth, signInWithCredential, GoogleAuthProvider} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
var auth = getAuth(firebaseApp);

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

//adds product from the product page to db for future use on cart page
function addProductData (asin, path, product){
    dbManager.addData("ProductList/" + asin,{
        Path: path,
        Item: product
    });
}

function occurrences(string, subString, allowOverlapping) {
  string += "";
  subString += "";
  if (subString.length <= 0) return (string.length + 1);

  var n = 0,
      pos = 0,
      step = allowOverlapping ? 1 : subString.length;

  while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
          ++n;
          pos += step;
      } else break;
  }
  return n;
}

var finalPath = "";

function addToDatabase(result, products){
  const d = new Date();
  const getTimeEpoch =  d.getTime().toString();
  dbManager.addData("transactions/" +  getTimeEpoch,{
      donationAmount: result,
      email: auth.currentUser.email,
      date: d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear(),
      time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
      products: products,
      donatedYet: false, 
      potentiallyPaid: false
  });
  stripeCall(auth.currentUser.email, parseInt(result/0.01));

}

function stripeCall(email, donationAmount){
  var urlAWS = 'https://57n3xwgzs3.execute-api.us-west-2.amazonaws.com/default/test2?stripe=true';
  urlAWS+='&email=' + email;
  urlAWS+='&donationAmount=' + donationAmount;
  // console.log(urlAWS);
  fetch(urlAWS).then((response) => {
    // console.log(response.json());
    return response.json(); 
  }).then((result) => {
    // console.log(result);
  })
  ;
}

function updateDatabaseWithTransaction(price, products) {
  if (auth.currentUser) {
      if (auth.currentUser != null){
          addToDatabase(price, products);
          chrome.storage.local.clear();
      }
    
  } 
  else {
    setTimeout(updateDatabaseWithTransaction, 300);
  }  
}

//product money connection
chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      if (msg.data.charAt(0) == "1"){
        msg.data = msg.data.substring(1);
        var bigLst = msg.data.split("@");
        var big = bigLst[0];
        var small = bigLst[1];

        var cleanStr = msg.data.replaceAll("& ","");
        console.log(big);
        console.log(cleanStr);

        port.postMessage({answer: "connected" + msg.data});
        const starCountRef = ref(appDb, 'Amazon_Categories');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            var finalCount = 0;
            var temp = "";
            var catLst = cleanStr.split(" ");
            // console.log(catLst);
            Object.entries(data).forEach((entry) => {
              var count = 0;
              const [key , value] = entry;
              var nodes = value.substring(1).split("/");
              var leafNode = key.toString().substring(0, key.toString().indexOf("("));
              // console.log(nodes[0]);

              temp = value.toString() + "/" + key.toString();

    
              for (var word of catLst){
                count += occurrences(temp, word);
                
              }
              if (msg.data.includes("@")){
                if (count > finalCount && nodes[0] == big){
                  finalCount = count;
                  finalPath = temp;
                }
              }
              else if (count > finalCount){//some working better not including leafNode like the dog food
                finalCount = count;
                finalPath = temp;
              }
            });
            console.log(finalCount);
            port.postMessage({answer: "1" + finalPath});
        });
      }
      else if (msg.data.charAt(0) == "2"){
        var asin = msg.data.substring(1, 11).trim();
        var path = msg.data.substring(11, msg.data.indexOf("@")).trim();
        var product = msg.data.substring(msg.data.indexOf("@") + 1).trim();
        addProductData(asin, path, product);
      }
    
    });
  });

 //cart money connection
chrome.runtime.onConnect.addListener(function(connection) {
  connection.onMessage.addListener(function(memo) {
    var asinStr = "";
    var item = "";
    connection.postMessage({send: "connected here " + memo.response});
    if (memo.response.charAt(0) == "1"){
      memo.response = memo.response.substring(1);
      var asin = memo.response.substring(0, 11).trim()

      const starCountRef = ref(appDb, 'ProductList');
      onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
  
          Object.entries(data).forEach((entry) => {

            const [ , value] = entry;

            if (entry[0] == asin){
              asinStr = value["Path"];
              item = value["Item"];
              
            }
          });

          if (asinStr){
            connection.postMessage({send: "1" + asinStr + "@" + item});
          }
          else{
            connection.postMessage({send: "not found"});

          }

     
      });
    }
    else if (memo.response.charAt(0) == "2"){
      startAuth(true);
      var price = memo.response.substring(1, memo.response.indexOf("@"))
      var products = memo.response.substring(memo.response.indexOf("@")+1);
      updateDatabaseWithTransaction(price, products);
      
    }
  
  });
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting != null){
      chrome.storage.local.set({ 'key': request.greeting });
      sendResponse({farewell: "goodbye"});
    }
      
  }
);

//when installed goes to login page for dashboard
chrome.runtime.onInstalled.addListener(details => {
  chrome.tabs.create({
    url : "https://joinclove.org/website/stripeCode/subscription-use-cases/client/pages-sign-in.html"
  });
});