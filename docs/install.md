# Installation

## 1. Install prerequisites
The first step is to make sure you have the required prerequisites installed, and at the correct version.

```
$ node --version
v12.*

$ git --version
v2.*

$ mongod --version
db version v3+
```

## 2. Clone the repo
The next step is to get your hands on the code. The best way to do this is via git:
```
git clone https://github.com/taylortom/adapt-authoring
cd adapt-authoring
```

## 3. Install the dependencies
Now, you need to install the app's module dependencies, which are managed by NPM:
```
npm install
```

## *3a. Link the bundled CLI (optional)*

For ease of use, you can make the Adapt authoring tool's command line tools (CLI) available globally on your system (this lets you run commands like `adaptat start` rather than `node bin/cli start`).

```
npm link
```

## 4. Configure local settings
You now need to configure your install to make sure the application uses the settings relevant to your machine.

For information on configuring the application, see [this page](temp-configuration.html).

## *4a. Install local module dependencies (optional)*
If using the `local_modules_path` option, you'll also need to make sure you've installed the local dependencies for each of your local modules (i.e. run `npm install` for each module in `local_modules_path`).
