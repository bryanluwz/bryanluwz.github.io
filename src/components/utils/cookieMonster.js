import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function isCookie() {
	const isCookieAccepted = cookies.get("wantsCookie");
	return isCookieAccepted && JSON.parse(isCookieAccepted);
}

export function setCookieValue(itemName, item) {
	if (isCookie()) {
		cookies.set(itemName, item, {
			path: '/',
			maxAge: 90 * 24 * 60 * 60,
		});
	}
}

export function getCookieValue(itemName) {
	if (isCookie())
		return cookies.get(itemName);
	return null;
}

export function removeCookie(itenName) {
	if (isCookie()) {
		cookies.remove(itenName);
	}
}

export function removeAllCookies() {
	if (isCookie())
		Object.keys(cookies.getAll()).forEach(cookieName => {
			cookies.remove(cookieName);
		});
}

export function getAllCookies() {
	if (isCookie())
		return cookies.getAll();
}

export function refreshAllCookies() {
	if (isCookie()) {
		const allCookies = getAllCookies();
		Object.keys(allCookies).forEach(cookieName => {
			setCookieValue(cookieName, allCookies[cookieName]);
		});
	}
}