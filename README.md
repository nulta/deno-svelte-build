# deno-svelte-build
Deno + Rollup + Svelte build tool, powered by [esm.sh](https://esm.sh/).

Simply, It lets you compile a Svelte app using [Deno](https://deno.land/) without having requirements to node.js, `node_modules`, and `package.json`.

## Usage
Run [build.sh](/build.sh) or [build.cmd](/build.cmd) depending on your OS.
Build output will be generated on /dist folder.

## Configuration
See [rollup_build.js](/rollup_build.js).

## Known Issues
Currently, it does not have `svelte-preprocess` and `terser` because of some weird import issues with these.
