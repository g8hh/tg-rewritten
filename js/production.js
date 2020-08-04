"use strict";

// It's const not var because you're only overwriting properties, not the whole thing
const cache = { x: new D(0), y: new D(0), z: new D(0) };

function recalcCoreX() {
	const u = game.upgrades;
	const r = game.rupgrades;
	return new D(1)
		.add(u.includes(14) ? 10 : 0)
		.add(u.includes(16) ? 3 : 0)
		.pow(u.includes(46) ? 2 : 1)
		.pow(u.includes(64) ? 3 : 1)
		.mul(r[23] >= 1 ? 5 : 1)
		.pow(r[23] >= 2 ? 1.25 : 1);
}

function recalcX() {
	const u = game.upgrades;
	const r = game.rupgrades;
	const a = game.aupgrades;
	let ata = recalcCoreX();

	ata = ata
		.mul(u.includes(18) ? 3 : 1)
		.mul(u.includes(23) ? 5 : 1)
		.mul(u.includes(25) ? 2 : 1)
		.mul(u.includes(28) ? 2 : 1)
		.mul(u.includes(29) ? 6 : 1)
		.pow(u.includes(33) ? 1.25 : 1)
		.mul(u.includes(36) ? 5 : 1)
		.mul(u.includes(38) ? 4 : 1)
		.mul(u.includes(39) ? 5 : 1)
		.mul(u.includes(55) ? 1000 : 1);
	if (r[11] >= 1) ata = ata.mul(10);
	if (r[11] >= 2) ata = ata.mul(12.5);
	if (r[11] >= 3) ata = ata.mul(15);
	if (r[11] >= 4) ata = ata.mul(17.5);
	if (r[42] >= 1) ata = ata.mul(10);
	if (r[42] >= 2) ata = ata.mul(25);
	if (r[75] >= 1) ata = ata.mul(1.75 ** u.length);
	if (r[75] >= 2) ata = ata.mul(u.length ** 1.35);
	if (r[85] >= 1)
		ata = ata.mul(Object.values(r).reduce((a, b) => a + b) ** 1.75);
	if (a.includes(4)) ata = ata.mul(1e5);

	return ata;
}

function recalcY() {
	const u = game.upgrades;
	const r = game.rupgrades;
	const a = game.aupgrades;
	let ata = new D(1);

	if (r[81] >= 1) ata = ata.add(5);

	if (u.includes(18)) ata = ata.mul(3);
	if (u.includes(26)) ata = ata.add(4);
	if (u.includes(27)) ata = ata.mul(10);
	if (u.includes(28)) ata = ata.mul(2);
	if (u.includes(29)) ata = ata.mul(6);
	if (u.includes(34)) ata = ata.mul(5);
	if (u.includes(37)) ata = ata.mul(5);
	if (u.includes(38)) ata = ata.mul(4);
	if (u.includes(39)) ata = ata.mul(5);
	if (u.includes(43)) ata = ata.mul(5);
	if (u.includes(44)) ata = ata.mul(4);
	if (u.includes(45)) ata = ata.mul(10);
	if (u.includes(53)) ata = ata.pow(1.2);
	if (u.includes(57)) ata = ata.mul(10);
	if (u.includes(63)) ata = ata.mul(1000);
	if (r[21] >= 1) ata = ata.mul(7.5);
	if (r[21] >= 2) ata = ata.mul(35);
	if (r[21] >= 3) ata = ata.mul(75);
	if (r[42] >= 1) ata = ata.mul(10);
	if (r[42] >= 2) ata = ata.mul(25);
	if (r[75] >= 1) ata = ata.mul(1.75 ** u.length);
	if (r[75] >= 2) ata = ata.mul(u.length ** 1.35);
	if (r[84] >= 1) ata = ata.pow(1.25);
	if (r[84] >= 2) ata = ata.pow(game.aupgrades.includes(9) ? 1.1 : 1.05);
	if (r[84] >= 3) ata = ata.pow(1.01);
	if (r[85] >= 1)
		ata = ata.mul(Object.values(r).reduce((a, b) => a + b) ** 1.75);
	if (a.includes(4)) ata = ata.mul(1e5);
	if (a.includes(14)) ata = ata.mul(new D(2).pow(game.a.bought));

	return ata;
}

function recalcZ() {
	const u = game.upgrades;
	const r = game.rupgrades;
	const a = game.aupgrades;

	let ata = new D(1);

	if (r[83] >= 1) ata = ata.add(500);
	if (r[83] >= 2) ata = ata.add(2000);

	if (u.includes(18)) ata = ata.mul(3);
	if (u.includes(28)) ata = ata.mul(2);
	if (u.includes(29)) ata = ata.mul(6);
	if (u.includes(38)) ata = ata.mul(4);
	if (u.includes(39)) ata = ata.mul(5);
	if (u.includes(48)) ata = ata.mul(2);
	if (u.includes(49)) ata = ata.mul(5);
	if (u.includes(56)) ata = ata.mul(10);
	if (u.includes(58)) ata = ata.pow(2);
	// Wow.
	ata = ata.mul(new D(10).pow(r[31] || 0));
	if (r[42] >= 1) ata = ata.mul(10);
	if (r[42] >= 2) ata = ata.mul(25);
	if (r[75] >= 1) ata = ata.mul(1.75 ** u.length);
	if (r[75] >= 2) ata = ata.mul(u.length ** 1.35);
	if (r[82] >= 1) ata = ata.pow(1.25);
	if (r[85] >= 1)
		ata = ata.mul(Object.values(r).reduce((a, b) => a + b) ** 1.75);
	if (a.includes(4)) ata = ata.mul(1e5);

	return ata;
}

