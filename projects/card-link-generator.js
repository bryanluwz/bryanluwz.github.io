function generateLink() {
    const cardsCollection = document.getElementsByClassName("portfolio-card-wrapper");
    // const cardsArr = [].slice.call(cardsCollection);
    
    for (var i = 0; i < cardsCollection.length; i++) {
        var pathPrefix = "./";
        var link = pathPrefix + stringToLink(cardsCollection[i].getElementsByClassName("title")[0].innerText) + ".html";
        cardsCollection[i].href = link;
    }
}

function stringToLink(s) {
    var t = s.toLowerCase();
    t = t.replace(/ /g,"-");
    return t;
}

window.onload = (() => {generateLink();});