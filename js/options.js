"use strict";

// Create datasets
const themes = ["Light", "Dark", "Auto", "Strange"];
const notations = ["Scientific", "Engineering", "MixedScientific", "MixedEngineering", "Logarithm", "Letters", "Standard", "Dots", "Clock", "Bar", "Blind"];
const TABBAR_PREFIX = ["Tree Game | ", "TG | ", ""];
const TABBAR_PREFIX_FANCY = ["Long", "Short", "None"];
const TABBAR_SUFFIX_FANCY = ["x", "y", "z", "RP", "RP Gain"];
function fetchTabbarValue() {
	const x = new Array(2);
	x[1] = TABBAR_SUFFIX_FANCY[game.tab[1]];
	switch (game.tab[1]) {
		case 0:
			x[0] = game.x.amount;
			break;
		case 1:
			x[0] = game.y.amount;
			break;
		case 2:
			x[0] = game.z.amount;
			break;
		case 3:
			x[0] = game.rp.amount;
			break;
		case 4:
			x[0] = `${not.format(calcRP())}RP Gain`;
			break;
		default:
			x[0] = game.x.amount;
			x[1] = TABBAR_SUFFIX_FANCY[0];
	}
	return x;
};

function changeTheme() {
	game.theme++;
	if (game.theme === themes.length) game.theme = 0;
	document.getElementById("themecss").href = `themes/${themes[game.theme]}.css`;
	document.getElementById("theme").textContent = themes[game.theme];
}

function toggleHover() {
	game.hover = !game.hover;
	document.getElementById("hovercss").href = game.hover ? "themes/hover.css" : "";
}

function changeNotation(n) {
	game.notation = n;
	not = new ADNotations[`${notations[game.notation]}Notation`]();
}

function changeTabPrefix() {
	game.tab[0]++;
	if (game.tab[0] === TABBAR_PREFIX.length) game.tab[0] = 0;
	document.getElementById("tabbarprefix").textContent = TABBAR_PREFIX_FANCY[game.tab[0]];
}

function changeTabSuffix() {
	const length = game.rebirthed ? TABBAR_SUFFIX_FANCY.length : 3;
	game.tab[1]++;
	if (game.tab[1] === length) game.tab[1] = 0;
	document.getElementById("tabbarsuffix").textContent = TABBAR_SUFFIX_FANCY[game.tab[1]];
}

// Recursively convert "Decimal" to string
function decimalToString(obj) {
	const data = {};
	for (const key in obj) {
		if (obj[key] instanceof D)
			data[key] = obj[key].toString();
		else if (obj[key] instanceof Array)
			data[key] = obj[key];
		else if (obj[key] instanceof Object)
			data[key] = decimalToString(obj[key]);
		else
			data[key] = obj[key];
	}
	return data;
}

// Recursively convert string to "Decimal"
function stringToDecimal(obj) {
	const data = {};
	for (const key in obj) {
		if (typeof obj[key] === "string")
			data[key] = new D(obj[key]);
		else if (obj[key] instanceof Array)
			data[key] = obj[key];
		else if (obj[key] instanceof Object)
			data[key] = stringToDecimal(obj[key]);
		else
			data[key] = obj[key];
	}
	return data;
}

// Save the game
function save() {
	const dec = decimalToString(game);
	const str = JSON.stringify(dec);
	localStorage.setItem("treegamebetasave", str);
	localStorage.setItem("treegamebetasavebackup", str);
}

