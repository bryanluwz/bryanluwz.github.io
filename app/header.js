// Sticky Header
const headerOffset = 30;

window.onscroll = (function () {
    if (window.scrollY >= headerOffset) {
        $("#sticky-header").addClass("sticky");
    }
    else {
        $("#sticky-header").removeClass("sticky");
    }
});