var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Dosis:400,500|Poppins:400,700&amp;display=swap');
document.head.appendChild(link);

let amazon_divs = [
  "apex_desktop", // Regular Products
  "MediaMatrix", // Books
  // Insert any others
]

//whole table to display on the product page
var tbl2 = document.createElement('table');
tbl2.style.background = "-webkit-gradient(linear, left top, right top, from(#5dbd52), to(#215d33))";
tbl2.style.width = "50%";
tbl2.style.boxShadow = 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px';

//row for displaying the word Clove as the header
var tr11 = tbl2.insertRow();
tr11.style.borderCollapse = 'collapse';
tr11.style.border = 'none';
var td11 = tr11.insertCell();
var textArea11 = document.createElement("textarea");
textArea11.value = "\nClove";
textArea11.style.height = '1.75em';
textArea11.style.top = 0;
textArea11.style.left = 0;
textArea11.style.resize = "none";
textArea11.readOnly = "readonly";
textArea11.style.width = '100%';
textArea11.style.justifySelf = 'center';
textArea11.style.padding = 0;
textArea11.style.outline = 'none';
textArea11.style.boxShadow = 'none';
textArea11.style.background = "-webkit-gradient(linear, left top, right top, from(#5dbd52), to(#215d33))";
textArea11.style.color = "white";
textArea11.style.textAlign = 'center';
textArea11.style.fontFamily = 'Poppins';
textArea11.style.borderColor = 'transparent'
textArea11.style.fontSize = '30px';
td11.appendChild(textArea11);

//row for displaying the co2 and donation amount in the table
var tr12 = tbl2.insertRow();
var td12 = tr12.insertCell();
var textArea = document.createElement("textarea");
textArea.style.textAlignLast = 'center';
textArea.style.resize = "none";
textArea.readOnly = "readonly";
textArea.style.width = '100%';
textArea.style.justifySelf = 'center';
textArea.style.height = '6em';
textArea.color = "#062d1f";
textArea.style.outline = 'none';
textArea.style.boxShadow = 'none';
textArea.style.background = 'transparent';
textArea.style.backgroundColor = '#d1ffd3';
textArea.style.textAlign = 'center';
textArea.style.fontFamily = 'Poppins';
textArea.style.borderColor = '#215d33'



let categoriesMap = new Map([
  ["Appliances", 0.123], ["Arts, Crafts & Sewing", 0.478], ["Automotive", 0.178], ["Baby", 0.402], ["Beauty", 0.261], ["Books", 0.189], ["Collectibles & Fine Arts", 1.618], 
  ["Electronics", 0.488], ["Clothing, Shoes & Jewelry", 1.947], ["Clothing, Shoes & Jewelry - Baby", 1.947], ["Clothing, Shoes & Jewelry - Boys", 1.947], 
  ["Clothing, Shoes & Jewelry - Girls", 1.947], ["Clothing, Shoes & Jewelry - Men", 1.947], ["Clothing, Shoes & Jewelry - Women", 1.947], 
  ["Gift Cards", 0.186], ["Grocery & Gourmet Food", 0.241], ["Handmade", 0.494], ["Health & Personal Care", 0.411], ["Home & Kitchen", 1.0325], ["Industrial & Scientific", 0.247], 
  ["Kindle Store", 0], ["Patio, Lawn & Garden", 0.163], ["Luggage & Travel Gear", 0.108], ["Magazine Subscriptions", 0.358], ["Apps & Games", 1.251], ["Movies & TV", 0.05], 
  ["Digital Music", 0], ["CDs & Vinyl", 0.086], ["Musical Instruments", 0.025], ["Office Products", 0.7706], ["Computers", 0.488], ["Pet Supplies", 0.757], ["Software", 0.073], 
  ["Sports & Outdoors", 0.071], ["Tools & Home Improvement", 0.349], ["Toys & Games", 3.571], ["Amazon Instant Video", 0], ["Vehicles", 0.0925], ["Video Games", 1.251], 
  ["Wine", 0.33], ["Cell Phones & Accessories", 0.236], ["Default", 0], ["Beauty & Personal Care", 0.261], ["Health & Household", 0.165]
]);

