"use strict";

const formulas = {
	rupg11: () => {
		let ata = new D(1);
		if (game.rupgrades[11] >= 1) ata = ata.mul(10);
		if (game.rupgrades[11] >= 2) ata = ata.mul(12.5);
		if (game.rupgrades[11] >= 3) ata = ata.mul(15);
		if (game.rupgrades[11] >= 4) ata = ata.mul(17.5);
		return ata;
	},
	rupg12: () => {
		let ata = new D(1);
		if (game.rupgrades[12] >= 1)
			ata = ata.mul(Math.log2(game.x.amount.add(1).log10() + 1) + 1);
		if (game.rupgrades[12] >= 2) ata = ata.mul(game.rp.total);
		if (game.rupgrades[12] >= 3)
			ata = ata.mul(game.y.amount.add(1).log10() + 1);
		return ata;
	},
	rupg13: () =>
		costDiv[(game.rupgrades[13] || 0) + (game.rupgrades[45] || 0)] || 1,
	rupg15: () => {
		if (game.rupgrades[15] >= 3) return "Autobuys all normal upgrades";
		if (game.rupgrades[15] >= 2)
			return "Autobuys normal upgrades that cost x or y";
		if (game.rupgrades[15] >= 1)
			return "Autobuys normal upgrades that cost x";
		return "Autobuys nothing";
	},
	rupg21: () => {
		let ata = new D(1);
		if (game.rupgrades[21] >= 1) ata = ata.mul(7.5);
		if (game.rupgrades[21] >= 2) ata = ata.mul(35);
		if (game.rupgrades[21] >= 3) ata = ata.mul(75);
		return ata;
	},
	rupg22: () => {
		let ata = new D(1);
		if (game.rupgrades[22] >= 1)
			ata = ata.mul(game.y.amount.add(1).log(8) + 1);
		if (game.rupgrades[22] >= 2) ata = ata.mul(game.rp.total);
		return ata;
	},
	rupg23: () =>
		`x${game.rupgrades[23] >= 1 ? 5 : 1}${
			game.rupgrades[23] >= 2 ? "^1.25" : ""
		}`,
	rupg25: () =>
		new D(1)
			.mul(game.rupgrades[25] >= 1 ? Math.log10(game.x.amount.sqrt()) : 1)
			.add(1)
			.mul(
				game.rupgrades[25] >= 2 ? game.y.amount.add(1).log10() + 1 : 1
			),
	rupg31: () => new D(10).pow(game.rupgrades[31] || 0),
	rupg32: () => {
		let ata = new D(1);
		if (game.rupgrades[32] >= 1)
			ata = ata.mul(game.x.amount.add(1).log2() + 1);
		if (game.rupgrades[32] >= 2)
			ata = ata.mul(game.y.amount.add(1).log(7.5) + 1);
		return ata;
	},
	rupg33: () =>
		`x${new D(1)
			.mul(game.rupgrades[33] >= 1 ? 1.25 : 1)
			.mul(game.rupgrades[33] >= 2 ? 1.1 : 1)
			.toString()}`,
	rupg35: () =>
		`x${not.format(
			rupg35Boost[game.rupgrades[35] || 0] **
				Math.floor(game.z.amount.add(1).log10()),
			2,
			3
		)}`,
	rupg41: () => {
		if (game.rupgrades[41] >= 3) return "Formula has x, y, z, and y again";
		if (game.rupgrades[41] >= 2) return "Formula has x, y, and z";
		if (game.rupgrades[41] >= 1) return "Formula has x and y";
		return "Formula only has y";
	},
	rupg42: () =>
		new D(1)
			.mul(game.rupgrades[42] >= 1 ? 10 : 1)
			.mul(game.rupgrades[42] >= 2 ? 25 : 1),
	rupg43: () =>
		new D(1)
			.mul(game.rupgrades[43] >= 1 ? game.rp.total.log2() : 1)
			.mul(game.rupgrades[43] >= 2 ? game.rp.total : 1),
	rupg45: () => "See Cheaper Upgrades!",
	rupg55: () =>
		new D(1)
			.mul(
				game.rupgrades[55] >= 1
					? (Math.log10(game.x.amount.add(1).log10() + 1) + 1) *
							(Math.log1p(game.y.amount.add(1).log10() + 1) + 1) *
							(game.z.amount.add(1).log2() + 1)
					: 1
			)
			.mul(
				game.rupgrades[55] >= 2
					? new D(game.x.amount.add(1).log2())
							.mul(game.y.amount.log10())
							.mul(game.z.amount.log2())
							.add(1)
							.log2() + 1
					: 1
			),
	rupg65: () => {
		if (game.rupgrades[65] >= 2) return "1 Row & 1 Column";
		if (game.rupgrades[65] >= 1) return "1 Column";
		return "None";
	},
	rupg75: () =>
		new D(1)
			.mul(game.rupgrades[75] >= 1 ? 1.75 ** game.upgrades.length : 1)
			.mul(game.rupgrades[75] >= 2 ? game.upgrades.length ** 1.35 : 1),
	rupg81: () => {
		if (game.rupgrades[81] >= 1) return "+5";
		return "+0";
	},
	rupg82: () => {
		let out = "";
		if (game.rupgrades[82] >= 1) out += "^1.1";
		if (game.rupgrades[82] >= 2) out += "^1.075";
		if (game.rupgrades[82] >= 3) out += "^1.05";
		return out || "^1";
	},
	rupg83: () => {
		if (game.rupgrades[83] >= 2) return "+2500";
		if (game.rupgrades[83] >= 1) return "+500";
		return "+0";
	},
	rupg84: () => {
		let out = "";
		if (game.rupgrades[84] >= 1) out += "^1.25";
		if (game.rupgrades[84] >= 2)
			out += `^${game.aupgrades.includes(9) ? "1.1" : "1.05"}`;
		if (game.rupgrades[84] >= 3) out += "^1.01";
		return out || "^1";
	},
	rupg85: () =>
		new D(1).mul(
			game.rupgrades[85] >= 1
				? Object.values(game.rupgrades).reduce((a, b) => a + b) ** 1.75
				: 1
		),
	atha: () => athCosts.a(),
	athb: () => athCosts.b(),
	athc: () => athCosts.c(),
};
