"use strict";

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

	51: ["invis", [Infinity]],
	52: ["invis", [Infinity]],
	53: ["invis", [Infinity]],
	54: ["invis", [Infinity]],
	55: ["Self Buff", [10, 10]],

	61: ["invis", [Infinity]],
	62: ["invis", [Infinity]],
	63: ["???", [600]],
	64: ["invis", [Infinity]],
	// actual cost: 14, will probably be higher later on.
	// changed to 1e100 so people wont BUY IT >:(
	65: ["More Upgrades", [7, 1e100]],

	71: ["invis", [Infinity]],
	72: ["invis", [Infinity]],
	73: ["invis", [Infinity]],
	74: ["invis", [Infinity]],
	75: ["Upgrade Buff", [36, 35]],

	81: ["Core y", [1e100]],
	82: ["Exponential z", [35]],
	83: ["Core z", [20, 30]],
	84: ["Exponential y", [45, 15, 5]],
	85: ["Rebirth Buff", [5]],

	91: ["Core Buff", [1e100]],
	92: ["invis", [Infinity]],
	93: ["invis", [Infinity]],
	94: ["invis", [Infinity]],
	95: ["invis", [Infinity]],
};

const rebirthTooltips = {
	11: "为 x 的产生提供一个静态乘数。",
	12: "根据几个因素为 y 提供一个乘数。",
	13: "降低所有升级的成本。",
	14: "解锁另一棵树。",
	15: "自动购买普通升级。",

	21: "为 y 的产生提供一个静态乘数。",
	22: "对随时间变化的 x 的产生给出一个乘数。",
	23: "增加 x 的核心产量。",
	24: "你可以把这些花在另一棵树上。",
	25: "为 xyz 生产提供动态乘数。",

	31: "给 z 的产生一个静态乘数。",
	32: "给随着时间的推移而增长的 z 的产生乘数。",
	33: "获得一个静态乘数到 RP。",
	34: "你可以把这些花在另一棵树上。",
	35: "根据您拥有的 z 的 OoM 获得您的 RP 乘数。",

	41: "使RP公式更好。",
	42: "Give a static multiplier to xyz production.",
	43: "Give a multiplier to xyz production based on your total RP.",
	44: "You can spend these on Another Tree.",
	45: "Make upgrades that cost xyz even cheaper.",

	55: "Boost xyz production based off of xyz production.",

	63: "???",
	65: "Unlock more upgrades on the main tree.",

	75: "Gain a boost to production based on the amount of upgrades you have.",

	81: "Gain a boost to the core proudction of y.",
	82: "Gain an exponential boost to the production of z.",
	83: "Increase the core production of z.",
	84: "Gain an exponential boost to y production.",
	85: "Gain a boost to production based on the amount of rebirth upgrades you have.",
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
	81: [91],
	82: [81],
	83: [82],
	84: [83],
	85: [84],
};

// Last one could be janky
const costDiv = [1, 2, 5, 25, 100, 5e7, 1e50];

const rebirthRowInfo = Object.keys(rebirthUpgradeInfo)
	.map(n => n[0])
	.filter((n, i, s) => s.indexOf(n) === i)
	.map(n => Object.keys(rebirthUpgradeInfo).filter(m => m.startsWith(n)));
rebirthRowInfo.unshift(null);
