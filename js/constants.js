"use strict";

const upgradeInfo = {
	13: ["Start producing y.", 5e3, "x"],
	14: ["Increase core production of x by 10.", 333, "x"],
	15: ["Start the game.", 0, "x"],
	16: ["Increase core production of x by 3.", 15, "x"],
	18: ["Triple all production.", 1e21, "x"],
	19: ["Placeholder.", Infinity, "x"],

	23: ["Multiply x production by 7.5.", 1e3, "x"],
	24: ["Increase the production of x based on x.", 100, "x"],
	25: ["Double the production of x.", 5, "x"],
	26: ["Increase core production of y by 4.", 15, "y"],
	27: ["Multiply y production by 10.", 2.5e4, "x"],
	28: ["Double all production.", 1e18, "x"],
	29: ["Placeholder.", Infinity, "x"],

	33: ["Raise x production to the power of 1.25.", 6.25e6, "z"],
	34: ["Multiply y production by 5.", 5e6, "z"],
	35: ["x boosts y production at a rate of x<sup>1/6</sup>.", 25, "z"],
	36: ["Multiply x production by 5.", 50, "y"],
	37: ["Multiply y production by 5.", 2.5e6, "x"],
	38: ["Quadruple all production.", 1e22, "x"],
	39: ["Quintuple all production.", 5e103, "x"],

	43: ["Multiply y production by 5.", 1.5e8, "z"],
	44: ["Multiply y production by 4.", 5e5, "z"],
	45: ["Multiply y production by 10.", 1e8, "y"],
	46: ["Square core x production.", 1e3, "y"],
	47: ["Start producing z.", 5e6, "x"],
	48: ["Double z production.", 2e7, "x"],
	49: ["Quintuple z production.", 5e79, "x"],

	53: ["Raise y production to the power of 1.2.", 2.5e18, "z"],

	55: ["Multiply x production by 1000.", 1e9, "x"],
	56: ["Multiply z production by 10.", 2.5e12, "x"],
	57: ["Multiply y production by 10.", 1e5, "z"],
	58: ["Square z production.", 1e13, "x"],
	59: ["Placeholder.", Infinity, "x"],

	63: ["Multiply y production by 1000.", 5e73, "x"],
	64: ["Cube the core production of x.", 5e57, "y"],
	65: ["Multiply x production by z<sup>0.75</sup>.", 2.5e31, "y"],
	66: ["haha this is a placeholder", Infinity, "x"],
	67: ["Multiply z production based on z.", 2.5e29, "y"],
	68: ["Boost y production based on x and z.", 1e22, "z"],
	69: ["Placeholder.", Infinity, "x"],

	73: ["Placeholder.", Infinity, "x"],
	74: ["Placeholder.", Infinity, "x"],
	75: ["Placeholder.", Infinity, "x"],
	76: ["Placeholder.", Infinity, "x"],
	77: ["Placeholder.", Infinity, "x"],
	78: ["Placeholder.", Infinity, "x"],
	79: ["Placeholder.", Infinity, "x"],
};

const rebirthUpgradeInfo = {
	11: ["Better x", [1, 2, 2, 3]],
	12: ["Dynamic y", [1, 1, 1]],
	13: ["Cheaper Upgrades", [2, 3, 2, 4]],
	// Actutually 85 but shhh
	14: ["Content Expansion", [0]],
	15: ["Auto Game", [2, 2, 2]],

	21: ["Better y", [1, 2, 3]],
	22: ["Dynamic x", [2, 2]],
	23: ["Core x", [2, 2]],
	24: [".", [1e100]],
	25: ["Dynamic Buff", [3, 14]],

	31: ["Better z", [1, 2, 1]],
	32: ["Dynamic z", [2, 2]],
	33: ["Static RP", [2, 8]],
	34: [".", [1e100]],
	35: ["Enhanced Formula", [18, 9, 12]],

	41: ["Better RP", [1, 2, 4]],
	42: ["Production Buff", [4, 5]],
	43: ["RP Buff", [3, 6]],
	44: [".", [1e100]],
	45: ["Even Cheaper Upgrades", [25, 1e100]],

	55: ["Self Buff", [10]],
	63: ["Unlock Choice Tree.", [1e13]],
	65: ["More Upgrades", [7, 14]],
	75: ["Upgrade Buff", [38, 35]],
	85: ["Rebirth Buff", [5]],

	83: ["Core z", [1e100]],
	84: ["Exponential y", [45, 15, 5]],
};

// Last one could be janky
const costDiv = [1, 2, 5, 25, 100, 5e7, 1e50];

