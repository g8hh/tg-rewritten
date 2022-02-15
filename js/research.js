"use strict";

function unlockLab() {
	if (game.rupgrades[63]) return;
	if (game.rp.total.lt(470)) return;
	game.rupgrades[63] = 1;
}

function enterExitLab() {
	if (game.inLab) exitLab();
	else enterLab();
}

function getSPGain() {
	return Math.max(
		Math.log(
			game.x.amount.mul(game.y.amount).mul(game.z.amount).add(1).log(5) +
				1
		) ** 2,
		0
	);
}

function enterLab() {
	if (!confirm("您确定要进入实验室吗？")) return;
	game.inLab = true;
	game.upgrades = [];
	game.x.amount = new D(0);
	game.y.amount = new D(0);
	game.z.amount = new D(0);
}

function exitLab() {
	game.sciencePoints.amount = game.sciencePoints.amount.add(getSPGain());
	game.inLab = false;
	game.upgrades = [];
	game.x.amount = new D(0);
	game.y.amount = new D(0);
	game.z.amount = new D(0);
}

function buyLabUpgrade(type) {
	const cost = getLabText(type, true);
	if (game.sciencePoints.amount.lt(cost)) return;
	game.labUp[labTypes.indexOf(type)]++;
	game.sciencePoints.amount = game.sciencePoints.amount.sub(cost);
}
