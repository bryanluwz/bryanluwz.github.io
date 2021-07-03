let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p")
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice() {
	const choices = ["r", "p", "s"];
	return choices[Math.floor(Math.random() * 3)];
}

function convertLetterToWord (letter) {
	if (letter === "r") return "Rock";
	if (letter === "p") return "Paper";
	if (letter === "s") return "Scissors";
	return "ERROR"
}

function win(userChoice, computerChoice) {
	const userChoiceString = convertLetterToWord(userChoice).fontcolor("green");
	const computerChoiceString = convertLetterToWord(computerChoice).fontcolor("red");
	const userChoice_div = document.getElementById(userChoice);

	userScore ++;
	userScore_span.innerHTML = userScore;
	computerScore_span.innerHTML = computerScore;

	result_p.innerHTML = `${userChoiceString} beats ${computerChoiceString}. You won! 🔥`;
	userChoice_div.classList.add("green-glow");
	setTimeout(() => userChoice_div.classList.remove("green-glow"), 300);
}

function lose(userChoice, computerChoice) {
	const userChoiceString = convertLetterToWord(userChoice).fontcolor("red");
	const computerChoiceString = convertLetterToWord(computerChoice).fontcolor("green");
	const userChoice_div = document.getElementById(userChoice);

	computerScore ++;
	userScore_span.innerHTML = userScore;
	computerScore_span.innerHTML = computerScore;

	result_p.innerHTML = `${userChoiceString} loses to ${computerChoiceString}. You lost! 💩`;
	userChoice_div.classList.add("red-glow");
	setTimeout(() => userChoice_div.classList.remove("red-glow"), 300);
}

function draw(userChoice, computerChoice) {
	const userChoiceString = convertLetterToWord(userChoice).fontcolor("gray");
	const computerChoiceString = convertLetterToWord(computerChoice).fontcolor("gray");
	const userChoice_div = document.getElementById(userChoice);

	userScore_span.innerHTML = userScore;
	computerScore_span.innerHTML = computerScore;

	result_p.innerHTML = `${userChoiceString} equals ${computerChoiceString}. It's a draw! (❁\´◡\`❁)`;
	userChoice_div.classList.add("gray-glow");
	setTimeout(() => userChoice_div.classList.remove("gray-glow"), 300);
}

function game(userChoice) {
	const computerChoice = getComputerChoice();
	switch (userChoice + computerChoice) {
		case "rs":
		case "pr":
		case "sp":
		win(userChoice, computerChoice);
		break;
		case "rp":
		case "ps":
		case "sr":
		lose(userChoice, computerChoice);
		break;
		case "rr":
		case "pp":
		case "ss":
		draw(userChoice, computerChoice);
		break;
	}
}

function main() {
	rock_div.addEventListener("click", () => game("r"));
	paper_div.addEventListener("click", () => game("p"));
	scissors_div.addEventListener("click", () => game("s"));
}

main();




