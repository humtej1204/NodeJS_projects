#!/usr/bin/node

if (process.argv.length > 2) {
	const args = process.argv.slice(2);
	if (args.length == 1) {
		console.log("Argument found");
	}
	else {
		console.log("Arguments found");
	}
	return;
}
console.log("No argument");