let choiceUpgrades = {
	start: 1,
	end: 11 - 1,
	"11": "RP formula is better.",
	"12": "z has a greater effect on RP gain.",
	"13": "Gain a static multiplier to z production.",
	"22": null,
	"31": "x and y affect RP gain more.",
	"32": "y and z affect RP gain more.",
	"33": "x and z affect RP gain more.",
	"42": null,
	"51": "x boosts z production.",
	"52": "RP affects pre-rebirth production even more.",
	"53": "y boosts z production.",
	"62": null,
	"71":
		"Gain a multiplier to RP equal to 100<sup>n</sup>, n being the amount of right choice upgrades you have.",
	"72":
		"Gain a multiplier to RP equal to 100<sup>n</sup>, n being the amount of middle choice upgrades you have.",
	"73":
		"Gain a multiplier to RP equal to 100<sup>n</sup>, n being the amount of left choice upgrades you have.",
	"82": null,
	"91": "Gain a multiplier to RP based on x.",
	"92": "Gain a multiplier to RP based on y.",
	"93": "Gain a multiplier to RP based on z.",
	"102": null,
	"111": "Multiply core production of x by 1e25.",
	"112": "This upgrade does absolutely nothing.",
	"113": "Multiply core production of z by 1e10.",
	"122": null,
};

choiceUpgrades = { start: 1, end: 0 };

const trialInfo = [
	"All production is raised to the power of 2.2, but all upgrade costs are raised" +
		" to the power of 1.5, and choice and rebirth upgrades don't work.",
	"All production is raised to the power of 0.1.",
	"All production is divided by 5 and rebirth and choice upgrades have no effect.",
	"Rebirth upgrades don't work.",

	"Production is raised to the power of (1 ÷ amount of normal upgrades you have)",
	"You can only buy 15 upgrades.",
	"Choice upgrades don't work, along with the last row of rebirth upgrades.",
	"This is just a normal run.",
];

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
	8: ["Minecraft IRL, your computer turns into a 1-meter cube of solid metal.", 1e100, "a"],
	9: ["Make the \"Exponential y\" upgrade more powerful.", 10, "a"],
	10: ["Make everyone realize it's called \"Another Tree\" and not \"abc Tree\".", 1e100, "a"],

	11: ["Spend an hour making your terminal look fancy instead of working on the game.", 1e100, "a"],
	12: ["Realize it's gonna be a while before you can automate a production.", 1e100, "a"],
	13: ["never gonna give you up, get rique rol't!", 1e100, "a"],
	14: ["Gain the ability to say curse words on any Discord server.", 1e100, "a"],
	15: ["Remove all timewalls from OM.", 1e100, "a"],

	16: ["Get around to making all the other options selects instead of buttons.", 1e100, "a"],
	17: ["Migrate from break_infinty to break_eternity.", 1e100, "a"],
	18: ["Leak Yhvr's localhost, getting access to beta beta.", 1e100, "a"],
	19: ["Ghostify IRL.", 1e100, "a"],
	20: ["Multiply all production by infinity. Game over, you won.", 1e100, "a"],

	21: ["Get admin on the Discord server.", 1e100, "a"],
	22: ["Realize these are all placeholders.", 1e100, "a"],
	23: ["Multiply all production by NaN.", 1e100, "a"],
	24: ["Unlock you're mom.", 1e100, "a"],
	25: ["Unlock the next prestige layer. Nah, just kidding.", 1e100, "a"],
};

const childList = {
	14: [13],
	15: [25, 16],
	16: [26],
	24: [14, 23],
	25: [24],
	26: [36, 27],
	27: [17, 28],
	28: [18, 38],
	33: [43],
	34: [33],
	35: [45],
	36: [46, 35, 37],
	37: [47],
	38: [39],
	43: [53],
	44: [34],
	45: [44, 55],
	// 46: [55],
	47: [48],
	48: [49],
	53: [54, 63],
	55: [56, 65],
	56: [57],
	57: [58, 67],
	65: [64],
	67: [68, 66],
};

const rebirthChildList = {
	11: [12, 21],
	12: [13, 22],
	13: [14, 23],
	14: [15, 24],
	15: [25],
	21: [31],
	22: [32],
	23: [33],
	24: [34],
	25: [35],
	31: [41],
	32: [42],
	33: [43],
	34: [44],
	35: [45],
	41: [63],
	42: [63],
	43: [63],
	44: [63],
	45: [55],
	55: [65],
	65: [75],
	75: [85],
	82: [81],
	83: [82],
	84: [83],
	85: [84],
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