function recalcProd() {
	const u = game.upgrades;
	if (u.includes(15)) cache.x = recalcX();
	if (u.includes(13)) cache.y = recalcY();
	if (u.includes(47)) cache.z = recalcZ();
}

function tickCalcX() {
	const u = game.upgrades;
	const r = game.rupgrades;
	const a = game.aupgrades;
	let ata = new D(cache.x);

	if (u.includes(24)) ata = ata.add(game.x.amount.add(1).log10());
	if (u.includes(65)) ata = ata.mul(game.z.amount.add(1).pow(0.75));

	if (r[22] >= 1) ata = ata.mul(game.y.amount.add(1).log(8) + 1);
	if (r[22] >= 2) ata = ata.mul(game.rp.total);
	if (r[25] >= 1) ata = ata.mul(game.x.amount.add(1).sqrt().log10() + 1);
	if (r[25] >= 2) ata = ata.mul(game.y.amount.add(1).log10() + 1);
	if (r[43] >= 1) ata = ata.mul(game.rp.total.log2());
	if (r[43] >= 2) ata = ata.mul(game.rp.total);
	if (r[55] >= 1)
		ata = ata.mul(
			(Math.log10(game.x.amount.add(1).log10() + 1) + 1) *
				(Math.log1p(game.y.amount.add(1).log10() + 1) + 1) *
				(game.z.amount.add(1).log2() + 1)
		);
	if (r[55] >= 2)
		ata = ata.mul(
			new D(game.x.amount.add(1).log2())
				.mul(game.y.amount.log10())
				.mul(game.z.amount.log2())
				.add(1)
				.log2() + 1
		);

	if (a.includes(14)) ata = ata.mul(new D(2).pow(game.a.bought));

	return ata;
}

function tickCalcY() {
	const u = game.upgrades;
	const r = game.rupgrades;
	const a = game.aupgrades;
	let ata = new D(cache.y);

	if (u.includes(35)) ata = ata.mul(game.x.amount.pow(1 / 6) + 1);
	if (u.includes(68))
		ata = ata.mul(
			(game.x.amount.add(1).log(1e3) + 1) *
				(game.z.amount.add(1).log(1e3) + 1)
		);

	if (r[12] >= 1)
		ata = ata.mul(Math.log2(game.x.amount.add(1).log10() + 1) + 1);
	if (r[12] >= 2) ata = ata.mul(game.rp.total);
	if (r[12] >= 3) ata = ata.mul(game.y.amount.add(1).log10() + 1);
	if (r[25] >= 1) ata = ata.mul(game.x.amount.add(1).sqrt().log10() + 1);
	if (r[25] >= 2) ata = ata.mul(game.y.amount.add(1).log10() + 1);
	if (r[43] >= 1) ata = ata.mul(game.rp.total.log2());
	if (r[43] >= 2) ata = ata.mul(game.rp.total);
	if (r[55] >= 1)
		ata = ata.mul(
			(Math.log10(game.x.amount.add(1).log10() + 1) + 1) *
				(Math.log1p(game.y.amount.add(1).log10() + 1) + 1) *
				(game.z.amount.add(1).log2() + 1)
		);
	if (r[55] >= 2)
		ata = ata.mul(
			new D(game.x.amount.add(1).log2())
				.mul(game.y.amount.log10())
				.mul(game.z.amount.log2())
				.add(1)
				.log2() + 1
		);

	if (a.includes(1)) ata = ata.mul(game.x.amount.pow(0.1));
	if (a.includes(14)) ata = ata.mul(new D(2).pow(game.a.bought));

	return ata;
}

function tickCalcZ() {
	const u = game.upgrades;
	const r = game.rupgrades;
	const a = game.aupgrades;
	let ata = new D(cache.z);

	if (u.includes(67)) ata = ata.mul(game.z.amount.add(1).log2() + 1);

	if (r[25] >= 1) ata = ata.mul(game.x.amount.add(1).sqrt().log10() + 1);
	if (r[25] >= 2) ata = ata.mul(game.y.amount.add(1).log10() + 1);
	if (r[32] >= 1) ata = ata.mul(game.x.amount.add(1).log2() + 1);
	if (r[32] >= 2) ata = ata.mul(game.y.amount.add(1).log(7.5) + 1);
	if (r[43] >= 1) ata = ata.mul(game.rp.total.log2());
	if (r[43] >= 2) ata = ata.mul(game.rp.total);
	if (r[55] >= 1)
		ata = ata.mul(
			(Math.log10(game.x.amount.add(1).log10() + 1) + 1) *
				(Math.log1p(game.y.amount.add(1).log10() + 1) + 1) *
				(game.z.amount.add(1).log2() + 1)
		);
	if (r[55] >= 2)
		ata = ata.mul(
			new D(game.x.amount.add(1).log2())
				.mul(game.y.amount.log10())
				.mul(game.z.amount.log2())
				.add(1)
				.log2() + 1
		);

	if (a.includes(14)) ata = ata.mul(new D(2).pow(game.a.bought));

	return ata;
}
