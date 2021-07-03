var slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);  
}

function showSlides(n) {
    var i;
    var slides = document.getElementByClassName("mySlides");
    var dots = document.getElementByClassName("slideshow-dot");

    if (n > slides.length) {
        slideIndex = 1;
    }

    for (i = 0; i < dot.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    } 
    
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active"
}