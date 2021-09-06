# Installation

This page will walk you through the installation of your own local instance of the Adapt authoring tool.

## 1. Install prerequisites
The first step is to make sure you have the required prerequisites installed, and are using the correct versions of these.

The authoring tool requires the following:

- [Node.js](https://nodejs.org/en/download/): for running the code
- [git](https://git-scm.com/downloads): for getting the latest code changes
- [MongoDB](https://www.mongodb.com/try/download/community): for storing all of your data

You can confirm this by executing the commands below:

```
node --version
v14.*

npm --version
v6.*

git --version
v2.*

mongod --version
db version v3+
```

If any of these return errors, or the installed versions don't match the requirements above, please look up the relevant documentation for installing/upgrading (you can use the links above).

## 2. Run the installer
The authoring tool comes bundled with a user-friendly installer which will walk you through the various steps of the install. To run the installer, execute the following command in a terminal:
```
npx adapt-security/adapt-authoring-installer install -p [DIRECTORY]
```
> If you don't pass the `[DIRECTORY]` param, the application will be installed in a new `adapt-authoring` folder in the current working directory.

Once you run this command, the installer will automatically open in your default web browser, and guide you through the rest of the process.

Good luck!
