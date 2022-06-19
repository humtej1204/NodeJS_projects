#!/usr/bin/node

const args = process.argv.slice(2);
if (!process.argv[2]) {
	console.log("No argument");
	return;
}
console.log(args.toString());
