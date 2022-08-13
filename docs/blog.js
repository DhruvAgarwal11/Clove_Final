const base = `https://docs.google.com/spreadsheets/d/1GOXcgRvNK5_FsKewW694q0OuCQD8a45nt3PiZTukeXU/gviz/tq?`;
const sheetName = 'user-data';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`
 
const data = []
document.addEventListener('DOMContentLoaded', init)
 
// const output = document.querySelector('.output')
 
function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            var largeContainer = document.getElementById("blogCards");
            var popups = new Array();
            var curCard = -1;
            var curPara;
            var storeImg;
            var storeTitle = "";
            while(rep.indexOf("{\"c\":[{\"v\":\"") >= 0){
                rep = rep.substring(rep.indexOf("{\"c\":[{\"v\":\"")+12);
                curPara = rep.substring(0, rep.indexOf("\"}]}"));
                if (rep.indexOf("{\"c\":[{\"v\":\"") >= 0){
                    curCard += 1;
                    var totalBoundary = document.createElement("div");
                    totalBoundary.className = "page__container";
                    var firstLink = document.createElement("a");
                    firstLink.style.color = "black";
                    var curElem = document.createElement("div");
                    firstLink.href = "#" + curCard.toString();
                    firstLink.className = "open-popup";
                    curElem.className = "card";

                    var innerDiv = document.createElement("div");
                    innerDiv.className = "card__body";
                    var image = document.createElement("img");
                    rep = rep.substring(rep.indexOf("{\"c\":[{\"v\":\"")+12);
                    curPara = rep.substring(0, rep.indexOf("\"}]}"));
                    image.src = curPara;
                    storeImg = curPara;
                    image.className = "card__image";
                    image.width = "600";

                    var break1 = document.createElement("br");
                    var break2 = document.createElement("br");

                    var title = document.createElement("h4");
                    rep = rep.substring(rep.indexOf("{\"c\":[{\"v\":\"")+12);
                    curPara = rep.substring(0, rep.indexOf("\"}]}"));
                    title.textContent = curPara;
                    storeTitle = curPara;

                    var break3 = document.createElement("br");
                    var break4 = document.createElement("br");

                    var shortDescription = document.createElement("p");
                    rep = rep.substring(rep.indexOf("{\"c\":[{\"v\":\"")+12);
                    curPara = rep.substring(0, rep.indexOf("\"}]}"));
                    var shortDescriptionText = curPara;
                    var j = 0;
                    while(j < 30){
                        if (shortDescriptionText.charAt(0) == " ") {
                            j++;
                            if (j == 30) shortDescription.textContent += "...";
                        }
                        shortDescription.textContent += shortDescriptionText.charAt(0);
                        shortDescriptionText = shortDescriptionText.substring(1);
                    }
                    innerDiv.append(image);
                    innerDiv.append(break1);
                    innerDiv.append(title);
                    innerDiv.append(break4);
                    innerDiv.append(shortDescription);
                    curElem.append(innerDiv);
                    firstLink.append(curElem);
                    totalBoundary.append(firstLink);
                    largeContainer.append(totalBoundary);

                    var popupMain = document.createElement("div");
                    popupMain.id = curCard.toString();
                    popupMain.className = "popup";
                    var nextLevel = document.createElement("div");
                    nextLevel.className = "popup__container";
                    var evenNext = document.createElement("a");
                    evenNext.href = "#";
                    evenNext.className = "popup__close";
                    var final = document.createElement("span");
                    final.className = "screen-reader";
                    final.style.color = "black";
                    var oneMore = document.createElement("div");
                    oneMore.className = "popup__content";
                    var textForBlog = document.createElement("p");
                    textForBlog.style.textAlign = "left";
                    var imageForBlog = document.createElement("img");
                    imageForBlog.src = storeImg;
                    imageForBlog.className = "card__image";
                    imageForBlog.style.maxWidth = "100%";
                    var titleForBlog = document.createElement("h4");
                    titleForBlog.textContent = storeTitle;

                    rep = "{\"c\":[{\"v\":\"" + rep;
                    textForBlog.innerHTML += "<br>";
                    while (rep.indexOf("{\"c\":[{\"v\":\"") >= 0){
                        rep = rep.substring(rep.indexOf("{\"c\":[{\"v\":\"")+12);
                        curPara = rep.substring(0, rep.indexOf("\"}]}"));
                        if (curPara == "skip"){
                            rep = "{\"c\":[{\"v\":\"" + rep;
                            break;
                        } 
                        else {
                            while (curPara.indexOf("link=") >= 0){
                                textForBlog.innerHTML += curPara.substring(0, curPara.indexOf("link="));
                                curPara = curPara.substring(curPara.indexOf("link=")+5);
                                var curLink = curPara.substring(0, curPara.indexOf(" "));
                                var linkedText = curPara.substring(curPara.indexOf("***")+3);
                                linkedText = linkedText.substring(0, linkedText.indexOf("***"));
                                textForBlog.innerHTML += "<a target = \"_blank\" href = " + curLink + ">" + linkedText + "</a>";
                                curPara = curPara.substring(curPara.indexOf("***")+3);
                                curPara = curPara.substring(curPara.indexOf("***")+3);
                            }
                            textForBlog.innerHTML += curPara + "<br><br>";
                        }
                    }
                    var break5 = document.createElement("br");
                    var break6 = document.createElement("br");
                    oneMore.append(imageForBlog);
                    oneMore.append(break6);
                    oneMore.append(titleForBlog);
                    oneMore.append(textForBlog);
                    evenNext.append(final);
                    nextLevel.append(evenNext);
                    nextLevel.append(oneMore);
                    popupMain.append(nextLevel);
                    popups[curCard] = popupMain;
                }
            }
            for (var i = 0; i < popups.length; i++){
                if (popups[i] != null){
                    largeContainer.append(popups[i]);
                }
                
            }
        });
}