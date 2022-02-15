"use strict";

const choiceCosts = [
	new D(1e12),
	new D(0),
	new D(1e13),
	new D(0),
	new D(1e16),
	new D(0),
	new D(5e17),
	new D(0),
	new D(5e25),
	new D(0),
	new D(1e29),
	new D(0)
];

function buyC(depth, choice) {
	if (game.choice.depth !== depth - 1) return;
	if (choiceCosts[depth - 1].gt(game.rp.amount)) return;
	game.rp.amount = game.rp.amount.sub(choiceCosts[depth - 1]);
	// Regroup
	if (choice === false) {
		game.choice.depth++;
		$(`#c${depth}2`).classList.remove("btn-creg-unbought");
		$(`#c${depth}2`).classList.add("btn-creg-bought");
		$(`#c${depth + 1}1`).classList.remove(`btn-cleft-locked`);
		$(`#c${depth + 1}1`).classList.add(`btn-cleft-unbought`);
		$(`#c${depth + 1}2`).classList.remove(`btn-cmid-locked`);
		$(`#c${depth + 1}2`).classList.add(`btn-cmid-unbought`);
		$(`#c${depth + 1}3`).classList.remove(`btn-cright-locked`);
		$(`#c${depth + 1}3`).classList.add(`btn-cright-unbought`);
	} else {
	// 1/3
		game.choice.depth++;
		game.choice.choices.push(choice);
		const sides = [null, "left", "mid", "right"];
		$(`#c${depth}${choice}`).classList.remove(`btn-c${sides[choice]}-unbought`);
		$(`#c${depth}${choice}`).classList.add(`btn-c${sides[choice]}-bought`);
		$(`#c${depth + 1}2`).classList.remove(`btn-creg-locked`);
		$(`#c${depth + 1}2`).classList.add(`btn-creg-unbought`);
		if (choice !== 1) {
			$(`#c${depth}1`).classList.remove("btn-cleft-unbought");
			$(`#c${depth}1`).classList.add("btn-cleft-locked");
		}
		if (choice !== 2) {
			$(`#c${depth}2`).classList.remove("btn-cmid-unbought");
			$(`#c${depth}2`).classList.add("btn-cmid-locked");
			}
		if (choice !== 3) {
			$(`#c${depth}3`).classList.remove("btn-cright-unbought");
			$(`#c${depth}3`).classList.add("btn-cright-locked");
		}
	}
	recalcProd();
}

function respec() {
	if (game.rupgrades[63] < 1) return;
	if (game.inTrial !== 0) {
		if (!confirm("在试用期间重新指定将退出试用。 你确定要这么做吗？")) {
			return;
		}
		exitTrial();
	}
	let refundAmt = new D(0);
	/* eslint-disable no-unused-vars */
	game.choice.choices.map((x, y) => refundAmt = refundAmt.add(choiceCosts[y * 2]));
	/* eslint-enable no-unused-vars */
	game.rp.amount = game.rp.amount.add(refundAmt);
	game.choice.depth = 0;
	game.choice.choices = [];
	recalcProd();
	rebirth();
	wipeClass("btn-cleft-unbought", "btn-cleft-locked");
	wipeClass("btn-cmid-unbought", "btn-cmid-locked");
	wipeClass("btn-cright-unbought", "btn-cright-locked");
	wipeClass("btn-creg-unbought", "btn-creg-locked");
	wipeClass("btn-cleft-bought", "btn-cleft-locked");
	wipeClass("btn-cmid-bought", "btn-cmid-locked");
	wipeClass("btn-cright-bought", "btn-cright-locked");
	wipeClass("btn-creg-bought", "btn-creg-locked");
	const cleft = document.getElementById("c11");
	const cmid = document.getElementById("c12");
	const cright = document.getElementById("c13");
	cleft.classList.remove("btn-cleft-locked");
	cleft.classList.add("btn-cleft-unbought");
	cmid.classList.remove("btn-cmid-locked");
	cmid.classList.add("btn-cmid-unbought");
	cright.classList.remove("btn-cright-locked");
	cright.classList.add("btn-cright-unbought");
}

function wipeClass(rem, add) {
	document.querySelectorAll(`.${rem}`).forEach(y => {
		y.classList.remove(rem);
		y.classList.add(add);
	});
}