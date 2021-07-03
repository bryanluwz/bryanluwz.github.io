const open_div = document.getElementById("open-button");
const close_div = document.getElementById("close-button");
const nav_div = document.getElementById("menu-bar");

function openNav() {
	document.getElementById("menu-bar").style.width = "20%";
}

function closeNav() {
	if (document.getElementById("menu-bar").style.width != "0%") {
		document.getElementById("menu-bar").style.width = "0%";
	}
}

function main() {
	open_div.addEventListener("click", openNav);	
	close_div.addEventListener("click", closeNav);
	nav_div.addEventListener("mouseleave", closeNav);
}

main();