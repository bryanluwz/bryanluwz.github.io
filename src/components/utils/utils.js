export function extractInfomationFromModule(moduleDefault, pathname) {
	var name = moduleDefault.name;
	var displayName = moduleDefault.displayName;
	var routeLink = moduleDefault.displayName.toLowerCase().replace(/\s+/g, '-');
	return {
		name: name,
		displayName: displayName,
		routeLink: pathname + "/" + routeLink
	};
}