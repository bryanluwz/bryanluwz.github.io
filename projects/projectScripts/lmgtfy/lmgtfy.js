function createGoogleLink() {
    var searchQuery = $("#searchbox").val();
    if (searchQuery == "") {
        return "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
    return "https://www.google.com/search?q=" + searchQuery;
}

function initSearchButton() {
    $("#searchbox-button").click(() => {
        window.open(createGoogleLink());
    })
}

window.onload = (() => {
    initSearchButton();
})