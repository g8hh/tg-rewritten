"use strict";

const labText = {
	production: [
		"Raise all production to the power of 1.1.",
		"Multiply xyz production by 1e5, but only in The Lab.",
		"Multiply z production by 10.", "???"
	],
	automation: ["Unlock the Automation tab.", "???"],
	content: ["???"],
};

const labUpgCosts = {
	production: [10, 15, 100, 1e100],
	automation: [0, 1e100],
	content: [1e100],
};

const labCosts = {
	13: 2.5e5,
	14: 1000,
	15: 0,
	16: 250,
	17: Infinity,
	18: Infinity,
	19: Infinity,

	23: 2e4,
	24: 75,
	25: 15,
	26: 10,
	27: 1e6,
	28: Infinity,
	29: Infinity,

	33: Infinity,
	34: Infinity,
	35: 5,
	36: 5e4,
	37: 1e7,
	38: Infinity,
	39: Infinity,

	43: Infinity,
	44: 1e11,
	45: 1e10,
	46: 1e6,
	47: 1e9,
	48: Infinity,
	49: Infinity,

	53: Infinity,
	54: Infinity,
	55: 5e10,
	56: 1e22,
	57: 5e8,
	58: 1e36,
	59: Infinity,

	63: Infinity,
	64: Infinity,
	65: 1e24,
	66: Infinity,
	67: Infinity,
	68: Infinity,
	69: Infinity,
};
