#!/usr/bin/node

const args = process.argv.slice(2);
if (!parseInt(args[0])) {
	console.log("Not a number");
	return;
}
console.log(parseInt(args[0]));
