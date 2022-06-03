import { copy as denoCopy } from "https://deno.land/std@0.95.0/fs/mod.ts";
import { rollup } from "https://esm.sh/rollup@2.75.4";
import svelte from "https://esm.sh/rollup-plugin-svelte@7.1.0";
import commonjs from "https://esm.sh/@rollup/plugin-commonjs@22.0.0";
import replace from "https://esm.sh/@rollup/plugin-replace@4.0.0";
import css from "https://esm.sh/rollup-plugin-css-only@3.1.0";


// Input options for Rollup
const INPUT_DIR = "./src";
const inputOptions = {
    input: INPUT_DIR + "/main.js",
    plugins: [
        svelte({
            compilerOptions: {}
        }),
        replace({
            "svelte/internal": "./svelte/internal",
            preventAssignment: true,
        }),
        css({output: "bundle.css"}),
        commonjs(),
    ],
};

// Output options for Rollup
const OUTPUT_DIR = "./dist";
const outputOptions = {
    file: OUTPUT_DIR + "/bundle.js",
    format: "iife",
};

// Files to copy(overwrite) after build
const filesToCopy = [
    "index.html",
    // "static",
];



build();
async function build() {
    let bundle;
    let buildFailed = false;

    // Rollup
    try {
        bundle = await rollup(inputOptions);        
        await bundle.write(outputOptions);
        console.log("[Build] Rollup complete");
    } catch (error) {
        buildFailed = true;
        console.error(error);
    } finally {
        await bundle?.close();
    }

    // Copy files
    if (!buildFailed) {
        try {
            for (const file of filesToCopy) {
                // copy files
                await denoCopy(INPUT_DIR + "/" + file, OUTPUT_DIR + "/" + file, { overwrite: true });
            }
            console.log("[Build] File copy complete");
        } catch (error) {
            console.error("Failed to copy assets: ", error);
            buildFailed = true;
        }
    }

    // Exit with error code
    console.log("[Build]", buildFailed ? "Build Unsuccessful T_T" : "Build OK ^_^");
    process.exit(buildFailed ? 1 : 0);
}
