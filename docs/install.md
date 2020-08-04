# Installation
**Note**: you can find developer-specific instructions in `developer.md`.

## 1. Install prerequisites
The first step is to make sure you have the required prerequisites installed, and at the correct version.

```
$ node --version
v14.*

$ git --version
v2.*

$ mongod --version
db version v3+
```

## 2. Clone the repo
The next step is to get your hands on the code. The best way to do this is via git:
```
git clone https://github.com/adaptlearning/adapt-authoring
cd adapt-authoring
```

## 3. Install the dependencies
Now, you need to install the app's module dependencies, which are managed by NPM:
```
npm install
```
_If you attempt to run the application now, you will encounter an error relating to missing configuration values._

## 4. Configure local settings
You now need to configure your install to make sure the application uses the settings relevant to your machine.

**Tip**: if you'd like a fully populated config file (including all default values), you can run:
```
NODE_ENV=production npm run generate-config
```
The value specified for `NODE_ENV` signifies which environment the config will apply to.

Once this has run, you will notice a new file has been generated in `conf/` (e.g. `production.config.js` in the above example). If you open this file, you will see all expected values already populated in the file. **You will need to set any attributes with the value `undefined`.**

For full information on configuring the application, see [this page](temp-configuration.html).
