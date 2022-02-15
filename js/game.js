/* eslint-disable no-var */
"use strict";

const defaultGame = {
	x: { amount: new D(0) },
	y: { amount: new D(0) },
	z: { amount: new D(0) },
	rp: { amount: new D(0), total: new D(0) },
	a: {
		amount: new D(0),
		bought: new D(0),
	},
	b: {
		amount: new D(0),
		bought: new D(0),
	},
	c: {
		amount: new D(0),
		bought: new D(0),
	},
	sciencePoints: {
		amount: new D(0),
		total: new D(0),
	},
	upgrades: [],
	rupgrades: {},
	choice: {
		depth: 0,
		choices: [],
	},
	theme: 0,
	notation: 0,
	tab: [0, 0],
	hover: true,
	rebirthed: false,
	inLab: false,
	labUp: [0, 0, 0],
	trialTreeUnlocked: false,
	inTrial: 0,
	// __only__ store completions, rest can be done with m a f s
	trials: new Array(8).fill(0),
	aupgrades: [],
	lastTick: Date.now(),
	version: 9,
	currentTab: 0,
};

var game = defaultGame;

const tabs = ["upgrades", "rebirth", "another", "lab", "options", "automation"];

function showTab(no, updateCurrentTab = true) {
	if (updateCurrentTab) game.currentTab = no;
	tabs.forEach(
		// NOTE TO SELF!
		// If you see an error caused by this line,
		// THIS LINE DID NOT CAUSE IT!
		// vue got an error on init. scroll up in
		// the console. <3
		n => (document.getElementById(`${n}Tab`).style.display = "none")
	);
	document.getElementById(`${tabs[no]}Tab`).style.display = "block";
	renderFocusedTree();
}

// Set default notation
var not = new ADNotations.ScientificNotation();

// Buy an upgrade
function buybtn(ele) {
	let ele2;
	if (typeof ele === "number") ele2 = document.getElementById(ele);
	else ele2 = ele;
	const id = Number(ele2 ? ele2.id : ele);
	// Check to make sure the user knows the upgrade exists
	if (id % 10 === 9 && game.rupgrades[65] < 1) return;
	if (id >= 70 && game.rupgrades[65] < 2) return;
	// I need this. i don't know why.
	if (!ele2) return;
	const cost = game.inLab
		? new D(labCosts[id])
		: new D(upgradeInfo[id][1]).div(
				costDiv[(game.rupgrades[13] || 0) + (game.rupgrades[45] || 0)]
		  );
	const costCurr = upgradeInfo[id][2];
	// Reject the purchase of the upgrade if you already have it
	if (game.upgrades.includes(id)) return;
	// Reject the purchase of the upgrade if it's too expensive
	if (cost.gt(game[costCurr].amount)) return;
	// Reject the purchase of the upgrade if it's parent is not purchased
	if (ele2.classList.contains("btn-bought")) return;
	if (!ele2.classList.contains("btn-unbought")) return;
	// Subtract cost from currency
	game[costCurr].amount = game[costCurr].amount.sub(cost);
	// Store the fact that it's purchased
	game.upgrades.push(id);
	recalcProd();
}

// Buy a new currency, see previous func for some docs
function buyCurrency(ele) {
	let ele2;
	if (typeof ele === "number") ele2 = document.getElementById(ele);
	else ele2 = ele;
	const id = Number(ele2.id);
	const cost = game.inLab
		? new D(labCosts[id])
		: new D(upgradeInfo[id][1]).div(
				costDiv[(game.rupgrades[13] || 0) + (game.rupgrades[45] || 0)]
		  );
	const costCurr = upgradeInfo[id][2];
	if (game.upgrades.includes(id)) return;
	if (cost.gt(game[costCurr].amount)) return;
	if (ele2.classList.contains("btn-bought")) return;
	if (!ele2.classList.contains("btn-unbought")) return;
	game[costCurr].amount = game[costCurr].amount.sub(cost);
	game.upgrades.push(id);
	recalcProd();
}

function update() {
	const x = fetchTabbarValue();
	document.title = TABBAR_PREFIX[game.tab[0]] + not.format(x[0], 2, 0) + x[1];
}

// Autobuy

function autobuy() {
	// Autobuy x
	if (game.rupgrades[15] >= 1) cache.xUpgrades.forEach(u => buybtn(u));

	// Autobuy y
	if (game.rupgrades[15] >= 2) cache.yUpgrades.forEach(u => buybtn(u));

	// Autobuy z
	if (game.rupgrades[15] >= 3) cache.zUpgrades.forEach(u => buybtn(u));
}

// Big boye! only change if you're
// trying to speed through the
// game for testing
// eslint-disable-next-line prefer-const
let timeSpeed = 1;

window.setInterval(() => {
	const diff = Date.now() - game.lastTick;
	game.lastTick = Date.now();
	const u = game.upgrades;

	if (u.includes(15)) {
		let gain = tickCalcX();
		gain = getAllMult(gain);
		game.x.amount = game.x.amount.add(
			gain.times(diff / 1000).times(timeSpeed)
		);
	}
	if (u.includes(13)) {
		let gain = tickCalcY();
		gain = getAllMult(gain);
		game.y.amount = game.y.amount.add(
			gain.times(diff / 1000).times(timeSpeed)
		);
	}
	if (u.includes(47)) {
		let gain = tickCalcZ();
		gain = getAllMult(gain);
		game.z.amount = game.z.amount.add(
			gain.times(diff / 1000).times(timeSpeed)
		);
	}

	autobuy();
	update();
}, 100);

// Save loop
window.setInterval(save, 10000);

// Only register a service worker if it's supported
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("js/service-worker.js");
}
