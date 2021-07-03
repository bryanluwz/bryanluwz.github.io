let bar1 = document.getElementById("r1");
let bar2 = document.getElementById("r2");
let bar3 = document.getElementById("r3");
let bar4 = document.getElementById("r4");
let bars = [bar1, bar2, bar3, bar4];
let slideIndex = 0;

function showSlides() {
	for (var i; i < bars.length; i++) {
		bars[i].checked = false;
	}

	bars[slideIndex].checked = true;

	slideIndex ++;
	if (slideIndex % 4 == 0)  {
		slideIndex = 0;
	}

	setTimeout(showSlides, 7500);
}

showSlides();
