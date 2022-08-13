var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Dosis:400,500|Poppins:400,700&amp;display=swap');
document.head.appendChild(link);

var label = document.createElement('label')
label.htmlFor = "donate";
label.appendChild(document.createTextNode('Checkbox to Donate'));

let allCategoriesMap = new Map([
  ["Appliances", 0.123], ["Arts, Crafts & Sewing", 0.478], ["Automotive", 0.178], ["Baby", 0.402], ["Beauty", 0.261], ["Books", 0.189], ["Collectibles & Fine Arts", 1.618], 
  ["Electronics", 0.488], ["Clothing, Shoes & Jewelry", 1.947], ["Clothing, Shoes & Jewelry - Baby", 1.947], ["Clothing, Shoes & Jewelry - Boys", 1.947], 
  ["Clothing, Shoes & Jewelry - Girls", 1.947], ["Clothing, Shoes & Jewelry - Men", 1.947], ["Clothing, Shoes & Jewelry - Women", 1.947], 
  ["Gift Cards", 0.186], ["Grocery & Gourmet Food", 0.241], ["Handmade", 0.494], ["Health & Personal Care", 0.411], ["Home & Kitchen", 1.0325], ["Industrial & Scientific", 0.247], 
  ["Kindle Store", 0], ["Patio, Lawn & Garden", 0.163], ["Luggage & Travel Gear", 0.108], ["Magazine Subscriptions", 0.358], ["Apps & Games", 1.251], ["Movies & TV", 0.05], 
  ["Digital Music", 0], ["CDs & Vinyl", 0.086], ["Musical Instruments", 0.025], ["Office Products", 0.7706], ["Computers", 0.488], ["Pet Supplies", 0.757], ["Software", 0.073], 
  ["Sports & Outdoors", 0.071], ["Tools & Home Improvement", 0.349], ["Toys & Games", 3.571], ["Amazon Instant Video", 0], ["Vehicles", 0.0925], ["Video Games", 1.251], 
  ["Wine", 0.33], ["Cell Phones & Accessories", 0.236], ["Default", 0], ["Beauty & Personal Care", 0.261], ["Health & Household", 0.165]
]);

var tbl = document.createElement('table');
tbl.style.background = "-webkit-gradient(linear, left top, right top, from(#5dbd52), to(#215d33))";

tbl.style.boxShadow = 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px';

var tr = tbl.insertRow();
tr.style.borderCollapse = 'collapse';
tr.style.border = 'none';
var td = tr.insertCell();
var textArea4 = document.createElement("textarea");
textArea4.value = "\nClove";
textArea4.style.height = '1.75em';
textArea4.style.top = 0;
textArea4.style.left = 0;
textArea4.style.resize = "none";
textArea4.readOnly = "readonly";
textArea4.style.width = '100%';
textArea4.style.justifySelf = 'center';
textArea4.style.padding = 0;
textArea4.style.outline = 'none';
textArea4.style.boxShadow = 'none';
textArea4.style.background = "-webkit-gradient(linear, left top, right top, from(#5dbd52), to(#215d33))";
textArea4.style.color = "white";
textArea4.style.textAlign = 'center';
textArea4.style.fontFamily = 'Poppins';
textArea4.style.borderColor = 'transparent'
textArea4.style.fontSize = '30px';
td.colSpan = 2;
td.appendChild(textArea4);


var tr2 = tbl.insertRow();

var tr5 = tbl.insertRow();
var td5 = tr5.insertCell();
tr5.style.height = '4em';
tr5.style.top = 0;
tr5.style.left = 0;
tr5.style.resize = "none";
tr5.readOnly = "readonly";
tr5.style.width = '100%';
tr5.style.justifySelf = 'center';
tr5.style.padding = 0;
tr5.style.outline = 'none';
tr5.style.boxShadow = 'none';
tr5.style.background = 'transparent';
tr5.style.backgroundColor = '#d1ffd3';
tr5.style.color = "black";
tr5.style.borderColor = '#215d33'
tr5.style.outline = "1px solid black";
tr5.style.borderRadius = '5px';

var textArea5 = document.createElement("textarea");
textArea5.value = "\nDonate? Select the checkbox to donate.";
textArea5.style.height = '5em';
textArea5.style.top = 0;
textArea5.style.left = 0;
textArea5.style.resize = "none";
textArea5.readOnly = "readonly";
textArea5.style.width = '100%';
textArea5.style.justifySelf = 'center';
textArea5.style.padding = 0;
textArea5.style.outline = 'none';
textArea5.style.boxShadow = 'none';
textArea5.style.background = 'transparent';
textArea5.style.textAlign = 'center';
textArea5.style.fontFamily = 'Poppins';
textArea5.style.borderColor = 'transparent'
td5.append(textArea5);

var td6 = tr5.insertCell();
td6.style.verticalAlign = 'middle';
var checkbox = document.createElement('input');
checkbox.borderRadius = "50%";
checkbox.type = "checkbox";
checkbox.name = "donate";
checkbox.value = "yes";
checkbox.id = "donate";
checkbox.checked = true;
td6.append(checkbox);

var td2 = tr2.insertCell();
var textArea2 = document.createElement("textarea");
textArea2.style.textAlignLast = 'center';
textArea2.style.resize = "none";
textArea2.readOnly = "readonly";
textArea2.style.width = '100%';
textArea2.style.justifySelf = 'center';
textArea2.style.height = '8em';
textArea2.color = "#062d1f";
textArea2.style.outline = 'none';
textArea2.style.boxShadow = 'none';
textArea2.style.background = 'transparent';
textArea2.style.backgroundColor = '#d1ffd3';
textArea2.style.textAlign = 'center';
textArea2.style.fontFamily = 'Poppins';
textArea2.style.borderColor = '#215d33'
textArea2.value = "\nLoading ...\n May take a few seconds \n Please wait before placing order";
td2.colSpan = 2;
td2.appendChild(textArea2);

