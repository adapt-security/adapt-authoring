# Developer installation

> Make sure to check the [main install instructions](install) for the list of prerequisites required prior to installation.

If you're a developer working on the Adapt authoring tool, there are a number of included scripts which should come in useful for working on local copies of the code.

## Installation
To avoid unnecessarily high stress levels, we strongly advise you make use of [`npm link`](https://docs.npmjs.com/cli/link) to allow you to work on Adapt modules locally and have any changes propagate to your local adapt-authoring copy.

To do this, you'll need to do the following for each module you have locally:
1. Clone as usual via git
2. Run `npm link` to make the module available globally (this needs to be run in each module's source folder)
3. Run `npm link MODULE_NAME` to install a symlink in your `adapt-authoring` installation.<br/>_ALTERNATIVE_ The included `dev-init` npm task goes one step further than the default `npm link` behaviour, and automatically runs `npm link MODULE_NAME` for all modules listed in the adapt-authoring dependencies. To use this, you simply need to run `npm run dev-init` from your root `adapt-authoring` folder.<br/>**Note: this script will need to be re-run each time you run `npm install`.**

### Important note
Symlinks won't work with nested dependencies (i.e. where `adapt-authoring-module1` depends on `adapt-authoring-module2` and where `adapt-authoring-module2` isn't listed in the main adapt-authoring dependencies).

To work around this issue, you can simply list `adapt-authoring-module1` in your adapt-authoring `package.json` dependencies.

## Configuration
Configuration files are stored in the `conf` folder and named according to the `NODE_ENV` environment variable (`production` is assumed if none is specified), e.g. `/conf/dev.config.js`.

To help with the population of config files, we have included the the `generate-config` npm script. As mentioned above, `NODE_ENV` var will be used for file naming. Additionally, the `--defaults=y` flag can be used to generate a 'complete' config with all defaults included. This is not necessary as defaults will be inferred at runtime, but may help with your debugging. 

**Please note that any values of `undefined` will need to be populated with correct values**.

As an example, the following command will create a file with all default values in `/conf/dev.config.js`.
```
NODE_ENV=dev npm run at-confgen --defaults=y
```

## Running
If you've made use of symlinked modules using `npm link`, you will need to make sure you include the `--preserve-symlinks` flag when running the start script. Alternatively, you can run `npm run dev` which will do this for you.

## Debugging
When debugging, you can use the `debug` and `debug-brk` npm scripts which will run the main application with the `--inspect` and `--inspect-brk` flags respectively (they also use the symlink flag, see [Running](#Running)).