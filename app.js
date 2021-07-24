// Sticky navigation bar
const nav = document.getElementById("sticky-nav");
const offsetTop = nav.offsetTop;

function stickyNav() {
	if (window.pageYOffset > offsetTop) {
		nav.style.background = "#262928";
	} else {
		nav.style.background = "none";
	}
}

window.onscroll = stickyNav;

// Random button
const rndbtn = document.getElementById("rndbtn");

// Random button
const randomWebsites = ["https://www.youtube.com/watch?v=hI4dCXtW61c",
						"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
						"https://www.youtube.com/watch?v=G1IbRujko-A",
						"https://www.youtube.com/watch?v=gy1B3agGNxw",
						"https://www.youtube.com/watch?v=R93Uy0dQazE"];

function randomWebsite() {
	window.location = randomWebsites[Math.floor(Math.random() * randomWebsites.length)];
}

rndbtn.addEventListener("click", randomWebsite);

// Random about quote
const quotes = ["Check out bjornlu.com!!",
				"Check out xecom-my.github.io too!",
				"Don't mind me, just filling up your page!",
				"Help I'm being forced to progrsrmgsghfmmm....",
				"Somebody once told me hands off my macaroni.",
				"Does this splash work?",
				"How many more are there?",
				"ERROR 404 - CODE NOT FOUND",
				"Itsa me, M A R I O!",
				"I miss laksa :(",
				"LOOK OUT BEHIND YOU!!",
				"Beep boop GREETINGS FELLOW HUMANS..",
				"I'll be back! 🔥🤖👍",
				"I invented the shovel, it's a groundbreaking invention.",
				"Barry don't wet my bed when I'm not there",
				"Is it a bird? Is it a plane?",
				"Alt + F4 to unlock secret website feature!",
				"LOOK OUT!",
				"↑ ↑ ↓ ↓ ← → ← → A B A B",
				`Your lucky number is ${Math.floor(Math.random() * 10000)}`];
				
const rndQt = document.getElementById("random-quote");

function randomQuotes() {
	quote = quotes[Math.floor(Math.random() * quotes.length)];
	rndQt.innerHTML = quote;
}

randomQuotes()