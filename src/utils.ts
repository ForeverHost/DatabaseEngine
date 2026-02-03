import { exec } from "child_process";
import { randomBytes } from "crypto";

/**
 * Generates a random password consisting of alphanumeric characters.
 * Length = 10 symbols.
 */
export function generatePassword(length = 10): string {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const bytes = randomBytes(length);
	let pwd = "";
	for (let i = 0; i < length; i++) {
		// map each random byte to an index in the alphabet
		pwd += alphabet[bytes[i] % alphabet.length];
	}
	return pwd;
}

/**
 * Executes a shell command and resolves with the command's stdout.
 * Rejects on error (including non‑zero exit code).
 */
export function execCommand(command: string): Promise<string> {
	return new Promise((resolve, reject) => {
		exec(command, (error: any, stdout, stderr) => {
			if (error) {
				// Include stderr for easier debugging
				reject(new Error(`${error.message}\n${stderr}`));
			} else {
				resolve(stdout);
			}
		});
	});
}