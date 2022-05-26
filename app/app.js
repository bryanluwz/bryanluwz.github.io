const splashTexts = [
    "Peanut Butter Jelly Time!",
    "The cake is a lie",
    "There is no game",
    "Boo",
    "I'm blue da ba dee da ba da",
    "Never gonna give you up",
    "Never gonna let you down",
    "Never gonna run around and desert you",
    "Maya hee Maya hoo Maya ha Maya haha",
    "中文字",
    "发粪涂墙",
    "こんにちは",
    "お前はもう死んでいる",
    "I wonder how many splash text are there",
    '<span style="color: gold">Congratulations, you saw the golden splash</span>',
    "I'm bored.<br>So I made this website.<br>Enjoy! ;)",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    "Merry Christmas",
    '<span style="font-size: 5px">This font is so small, why are you even reading this? Move away from the screen, it is not good to be so near it.',
    "We're no strangers to love",
    "Hopefully doth not butter parsnips",
    "Hey Alexa, play Despacito",
    "When you assume, you make an ass out of u and me",
    "1 + 1 = 10",
    "There are more airplanes in the ocean than<br>submarines in the sky",
    "A bunch of goose are geese<br>A bunch of moose are meese",
    "Mickey Mouse is a rat",
    "Is a zebra black with white stripes<br>or white with black stripes?",
    "Does a poison becomes more poisonous after it expires?",
    "Barry, can you please be quiet!",
    '<span style = "font-size: 2.5rem !important">E</span>'
];

var splashTextIndices = [];

// The random page button
function initButton() {
    const topBodyButton = document.getElementById("top-body-button");

    if (topBodyButton == null) {
        return;
    }

    $(topBodyButton).click(() => {
        // No splash repeat until every splash is used
        if (splashTextIndices.length == splashTexts.length) {
            splashTextIndices = [];
        }

        var newIndex = getNewIndex(splashTexts.length, splashTextIndices);
        splashTextIndices.push(newIndex);

        replaceSplashText(splashTexts, splashTextIndices);
    })
}

// Random splash text
function replaceSplashText(splashTextArray, indexArr) {
    const splashText = document.getElementById("random-splash-text");

    var newText = splashTextArray[indexArr[indexArr.length - 1]];

    $(splashText).fadeOut();
    $(splashText).promise().done(() => {
        splashText.innerHTML = newText;
        $(splashText).fadeIn();
    });
}

function getNewIndex(arrLength, indexArr) {
    var randomIndex = 0;
    do {
        randomIndex = Math.floor(Math.random() * arrLength);
    } while (indexArr.includes(randomIndex));
    return randomIndex;
}

// Placeholders dummy links 
function initDummyButton() {
    const dummyButtons = document.getElementsByClassName("dummy-button");
    for (var i = 0; i < dummyButtons.length; i++) {
        dummyButtons[i].onclick = () => {
            alert("The owner of this site does not have that.");
        }
    }
}

$(() => {
    initButton();
    initDummyButton();
    document.getElementById("top-body-button") != null ? document.getElementById("top-body-button").click() : 69;
})