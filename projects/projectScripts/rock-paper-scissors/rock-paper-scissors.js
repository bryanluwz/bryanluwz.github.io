// Main function
window.onload = $(() => {
    main();
})

// Global variable
var choices = ['r', 'p', 's'];

const playerScoreSelector = "#rps-player-scoreboard .rps-scoreboard-section-subtitle"
const computerScoreSelector = "#rps-computer-scoreboard .rps-scoreboard-section-subtitle"
var playerScore = 0;
var computerScore = 0;

var playerChoice = 'r';
var playerElem = null;
var playerElems = ["#rps-player-rock", "#rps-player-paper", "#rps-player-scissors"];

var computerChoice = 'r';
var computerElem = null;
var computerElems = ["#rps-computer-rock", "#rps-computer-paper", "#rps-computer-scissors"];

var isTurnFinish = true;

// Winner blink green, text will fade in, change number, and fade out
// Loser blink red
// Tie blink gray
function play() {
    if (!isTurnFinish) {
        return;
    }

    var result = Math.floor(Math.random() * 3);

    playerElem = playerElems[(choices.indexOf(playerChoice))];

    computerChoice = choices[(choices.indexOf(playerChoice) + result) % choices.length];
    computerElem = computerElems[(choices.indexOf(playerChoice) + result) % choices.length];

    isTurnFinish = false;

    // 0 1 2 -> tie, lose, win
    if (result == 0) {
        $("#rps-player-scoreboard").addClass('tie-scoreboard');
        $("#rps-computer-scoreboard").addClass('tie-scoreboard');
        $(playerElem).addClass('tie');
        $(computerElem).addClass('tie');
        setTimeout(() => {
            $("#rps-player-scoreboard").removeClass('tie-scoreboard');
            $("#rps-computer-scoreboard").removeClass('tie-scoreboard');
            $(playerElem).removeClass('tie');
            $(computerElem).removeClass('tie');
            isTurnFinish = true;
        }, 500);
    }
    else if (result == 1) {
        $("#rps-player-scoreboard").addClass('loser-scoreboard');
        $("#rps-computer-scoreboard").addClass('winner-scoreboard');
        $(playerElem).addClass('loser');
        $(computerElem).addClass('winner');
        $(computerScoreSelector).fadeOut();
        $(computerScoreSelector).promise().done(() => {
            $(computerScoreSelector).text(++computerScore);
            $(computerScoreSelector).fadeIn();
        });
        setTimeout(() => {
            $("#rps-player-scoreboard").removeClass('loser-scoreboard');
            $("#rps-computer-scoreboard").removeClass('winner-scoreboard');
            $(playerElem).removeClass('loser');
            $(computerElem).removeClass('winner');
            isTurnFinish = true;
        }, 500);
    }
    else if (result == 2) {
        $("#rps-player-scoreboard").addClass('winner-scoreboard');
        $("#rps-computer-scoreboard").addClass('loser-scoreboard');
        $(playerElem).addClass('winner');
        $(computerElem).addClass('loser');
        $(playerScoreSelector).fadeOut();
        $(playerScoreSelector).promise().done(() => {
            $(playerScoreSelector).text(++playerScore);
            $(playerScoreSelector).fadeIn();
        });
        setTimeout(() => {
            $("#rps-player-scoreboard").removeClass('winner-scoreboard');
            $("#rps-computer-scoreboard").removeClass('loser-scoreboard');
            $(playerElem).removeClass('winner');
            $(computerElem).removeClass('loser');
            isTurnFinish = true;
        }, 500);
    }
}

function initButtons() {
    $('#rps-player-rock').click(() => {
        playerChoice = 'r';
        play();
    })

    $('#rps-player-paper').click(() => {
        playerChoice = 'p';
        play();
    })

    $('#rps-player-scissors').click(() => {
        playerChoice = 's';
        play();
    })
}

function main() {
    initButtons();
}