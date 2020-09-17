"use strict";

const roman = "0 I II III IV V VI VII VIII IX X XI XII XIII XIV XV".split(" ");
const romanize = n => roman[n] || n;

// eslint-disable next-line
var app;

function initVue() {
	app = new Vue({
		el: "#app",
		data: {
			game,
			format: n => not.format(n, 2, 0),
			upg(n) {
				switch (Number(n)) {
					case 54:
						return "pogger button";
					case 17:
						if (game.inLab) return `Nothing to see here...`;
						let out = "Rebirth.<br>";
						const RP = rawCalcRP();
						if (RP.lt(1))
							out += `in ${this.format(
								RP.sub(1).abs()
							)} RP`;
						else
							out += `next in ${this.format(
								new D(1).sub(RP.mod(1))
							)}&harisp;RP`;
						out += `<br>${this.format(RP.max(0))}&hairsp;RP`;
						return out;
					case 15:
						return "Start the game.<br>Cost: Free";
					default:
						return `${upgradeInfo[n][0]}<br>Cost: ${this.format(
							game.inLab
								? labCosts[n]
								: upgradeInfo[n][1] /
										costDiv[
											(game.rupgrades[13] || 0) +
												(game.rupgrades[45] || 0)
										]
						)}&hairsp;${upgradeInfo[n][2]}`;
				}
			},
			rpg(n) {
				let out;
				switch (Number(n)) {
					case 14:
						out = `Content Expansion
Cost: ${not.format(85, 2, 0)} Total RP`;
						break;
					case 63:
						out = `Unlock The Lab.
Cost: ${not.format(470, 2, 0)} Total RP`;
						break;
					case 24:
					case 34:
					case 44:
						const name = athNames[Math.floor(n / 10) - 2];
						out = `Buy a${name === "a" ? "n" : ""} ${name}.
Cost: ${this.format(athCosts[name]())} Total RP`;
						break;
					default:
						if (
							rebirthUpgradeInfo[n][1].length !==
							game.rupgrades[n]
						)
							out = `${rebirthUpgradeInfo[n][0]}
Upgrade to tier ${romanize(game.rupgrades[n] + 1 || 1)}
Cost: ${this.format(
								rebirthUpgradeInfo[n][1][
									game.rupgrades[n] || 0
								] || Infinity
							)}RP`;
						else
							out = `${rebirthUpgradeInfo[n][0]}
Maxed!`;
						break;
				}
				if (formulas[`rupg${n}`])
					out += `
Currently: ${this.formatFormula(formulas[`rupg${n}`](), n)}`;
				return out;
			},
			apg(n) {
				return `${anotherUpgrades[n][0]}
Cost: ${
					anotherUpgrades[n][1] === 0
						? "Free"
						: `${this.format(anotherUpgrades[n][1])}${
								anotherUpgrades[n][2]
						  }`
				}`;
			},
			calcRP,
			rawCalcRP,
			D: n => new D(n),
			rForm: not,
			costDiv,
			formulas,
			notations,
			fancyNotations: [undefined, undefined, "Mixed Sci.", "Mixed Eng."],
			rowInfo,
			rebirthRowInfo,
			rebirthUpgradeInfo,
			formatFormula: (n, u) => {
				if (n instanceof D || typeof n === "number")
					return `${u === "13" ? "÷" : "x"}${not.format(n, 2, 0)}`;
				else return n;
			},
			uclass: n => ({
				btn: true,
				"btn-bought": game.upgrades.includes(n),
				"btn-unbought":
					game.upgrades
						.map(a => childList[a])
						.filter(a => Boolean(a))
						.filter(a => a.includes(n)).length >= 1 || n === 15,
				"btn-locked":
					game.upgrades
						.map(a => childList[a])
						.filter(a => Boolean(a))
						.filter(a => a.includes(n)).length === 0 && n !== 15,
			}),
			rclass,
			showRow: n => {
				switch (Math.floor(n / 10)) {
					case 7:
						return game.rupgrades[65] >= 2;
					default:
						return true;
				}
			},
			showCol: n => {
				switch (n % 10) {
					case 9:
						return game.rupgrades[65] >= 1;
					default:
						return true;
				}
			},
			showRebirthRow,
			showRebirthCol,
			clickHandler: n => {
				switch (Number(n)) {
					case 13:
						return buyCurrency(13, "y");
					case 15:
						return buyCurrency(15, "x");
					case 17:
						return rebirth();
					case 47:
						return buyCurrency(47, "z");
					case 54:
						return alert("pogger");
					default:
						return buybtn(Number(n));
				}
			},
			rebirthClickHandler,
			rebirthTooltip: n => rebirthTooltips[n],
			getSPGain,
		},
	});
}
