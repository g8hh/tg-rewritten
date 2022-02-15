function rclass(n) {
	switch (n) {
		case 15:
			return {
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
						game.rupgrades[n] >= rebirthUpgradeInfo[n][1].length,
					"btn-rebirth-unbought":
						game.rupgrades[n] >= 1 ||
						(Object.keys(game.rupgrades) || [1])
							.map(a => rebirthChildList[a] || [1])
							.reduce((a, b) => (a || []).concat(b))
							.includes(n) ||
						n === 11,
					"btn-hidden": rebirthUpgradeInfo[n][0] === "invis",
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
	}
}

function showRebirthRow(n) {
	switch (Math.floor(n / 10)) {
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
			return game.aupgrades.includes(5);
		default:
			return true;
	}
}

function showRebirthCol(n) {
	switch (n % 10) {
		case 5:
			return game.aupgrades.includes(2);
		default:
			return true;
	}
}

function rebirthClickHandler(n) {
	switch (Number(n)) {
		case 14:
			return buyAthTree();
		case 24:
			return buyAthCurrency("a");
		case 34:
			return buyAthCurrency("b");
		case 44:
			return buyAthCurrency("c");
		case 63:
			return unlockLab();
		default:
			return buyreb(Number(n));
	}
}
