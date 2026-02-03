import "bytenode";
import DatabaseEngine from "../build/DatabaseEngine.jsc";

async function main(): Promise<void> {
	console.log(await DatabaseEngine.deleteDatabase("0003"));
	console.log(await DatabaseEngine.deleteDatabase("0002"));
	console.log(await DatabaseEngine.deleteDatabase("0001"));
	return;
}
main();