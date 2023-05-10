export function isCookie() {
	const isCookieAccepted = localStorage.getItem("isCookieAccepted");
	return isCookieAccepted && JSON.parse(isCookieAccepted);
}

export function setLocalStorageItem(itemName, item) {
	if (isCookie())
		localStorage.setItem(itemName, item);
}

export function getLocalStorageItem(itemName) {
	if (isCookie()) {
		const item = localStorage.getItem(itemName);
		return item;
	}
	return null;
}