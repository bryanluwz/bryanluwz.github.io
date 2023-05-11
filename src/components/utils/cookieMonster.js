import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function isCookie() {
	const isCookieAccepted = cookies.get("CookieConsent");
	return isCookieAccepted && JSON.parse(isCookieAccepted);
}

export function setCookieValue(itemName, item) {
	if (isCookie()) {
		cookies.set(itemName, item, '/');
	}
}

export function getCookieValue(itemName) {
	if (isCookie())
		return cookies.get(itemName);
	return null;
}

export function removeAllCookies() {
	if (isCookie())
		Object.keys(cookies.getAll()).forEach(cookieName => {
			cookies.remove(cookieName);
		});
}