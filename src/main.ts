import { generatePassword, execCommand } from "@/utils";

/**
 * DatabaseEngine – database manager via `clpctl`.
 */
export default class DatabaseEngine {
	/**
	 * Creates a database for the given node and gdps id.
	 *
	 * @param node   – sub‑domain part (e.g. "myserver")
	 * @param gdpsid – identifier used for DB name & user
	 * @returns      [success, password] - `true` if the command succeeded,
	 *               otherwise `false`. The generated password is returned
	 *               on success; on failure an empty string is returned.
	 */
	public static async create(node: string, gdpsid: string): Promise<[boolean, string]> {
		// generate a random 10‑character password
		const password: string = generatePassword(10);

		// build the command string
		const domainName: string = `${node}.forever-host.xyz`;
		const databaseName: string = `gdps-${gdpsid}`;
		const databaseUserName: string = `gdps-${gdpsid}`;
		const command: string = [
			"sudo",
			"clpctl",
			"db:add",
			`--domainName=${domainName}`,
			`--databaseName=${databaseName}`,
			`--databaseUserName=${databaseUserName}`,
			`--databaseUserPassword='${password}'`
		].join(" ");

		// execute the command
		try {
			await execCommand(command);
			// if we reach here the command exited with code 0
			return [true, password];
		} catch (err) {
			console.error("Database creation failed:", err);
			return [false, ""];
		}
	}

	/**
	 * Exports a database to a file.
	 *
	 * @param gdpsid – identifier used for DB name
	 * @param path   – absolute path where the dump should be written
	 * @returns      `true` if the command succeeded, otherwise `false`
	 */
	public static async exportDatabase(gdpsid: string, path: string): Promise<boolean> {
		const databaseName: string = `gdps-${gdpsid}`;
		const command: string = ["sudo", "clpctl", "db:export", `--databaseName=${databaseName}`, `--file=${path}`].join(" ");

		try {
			await execCommand(command);
			return true;
		} catch (err) {
			console.error("Database export failed:", err);
			return false;
		}
	}

	/**
	 * Imports a database from a file.
	 *
	 * @param gdpsid – identifier used for DB name
	 * @param path   – absolute path to the dump file to import
	 * @returns      `true` if the command succeeded, otherwise `false`
	 */
	public static async importDatabase(gdpsid: string, path: string): Promise<boolean> {
		const databaseName: string = `gdps-${gdpsid}`;
		const command: string = ["sudo", "clpctl", "db:import", `--databaseName=${databaseName}`, `--file=${path}`].join(" ");

		try {
			await execCommand(command);
			return true;
		} catch (err) {
			console.error("Database import failed:", err);
			return false;
		}
	}

	/**
	 * Deletes a database.
	 *
	 * @param gdpsid – identifier used for DB name
	 * @returns      `true` if the command succeeded, otherwise `false`
	 */
	public static async deleteDatabase(gdpsid: string): Promise<boolean> {
		const databaseName: string = `gdps-${gdpsid}`;
		const command: string = ["echo \"yes\" | sudo", "clpctl", "db:delete", `--databaseName=${databaseName}`].join(" ");

		try {
			await execCommand(command);
			return true;
		} catch (err) {
			console.error("Database deletion failed:", err);
			return false;
		}
	}
}
