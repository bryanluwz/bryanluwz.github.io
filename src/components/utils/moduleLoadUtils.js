// Returns index of image in images array which matches the module name + '-logo'
export function findIconForModule(moduleName, imagesArray) {
	var regex = new RegExp(`${moduleName}-icon`, "i");

	for (var i = 0; i < imagesArray.length; i++) {
		if (regex.test(imagesArray[i]))
			return imagesArray[i];
	}

	return "./images/shuba.png";
}

export function parseModule(modulesDefault, imagesArray) {
	var dict = {};
	modulesDefault.forEach(moduleDefault => {
		dict[moduleDefault.displayName] = {
			name: moduleDefault.name,
			displayName: moduleDefault.displayName,
			icon: findIconForModule(moduleDefault.displayName.replaceAll(' ', '-'), imagesArray),
			routeLink: moduleDefault.displayName.toLowerCase().replace(/\s+/g, '-'),
			moduleDefault: moduleDefault
		};
	});
	return dict;
}

export function getRouteLink(routeLink, preceedingRouteLink = "") {
	return preceedingRouteLink + "/" + routeLink;
}