"use strict";

const roman = "0 I II III IV V VI VII VIII IX X XI XII XIII XIV XV".split(" ");
const romanize = n => roman[n] || n;

/* eslint-disable */
var app;
/* eslint-enable */

function initVue() {
	app = new Vue({
		el: "#app",
		data: {
			game,
			format: n => not.format(n, 2, 0),
			upg(n) {
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
			},
			rpg(n) {
				if (rebirthUpgradeInfo[n][1].length !== game.rupgrades[n])
					return `${rebirthUpgradeInfo[n][0]}
Upgrade to tier ${romanize(game.rupgrades[n] + 1 || 1)}
Cost: ${this.format(
						rebirthUpgradeInfo[n][1][game.rupgrades[n] || 0] ||
							Infinity
					)}RP`;
				return `${rebirthUpgradeInfo[n][0]}
Maxed!`;
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
					};
					out["btn-rebirth-locked"] = !out["btn-rebirth-unbought"];

					return out;
				} catch (e) {
					return {
						btn: true,
						"btn-rebirth-unbought": n === 11,
						"btn-rebirth-locked": n !== 11,
					};
				}
			},
			rautoclass: () => ({
				btn: true,
				"btn-rebirth-bought":
					(game.rupgrades[15] || 0) >=
					rebirthUpgradeInfo[15][1].length,
				"btn-rebirth-unbought":
					((game.rupgrades[15] || 0) > 0 ||
						Object.values(game.rupgrades).reduce((a, b) => a + b) >=
							33) &&
					(game.rupgrades[15] || 0) <
						rebirthUpgradeInfo[15][1].length,
				"btn-rebirth-locked":
					Object.values(game.rupgrades).reduce((a, b) => a + b) < 33,
			}),
			aclassa: () => ({
				btn: true,
				"btn-rebirth-unbought": game.rupgrades[14] >= 1,
				"btn-rebirth-locked": (game.rupgrades[14] || 0) < 1,
			}),
			aclassb: () => ({
				btn: true,
				"btn-rebirth-unbought": game.a.bought >= 1,
				"btn-rebirth-locked": game.a.bought < 1,
			}),
			aclassc: () => ({
				btn: true,
				"btn-rebirth-unbought": game.b.bought >= 1,
				"btn-rebirth-locked": game.b.bought < 1,
			}),
		},
	});
}
