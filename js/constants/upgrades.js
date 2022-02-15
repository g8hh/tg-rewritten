"use strict";

const upgradeInfo = {
	13: ["Start producing y.", 5e3, "x"],
	14: ["Increase core production of x by 10.", 333, "x"],
	15: ["Start the game.", 0, "x"],
	16: ["Increase core production of x by 3.", 15, "x"],
	17: ["."],
	18: ["Triple all production.", 1e21, "x"],
	19: ["Septuple all production.", Infinity, "x"],

	23: ["Multiply x production by 7.5.", 1e3, "x"],
	24: ["Increase the production of x based on x.", 100, "x"],
	25: ["Double the production of x.", 5, "x"],
	26: ["Increase core production of y by 4.", 15, "y"],
	27: ["Multiply y production by 10.", 2.5e4, "x"],
	28: ["Double all production.", 1e18, "x"],
	29: ["Sextuple all production.", 5e110, "x"],

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
	54: ["pog champ"],
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

const childList = {
	14: [13],
	15: [25, 16],
	16: [26],
	24: [14, 23],
	25: [24],
	26: [36, 27],
	27: [17, 28],
	28: [18, 29, 38],
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

const rowInfo = Object.keys(upgradeInfo)
	.map(n => n[0])
	.filter((n, i, s) => s.indexOf(n) === i)
	.map(n => Object.keys(upgradeInfo).filter(m => m.startsWith(n)));
rowInfo.unshift(null);