var tr3 = tbl.insertRow();
var td3 = tr3.insertCell();
td3.colSpan = 2;
var textArea3 = document.createElement("textarea");
textArea3.style.textAlignLast = 'center';
textArea3.style.resize = "none";
textArea3.readOnly = "readonly";
textArea3.style.width = '100%';
textArea3.style.justifySelf = 'center';
textArea3.style.height = '9em';
textArea3.color = "#062d1f";
textArea3.style.outline = 'none';
textArea3.style.boxShadow = 'none';
textArea3.style.background = 'transparent';
textArea3.style.backgroundColor = '#d1ffd3';
textArea3.style.textAlign = 'center';
textArea3.style.fontFamily = 'Poppins';
textArea3.style.borderColor = '#215d33';
textArea3.value = "**IMPORTANT: To complete the transaction, after clicking proceed to checkout, click on the chrome extension popup and leave it open for 2-3 seconds.**"
textArea3.style.fontStyle = "italic";
td3.appendChild(textArea3);

let desktop = document.getElementById("spc-order-summary"); 
if (desktop) {
  desktop.appendChild(tbl);
}
var prevString = "";
var curOrderBox = 0;
var curElem;
var firstIter = true;
var price = 0;
var msgString = "";

var categoriesLst = [];
var totalCO2Emissions = 0;
var curIdx = 0;


// connection code

var connection = chrome.runtime.connect({name: "Get Category Path"});
connection.onMessage.addListener(function(memo) {
  if (memo.send.charAt(0) == "1"){
    categoryPath = memo.send.substring(2, memo.send.indexOf("@"));
    itemName = memo.send.substring(memo.send.indexOf("@") + 1);
    if (msgString!= "") msgString += " | ";
    msgString += itemName;

    category = categoryPath.split("/")[0];

    if (allCategoriesMap.has(category)){
      categoriesLst.push(category);
    }
    else {
      categoriesLst.push("Default");
    }

    co2PerDollar = allCategoriesMap.get(categoriesLst[categoriesLst.length-1]);
    
    var curElem = document.querySelectorAll('.a-color-price')[curIdx].innerText;
    while(!curElem.includes("$")){
      curIdx++;
      curElem = document.querySelectorAll('.a-color-price')[curIdx].innerText;
    }
    curElem = curElem.substring(1, curElem.length-1);

    price = Number(curElem.replace(/[^0-9.-]+/g,""));

    totalCO2Emissions += (price/4.5) * (co2PerDollar + 0.1027);

    if (categoriesLst.length == document.getElementsByName("dupOrderCheckArgs").length){
      price = (totalCO2Emissions * 0.04).toFixed(2);
      textArea2.value = "\nDonation: $" + price + "\n\nCO2 emissions: " + totalCO2Emissions.toFixed(2) + "kg";
    }
    curIdx++;


  }
  else if (memo.send == "not found"){
    caller(asinLst);
  }
  else{
  }

});

// end connection code

async function caller(asin){
  
  var bot = [];
  await Promise.all(
    asin.map(async (id) => {
      const response = await fetch(`https://api.asindataapi.com/request?api_key=D5BE52E5BFE64F5F9E1EE8C3F02C35C9&type=product&asin=${id}&amazon_domain=amazon.com`)
      const info = await response.json()
      bot[asin.indexOf(info.request_parameters["asin"])] = info;
      if (msgString!= "") msgString += " | ";
      msgString += info.product['title'];
    })
  )
  var categories = [];
  var totalCO2Emissions = 0;
  var curIdx = 0;
  for (var i = 0; i < bot.length; i++){
    let data = bot[i];

    catArray = data.product["categories_flat"].split(" > ");
    var found = false;
    for (var j = 0; j < catArray.length; j++){
      if (allCategoriesMap.has(catArray[j])){
        found = true;
        categories.push(catArray[j]);
        break;
      }
    }
    if (!found) {
      categories.push("Default");
    }

    if (allCategoriesMap.has(categories[categories.length-1])){
      co2PerDollar = allCategoriesMap.get(categories[categories.length-1]);
    }
    else{
      co2PerDollar = allCategoriesMap.get("Default");
    }

    var curElem = document.querySelectorAll('.a-color-price')[curIdx].innerText;
    while(!curElem.includes("$")){
      curIdx++;
      curElem = document.querySelectorAll('.a-color-price')[curIdx].innerText;
    }
    curElem = curElem.substring(1, curElem.length-1);

    price = Number(curElem.replace(/[^0-9.-]+/g,""));

    totalCO2Emissions += (price/4.5) * (co2PerDollar + 0.1027);
    if (categories.length == document.getElementsByName("dupOrderCheckArgs").length){
      price = (totalCO2Emissions * 0.04).toFixed(2);
      textArea2.value = "\nDonation: $" + price + "\n\nCO2 emissions: " + totalCO2Emissions.toFixed(2) + "kg";
    }
    curIdx++;

  }
}

var asinLst = [];

if (document.getElementById("subtotals-marketplace-table")){  
  
  

  document.getElementsByName("dupOrderCheckArgs").forEach(function(listItem, index){
    var ASIN = listItem['defaultValue'].substring(0, 10);
    asinLst.push(ASIN);
    connection.postMessage({response: "1" + ASIN});

  });

  
}


for (var j = 0; j < document.getElementsByName("placeYourOrder1").length; j++){
  document.getElementsByName("placeYourOrder1")[j].addEventListener("click", check);
}


function check() { 
  if (checkbox.checked){
    connection.postMessage({response: "2" + price + "@" + msgString});
  }
};

