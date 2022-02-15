"use strict";

const labTypes = ["production", "automation", "content"];
function getLabText(id, type) {
	if (type) return labUpgCosts[id][game.labUp[labTypes.indexOf(id)]];
	return labText[id][game.labUp[labTypes.indexOf(id)]];
}
