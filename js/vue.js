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
				switch (n) {
					case "54":
						return "pogger button";
					case "17":
						return `Rebirth.<br>
			${
				rawCalcRP().lt(1)
					? `<span>in ${not.format(
							rawCalcRP().sub(1).abs(),
							2,
							2
					  )} RP<br></span>`
					: ""
			}
			${
				rawCalcRP().gte(1)
					? `<span>next in ${not.format(
							1 - rawCalcRP().mod(1).toNumber(),
							2,
							2
					  )} RP<br></span>`
					: ""
			}
			${this.format(calcRP())}&hairsp;RP`;
					default:
						return `${upgradeInfo[n][0]}<br>Cost: ${
							upgradeInfo[n][1] === 0
								? "Free"
								: `${this.format(
										upgradeInfo[n][1] /
											costDiv[
												(game.rupgrades[13] || 0) +
													(game.rupgrades[45] || 0)
											]
								  )}&hairsp;${upgradeInfo[n][2]}`
						}`;
				}
			},
			rpg(n) {
				let out;
				switch (Number(n)) {
					case 14:
						out = `Content Expansion
Cost: ${not.format(
							85,
							2,
							0
						)} Total RP`;
						break;
					case 24:
					case 34:
					case 44:
						const name = athNames[Math.floor(n / 10) - 2];
						out = `Buy a${name === "a" ? "n" : ""} ${name}.
Cost: ${this.format(athCosts[name]())} Total RP`
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
Currently: ${this.formatFormula(
						formulas[`rupg${n}`](),
						n
					)}`;
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
			rclass: n => {
				switch (n) {
					case 15:
						return {
							btn: true,
							"btn-rebirth-bought":
								(game.rupgrades[15] || 0) >=
								rebirthUpgradeInfo[15][1].length,
							"btn-rebirth-unbought":
								((game.rupgrades[15] || 0) > 0 ||
									Object.values(game.rupgrades).reduce(
										(a, b) => a + b
									) >= 33) &&
								(game.rupgrades[15] || 0) <
									rebirthUpgradeInfo[15][1].length,
							"btn-rebirth-locked":
								Object.values(game.rupgrades).reduce(
									(a, b) => a + b
								) < 33,
						};
					case 24:
						return {
							btn: true,
							"btn-rebirth-unbought": game.rupgrades[14] >= 1,
							"btn-rebirth-locked": (game.rupgrades[14] || 0) < 1,
						};
					case 34:
						return {
							btn: true,
							"btn-rebirth-unbought": game.a.bought >= 1,
							"btn-rebirth-locked": game.a.bought < 1,
						};
					case 44:
						return {
							btn: true,
							"btn-rebirth-unbought": game.b.bought >= 1,
							"btn-rebirth-locked": game.b.bought < 1,
						};
					default:
						try {
							const out = {
								btn: true,
								"btn-rebirth-bought":
									game.rupgrades[n] >=
									rebirthUpgradeInfo[n][1].length,
								"btn-rebirth-unbought":
									game.rupgrades[n] >= 1 ||
									(Object.keys(game.rupgrades) || [1])
										.map(a => rebirthChildList[a] || [1])
										.reduce((a, b) => (a || []).concat(b))
										.includes(n) ||
									n === 11,
								"btn-hidden": rebirthUpgradeInfo[n][0] === "invis"
							};
							out["btn-rebirth-locked"] = !out[
								"btn-rebirth-unbought"
							];

							return out;
						} catch (e) {
							return {
								btn: true,
								"btn-rebirth-unbought": n === 11,
								"btn-rebirth-locked": n !== 11,
							};
						}
				}
			},
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
			showRebirthRow: n => {
				switch (Math.floor(n / 10)) {
					case 5:
					case 6:
					case 7:
					case 8:
						return game.aupgrades.includes(5);
					default:
						return true;
				}
			},
			showRebirthCol: n => {
				switch (n % 10) {
					case 5:
						return game.aupgrades.includes(2);
					default:
						return true;
				}
			},
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
			rebirthClickHandler: n => {
				switch (Number(n)) {
					case 14:
						return buyAthTree();
					case 24:
						return buyAthCurrency("a");
					case 34:
						return buyAthCurrency("b");
					case 44:
						return buyAthCurrency("c");
					default:
						return buyreb(Number(n));
				}
			},
			rebirthTooltip: n => rebirthTooltips[n],
		},
	});
}
