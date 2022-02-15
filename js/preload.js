// The first code to run.
"use strict";
// Set decimal mod proto
Decimal.prototype.modulo = function (n) {
	return new Decimal(this.toNumber() % n);
};
Decimal.prototype.mod = Decimal.prototype.modulo;

const D = Decimal,
	$ = _ => document.querySelector(_);
