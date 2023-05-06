export function extractInfomationFromModule(moduleDefault) {
	var name = moduleDefault.name;
	var displayName = moduleDefault.displayName;
	var routeLink = moduleDefault.displayName.toLowerCase().replace(' ', '-');
	return {
		name: name,
		displayName: displayName,
		routeLink: routeLink
	};
}