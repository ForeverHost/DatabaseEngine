import * as esbuild from "esbuild";

esbuild
	.build({
		entryPoints: ["src/main.ts"],
		bundle: true,
		outfile: "build/DatabaseEngine.js",
		platform: "node",
		target: ["node23.11.1"],
		external: ["readline/promises", "bcrypt", "sharp"],
		format: "cjs",
		minify: true
	})
	.catch(() => process.exit(1));
