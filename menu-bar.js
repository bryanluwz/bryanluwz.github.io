const open_div = document.getElementById("open-button");
const close_div = document.getElementById("close-button");
const nav_div = document.getElementById("menu-bar");
const body = document.getElementsByTagName("body")[0];
var menubarOpened = false;

function openNav() {
	nav_div.style.width = "20%";
	open_div.className = "menu-container-pressed";
	setTimeout(() => menubarOpened = true, 100);
}

function closeNav() {
	console.log("clicked");
	if (nav_div.style.width != "0%" && menubarOpened) {
		nav_div.style.width = "0%";
		open_div.className = "menu-container";
		setTimeout(() => menubarOpened = false, 100);
	}
}

function main() {
	open_div.addEventListener("click", openNav);	
	close_div.addEventListener("click", closeNav);
	nav_div.addEventListener("mouseleave", closeNav);
	body.addEventListener("click", closeNav);
}

main();