function preloadChoiceTree() {
	const sides = [undefined, "left", "mid", "right"];
	for (let i = 1; i < game.choice.depth + 1; i++) {
		if (choiceCosts[i - 1].eq(0)) {
			document.getElementById(`c${i}2`).classList.remove("btn-creg-locked");
			document.getElementById(`c${i}2`).classList.add("btn-creg-bought");
		} else {
			const c = game.choice.choices[Math.floor(i / 2)];
			document.getElementById(`c${i}${c}`).classList.remove(`btn-c${sides[c]}-locked`);
			document.getElementById(`c${i}${c}`).classList.remove(`btn-c${sides[c]}-unbought`);
			document.getElementById(`c${i}${c}`).classList.add(`btn-c${sides[c]}-bought`);
			if (c !== 1) {
				document.getElementById(`c${i}1`).classList.remove("btn-cleft-unbought");
				document.getElementById(`c${i}1`).classList.add("btn-cleft-locked");
				}
			if (c !== 2) {
				document.getElementById(`c${i}2`).classList.remove("btn-cmid-unbought");
				document.getElementById(`c${i}2`).classList.add("btn-cmid-locked");
				}
			if (c !== 3) {
				document.getElementById(`c${i}3`).classList.remove("btn-cright-unbought");
				document.getElementById(`c${i}3`).classList.add("btn-cright-locked");
				}
		}
	}
	if (choiceCosts[game.choice.depth].eq(0)) {
		const next = game.choice.depth + 1;
		document.getElementById(`c${next}2`).classList.remove("btn-creg-locked");
		document.getElementById(`c${next}2`).classList.add("btn-creg-unbought");
	} else if (game.choice.depth !== 0) {
		document.getElementById(`c${next}1`).classList.remove("btn-cleft-locked");
		document.getElementById(`c${next}1`).classList.add("btn-cleft-unbought");
		document.getElementById(`c${next}2`).classList.remove("btn-cmid-locked");
		document.getElementById(`c${next}2`).classList.add("btn-cmid-unbought");
		document.getElementById(`c${next}3`).classList.remove("btn-cright-locked");
		document.getElementById(`c${next}3`).classList.add("btn-cright-unbought");
	}
	if (game.choice.depth > 0) {
		const fc = game.choice.choices[0];
		if (fc !== 1) {
			document.getElementById("c11").classList.remove("btn-cleft-unbought");
			document.getElementById("c11").classList.add("btn-cleft-locked");
		}
		if (fc !== 2) {
			document.getElementById("c12").classList.remove("btn-cmid-unbought");
			document.getElementById("c12").classList.add("btn-cmid-locked");
		}
		if (fc !== 3) {
			document.getElementById("c13").classList.remove("btn-cright-unbought");
			document.getElementById("c13").classList.add("btn-cright-locked");
		}
	}
}

function preloadAthTree() {
	game.aupgrades.forEach(upg => {
		$(`#a${upg}`).classList.remove("btn-ath-unbought");
		$(`#a${upg}`).classList.add("btn-ath-bought");

		if (anotherChildList[upg]) {
			anotherChildList[upg].forEach(el => {
				$(`#a${el}`).classList.remove("btn-ath-locked");
				$(`#a${el}`).classList.add("btn-ath-unbought");
			});
		}
	});
}

// Load the game
function load() {
	let str = localStorage.getItem("treegamebetasave");
	if (!str && localStorage.getItem("treegamebetasavebackup")) {
		alert("An error occured and you lost your save, but we had a backup.");
		str = localStorage.getItem("treegamebetasavebackup");
	} else if (!str) return;
	if (str === undefined || str === "undefined" || str === null) return;
	let sav = stringToDecimal(JSON.parse(str));
	// Account for old versions
	if (sav.version <= 8) {
		// PURGE
		alert("Due to a total rebalance of the game, everything has been reset. Sorry for the inconvenience.");
		alert("While you're at it, why don't you join the Discord server? Link is in the options.");
		sav = defaultGame;
	}
	if (sav.notation instanceof D) sav.notation = sav.notation.toNumber();
	game = sav;
	not = new ADNotations[`${notations[game.notation]}Notation`]();
	if (game.trialTreeUnlocked) $("#trial").style.display = "inline-block";
	$("#themecss").href = `themes/${themes[game.theme]}.css`;
	$("#theme").textContent = themes[game.theme];
	$("#tabbarprefix").textContent = TABBAR_PREFIX_FANCY[game.tab[0]];
	$("#tabbarsuffix").textContent = TABBAR_SUFFIX_FANCY[game.tab[1]];
	if (!game.hover) document.getElementById("hovercss").href = "";
	preloadAthTree();

	update();
	recalcProd();
}

function exportGame() {
	save();
	const sav = localStorage.getItem("treegamebetasave");
	const compSav = LZString.compressToEncodedURIComponent(sav);
	copyTextToClipboard(compSav);
}

function importGame() {
	let sav = prompt("Please import your save:");
	if (!sav) return;
	sav = LZString.decompressFromEncodedURIComponent(sav);
	localStorage.setItem("treegamebetasave", sav);
	window.location.reload();
}

function resetGame() {
	if (!confirm("Are you sure?")) return;
	if (!confirm("This is a hard reset. There is no reward!")) return;
	if (prompt("Type \"yes\" to delete your save.") !== "yes") return;
	localStorage.removeItem("treegamebetasave");
	localStorage.removeItem("treegamebetasavebackup");
	window.location.reload();
}

// No clue, ask stackoverflow
function copyTextToClipboard(text) {
	const textArea = document.createElement("textarea");
	textArea.style.position = "fixed";
	textArea.style.top = 0;
	textArea.style.left = 0;
	textArea.style.width = "2em";
	textArea.style.height = "2em";
	textArea.style.padding = 0;
	textArea.style.border = "none";
	textArea.style.outline = "none";
	textArea.style.boxShadow = "none";
	textArea.style.background = "transparent";
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	try {
		const successful = document.execCommand("copy");
		if (!successful) prompt("Unable to auto-copy.", text);
	} catch (err) {
		prompt("Unable to auto-copy.", text);
	}
	document.body.removeChild(textArea);
}
