const lmgtfyInput = document.getElementById("lmgtfy-input");
const lmgtfyBtn = document.getElementById("lmgtfy-button");

function lmgtfyFunction() {
	var searchString = "";
	var textInput = lmgtfyInput.value;
	for (var i = 0; i < textInput.length; i++) {
		if (textInput[i] != " ") {
			searchString += textInput[i];
		} else {
			searchString += "+";
		}
	}
	
	var httpString = "https://letmegooglethat.com/?q=" + searchString;
	window.location.href = httpString;
}

function lmgtfyInputTrigger(event) {
	if (event.keyCode == 13) {
		lmgtfyFunction();
	}
}

lmgtfyInput.addEventListener("keyup", (event) => { lmgtfyInputTrigger(event); });
lmgtfyBtn.addEventListener("click", lmgtfyFunction);