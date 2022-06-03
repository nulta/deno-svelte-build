@echo off

deno run --allow-read --allow-net="esm.sh" --allow-env --allow-write ./rollup_build.js