let categories = Array.from(categoriesMap.keys());

asinVal = "";
categoryPath = ""


// connection code

var port = chrome.runtime.connect({name: "Get Product Data"});
port.onMessage.addListener(function(msg) {
  if (msg.answer.charAt(0) == "1"){
    try {
      desktop = document.getElementById(amazonDiv);

      categoryPath = msg.answer.substring(2);

      category = categoryPath.split("/")[0];

      console.log(categoryPath);
      console.log(category);

      let co2PerDollar = categoriesMap.get(category);
      if (co2PerDollar == null || category == null) throw "null";
      let dimensionsString = desktop.getElementsByClassName("a-offscreen");
      let number = dimensionsString[0].textContent.substring(1);
      let product = document.getElementById("productTitle").innerText;
      let price = Number(number.replace(/[^0-9.-]+/g,""));

      let co2Emissions = (co2PerDollar + 0.1027) * (price/4.5);
      var donation = (co2Emissions * 0.04).toFixed(2);
      textArea.value = "Donation: $" + donation + "\n\nCO2 emissions: " + co2Emissions.toFixed(2) + "kg";
      td12.appendChild(textArea);
      desktop.appendChild(tbl2);

      
      port.postMessage({data: "2" + asinVal + msg.answer.substring(1) + "@" + product});
    }
    catch (err){
      textArea.value = "Sorry we currently don't" + "\nsupport this product";
      td12.appendChild(textArea);
      desktop.appendChild(tbl2);
    }
    
  }

});
// end connection code

var amazonDiv = "";

for (var amazon_div of amazon_divs) {
  let desktop = document.getElementById(amazon_div);
  if (desktop) {
    amazonDiv = amazon_div;
    try{
      category = "";      
      strElem = document.querySelectorAll("#prodDetails");

      if (strElem.length == 0){
        strElem = document.querySelectorAll("#detailBulletsWrapper_feature_div");
      }
      elemStr = (strElem[0].innerText);
      asinStrVal = elemStr.substring(elemStr.indexOf("ASIN") + 5).toString();

      while (!isNaN(asinStrVal.charAt(0)) || !(/[a-zA-Z]/).test(asinStrVal.charAt(0))){
        asinStrVal = asinStrVal.substring(1);
      }
      asinVal = asinStrVal.substring(0, 11)

      for (var i = 0 ; i < categories.length; i++){
        if (elemStr.includes(categories[i])){
          category = categories[i];
        }
      }
      if (category.length === 0){
        subCatIndex = asinStrVal.indexOf("#")
        firstIndex = asinStrVal.indexOf(' ', subCatIndex + 1);
        secondIndex = asinStrVal.indexOf(' ', firstIndex + 1);
        subCatIndex = secondIndex + 1;
        
        subCatStr = asinStrVal.substring(subCatIndex, asinStrVal.indexOf("\n", subCatIndex)).trim();
        console.log(subCatStr);

        port.postMessage({data: "1" + subCatStr});
        //use python script
      }
      else{
        subCatIndex = asinStrVal.split("#", 2).join("#").length;
        firstIndex = asinStrVal.indexOf(' ', subCatIndex + 1);
        secondIndex = asinStrVal.indexOf(' ', firstIndex + 1); // second space
        subCatIndex = secondIndex + 1;

        subCatStr = asinStrVal.substring(subCatIndex, asinStrVal.indexOf("\n", subCatIndex)).trim();
        console.log(subCatStr);
        port.postMessage({data: "1" + category + "@" + subCatStr});
        // go directly to map code
      }
      
    }
    //If the product is not found in the lists
    catch (err){
      console.log(err)
      textArea.value = "Sorry we currently don't" + "\nsupport this product";
      td12.appendChild(textArea);
      desktop.appendChild(tbl2);
    }
  }
}

