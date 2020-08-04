"use strict";

cache.upgrades = Object.keys(upgradeInfo).filter(
	n => !["17", "54"].includes(n)
);

cache.preAthRupgrades = [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43];

cache.xUpgrades = cache.upgrades
	.filter(k => upgradeInfo[k][2] === "x")
	.map(n => Number(n));
cache.yUpgrades = cache.upgrades
	.filter(k => upgradeInfo[k][2] === "y")
	.map(n => Number(n));
cache.zUpgrades = cache.upgrades
	.filter(k => upgradeInfo[k][2] === "z")
	.map(n => Number(n));

function max() {
	cache.upgrades.forEach(n => app.clickHandler(n));
	if (game.aupgrades.includes(2)) {
		// max all rebirth
		cache.preAthRupgrades.forEach(n => {
			for (
				let i = game.rupgrades[n] || 0;
				i < rebirthUpgradeInfo[n][1].length;
				i++
			)
				buyreb(n);
		});
	}
}

function goLeft() {
	game.currentTab--;
	if (game.currentTab === -1) {
		if (game.rupgrades[14]) game.currentTab = 2;
		else if (game.rebirthed) game.currentTab = 1;
		else game.currentTab = 0;
	}
	sanitizeTabs();
	showTab(game.currentTab, false);
}

function goRight() {
	game.currentTab++;
	if (game.currentTab >= 4) game.currentTab = 0;
	sanitizeTabs();
	showTab(game.currentTab, false);
}

function sanitizeTabs() {
	if (
		(game.currentTab === 1 && !game.rebirthed) ||
		(game.currentTab === 2 && !game.rupgrades[14]) ||
		game.currentTab === 3 ||
		game.currentTab === 4
	) {
		game.currentTab = 0;
	}
}

Mousetrap.bind("m", max, "keydown");
Mousetrap.bind(
	"r",
	() => {
		if (game.inTrial === 0) rebirth();
		else completeTrial();
	},
	"keyup"
);
Mousetrap.bind("left", goLeft, "keyup");
Mousetrap.bind("right", goRight, "keyup");
