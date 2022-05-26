function generateCardsLink() {
    const cardsCollection = document.getElementsByClassName("portfolio-card-wrapper");
    // const cardsArr = [].slice.call(cardsCollection);
    
    for (var i = 0; i < cardsCollection.length; i++) {
        var pathPrefix = "";
        if (cardsCollection[i].parentElement.id == "blogs-cards-wrapper") {
            pathPrefix = "./blogs/";
        }
        else {
            pathPrefix = "./projects/"
        }
        var link = pathPrefix + stringToLink(cardsCollection[i].getElementsByClassName("title")[0].innerText) + ".html";
        cardsCollection[i].href = link;
    }
}

function stringToLink(s) {
    var t = s.toLowerCase();
    t = t.replace(/ /g,"-");
    return t;
}

$(generateCardsLink)