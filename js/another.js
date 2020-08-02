"use strict";

function buyAthTree() {
	if (game.rp.total.lt(85)) return;
	if (!game.rupgrades[13]) return;
	if (game.rupgrades[14] > 0) return;
	game.rupgrades[14] = 1;
	document.getElementById("r14").classList.remove("btn-rebirth-unbought");
	document.getElementById("r14").classList.add("btn-rebirth-bought");
	renderFocusedTree();
}

function buyath(ele) {
	const id = ele;
	const ele2 = document.getElementById(`a${id}`);
	const cost = new D(anotherUpgrades[id][1]);
	const costCurr = anotherUpgrades[id][2];
	if (game.aupgrades.includes(id)) return;
	if (cost.gt(game[costCurr].amount)) return;
	if (ele2.classList.contains("btn-ath-locked")) return;
	game[costCurr].amount = game[costCurr].amount.sub(cost);
	ele2.classList.remove("btn-ath-unbought");
	ele2.classList.add("btn-ath-bought");
	game.aupgrades.push(id);
	if (anotherChildList[id]) {
		anotherChildList[id].forEach(el => {
			document
				.getElementById(`a${el}`)
				.classList.remove("btn-ath-locked");
			document.getElementById(`a${el}`).classList.add("btn-ath-unbought");
		});
	}
	recalcProd();
}

const athCosts = {
	a: () => new D(85).mul(new D(1.1).pow(game.a.bought)).floor(),
	b: () => new D(140).mul(new D(1.25).pow(game.b.bought)).floor(),
	c: () => 1e100,
};
const athNames = ["a", "b", "c"];

function buyAthCurrency(curr) {
	if (game.rp.total.lt(athCosts[curr]())) return;
	game[curr].amount = game[curr].amount.add(1);
	game[curr].bought = game[curr].bought.add(1);
}
