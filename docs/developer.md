# Developer
If you're a developer working on the Adapt authoring tool, there are a number of included scripts which should come in useful.

## Installation
If you're intending to work on any Adapt authoring modules locally, you should make use of [`npm link`](https://docs.npmjs.com/cli/link) to allow any changes to local modules to be picked up by your local adapt-authoring copy.

The included `dev-init` npm task goes one step further than the default `npm link` behaviour, and automatically runs `npm link MODULE_NAME` for all modules listed in the adapt-authoring dependencies.

**This script will need to be re-run each time you run a full `npm install`.**

### Important note
Symlinks won't work with nested dependencies (i.e. where `adapt-authoring-moduleA` depends on `adapt-authoring-moduleB` and where `adapt-authoring-moduleB` isn't listed in the main adapt-authoring dependencies).

To work around this issue, you can simply list `adapt-authoring-moduleB` in your adapt-authoring `package.json` dependencies.

## Running
If you've made use of symlinked modules using `npm link`, you will need to make sure you include the `--preserve-symlinks` flag when running the start script. Alternatively, you can run `npm run dev` which will do this for you.

## Debugging
When debugging, you can use the `debug` and `debug-brk` npm scripts which will run the main application with the `--inspect` and `--inspect-brk` flags respectively (they also use the symlink flag, see [Running](#Running)).