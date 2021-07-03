const randomButton_div = document.getElementById("random-button");
var randomPages = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ/", 
				   	"https://xecom-my.github.io/",
				   	"https://bjornlu.com/",
				   	"https://github.com/bryanluwz/bryanluwz.github.io",
				   	"https://letmegooglethat.com/?q=how+to+build+a+website",
				  	"https://www.youtube.com/watch?v=gy1B3agGNxw",
				   	"https://www.youtube.com/watch?v=G1IbRujko-A",
				   	"https://longdogechallenge.com/",
					"http://heeeeeeeey.com/",
					"http://corndog.io/",
					"https://alwaysjudgeabookbyitscover.com",
					"http://eelslap.com/",
					"http://endless.horse/",
					"http://www.rrrgggbbb.com/",
					"http://beesbeesbees.com/",
					"http://www.koalastothemax.com/",
					"http://randomcolour.com/",
					"http://cat-bounce.com/",
					"http://chrismckenzie.com/",
					"https://thezen.zone/",
					"http://ihasabucket.com/",
					"http://corndogoncorndog.com/",
					"https://pointerpointer.com",
					"http://imaninja.com/",
					"http://iamawesome.com/",
					"http://unicodesnowmanforyou.com/",
					"http://chillestmonkey.com/",
					"http://www.crossdivisions.com/",
					"http://tencents.info/",
					"https://boringboringboring.com/",
					"http://www.patience-is-a-virtue.org/",
					"http://pixelsfighting.com/",
					"http://isitwhite.com/",
					"https://existentialcrisis.com/",
					"http://onemillionlols.com/",
					"http://www.omfgdogs.com/",
					"http://oct82.com/",
					"http://chihuahuaspin.com/",
					"http://www.blankwindows.com/",
					"http://dogs.are.the.most.moe/",
					"http://tunnelsnakes.com/",
					"http://www.trashloop.com/",
					"http://www.ascii-middle-finger.com/",
					"http://spaceis.cool/",
					"http://www.donothingfor2minutes.com/",
					"http://buildshruggie.com/",
					"http://buzzybuzz.biz/",
					"http://yeahlemons.com/",
					"http://wowenwilsonquiz.com",
					"https://thepigeon.org/",
					"http://notdayoftheweek.com/",
					"http://www.amialright.com/",
					"http://nooooooooooooooo.com/",
					"https://greatbignothing.com/",
					"https://www.bouncingdvdlogo.com/",
					"https://remoji.com/",
					"http://papertoilet.com/"
];

function randomPage() {
	randomIndex = Math.floor(Math.random() * randomPages.length);
	window.location.href = randomPages[randomIndex];
}

function randomButton() {
	randomButton_div.addEventListener("click", randomPage);
}

randomButton();

// =====================================================

// const header = document.getElementById("sticky-header");
// const sticky = header.offsetTop;

// function stickyHeader() {
// 	if (window.pageYOffset > sticky) {
// 		header.classList.add("sticky");
// 		header.style.background = "#1f2833";
// 	} else {
// 		header.classList.remove("sticky");
// 		header.style.background = "none";
// 	}
// }

// window.onscroll = stickyHeader;

// =====================================================
