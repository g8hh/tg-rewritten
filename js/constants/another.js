"use strict";

// IDEAS
// static mult to a production
// mult to a production based off rp
// mult to rp based off of y
// buying a from shop gives more a // not shop but you know what i mean
// more a based on a
// // b won't be unlocked
// boost max bulk trial based off of b
// 5x b from buying from shop
// reduce trial goals based on bought b

const anotherUpgrades = {
	1: ["Boost y production based on x.", 1, "a"],
	2: ["Unlock a new set of rebirth upgrades.", 1, "a"],
	3: ["Gain a small multiplier to RP gain.", 1, "a"],
	4: ["Boost xyz production by a static 1e5x.", 1, "a"],
	5: ["Unlock even more rebirth upgrades.", 1, "b"],

	6: ["help i ran out of ideas.", 1e100, "a"],
	7: ["Get 0.05a/s.", 100, "b"],
	8: [
		"Minecraft IRL, your computer turns into a 1-meter cube of solid metal.",
		1e100,
		"a",
	],
	9: ['Make the "Exponential y" upgrade more powerful.', 10, "a"],
	10: [
		'Make everyone realize it\'s called "Another Tree" and not "abc Tree".',
		1e100,
		"a",
	],

	11: [
		"Spend an hour making your terminal look fancy instead of working on the game.",
		1e100,
		"a",
	],
	12: [
		"Realize it's gonna be a while before you can automate a production.",
		1e100,
		"a",
	],
	13: ["never gonna give you up, get rique rol't!", 1e100, "a"],
	14: ["Boost all production based on how many a's you have bought.", 4, "b"],
	15: ["Remove all timewalls from OM.", 1e100, "a"],

	16: [
		"Get around to making all the other options selects instead of buttons.",
		1e100,
		"a",
	],
	17: ["Migrate from break_infinty to break_eternity.", 1e100, "a"],
	18: ["Leak Yhvr's localhost, getting access to beta beta.", 1e100, "a"],
	19: ["Ghostify IRL.", 1e100, "a"],
	20: [
		"Multiply all production by infinity. Game over, you won.",
		1e100,
		"a",
	],

	21: ["Get admin on the Discord server.", 1e100, "a"],
	22: ["Realize these are all placeholders.", 1e100, "a"],
	23: ["Multiply all production by NaN.", 1e100, "a"],
	24: ["Unlock you're mom.", 1e100, "a"],
	25: ["Unlock the next prestige layer. Nah, just kidding.", 1e100, "a"],
};

const anotherChildList = {
	1: [2],
	2: [3, 7],
	3: [4],
	4: [5, 9],
	7: [6, 8, 12],
	9: [14],
	14: [13, 15, 19],
	15: [10],
};
