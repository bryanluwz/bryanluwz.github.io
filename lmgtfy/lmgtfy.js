const lmgtfyInput = document.getElementById("lmgtfy");
const lmgtfyBox = document.getElementById("lmgtfy-box");

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

lmgtfyBox.addEventListener("click", lmgtfyFunction);
