/* eslint-disable no-unused-vars */
"use strict";

const canvas = document.getElementById("tree-canvas");
const ctx = canvas.getContext("2d");

function renderFocusedTree() {
	switch ((game || { currentTab: 0 }).currentTab) {
		case 1:
			resizeCanvas("reb");
			break;
		case 2:
			resizeCanvas("ath");
			break;
		case 3:
			resizeCanvas("tri");
			break;
		default:
			resizeCanvas("upg");
			break;
	}
}

window.addEventListener("resize", renderFocusedTree);

function getStrokeColor() {
	let data;
	try {
		data = game;
	} catch (e) {
		// Yes, I had to use a trycatch
		data = { theme: 0 };
	}
	switch (data.theme) {
		case 0:
			return "#000000";
		case 1:
			return "#FFFFFF";
		case 2:
			if (window.matchMedia("(prefers-color-scheme: dark)").matches)
				return "#FFFFFF";
			return "#000000";
		case 3:
			return "#FF0000";
		default:
			return "#000000";
	}
}

function resizeCanvas(can) {
	canvas.width = 0;
	canvas.height = 0;
	canvas.width = document.body.scrollWidth;
	canvas.height = document.body.scrollHeight;
	drawStudyTree(can);
}

function drawStudyTree(can) {
	let children, ext;
	switch (can) {
		case "reb":
			children = rebirthChildList;
			ext = "r";
			break;
		case "ath":
			children = anotherChildList;
			ext = "a";
			break;
		case "tri":
			children = [[1, 5], [2], [3], [6], [], [4], [7]];
			ext = "t";
			break;
		default:
			children = childList;
			ext = "";
			break;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (const arr in children) {
		children[arr].forEach(child => {
			drawTreeBranch(arr, child, ext);
		});
	}
}

function drawTreeBranch(num1, num2, type) {
	try {
		const start = document
			.getElementById(type + num1)
			.getBoundingClientRect();
		const end = document
			.getElementById(String(num2).startsWith("c") ? num2 : type + num2)
			.getBoundingClientRect();
		const x1 =
			start.left +
			(start.width / 2 + 0.5) +
			(document.documentElement.scrollLeft || document.body.scrollLeft);
		const y1 =
			start.top +
			(start.height / 2 + 0.5) +
			(document.documentElement.scrollTop || document.body.scrollTop);
		const x2 =
			end.left +
			(end.width / 2 + 0.5) +
			(document.documentElement.scrollLeft || document.body.scrollLeft);
		const y2 =
			end.top +
			(end.height / 2 + 0.5) +
			(document.documentElement.scrollTop || document.body.scrollTop);
		ctx.lineWidth = 15;
		ctx.beginPath();
		ctx.strokeStyle = getStrokeColor();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	} catch (e) {
		console.warn(
			`Dude, rendering failed! ${e} Should probably remove tree branch for ${type}${num1}`
		);
	}
}
