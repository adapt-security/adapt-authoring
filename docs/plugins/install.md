# Installation

This page will walk you through the installation of your own local instance of the Adapt authoring tool.

## 1. Install prerequisites
The first step is to make sure you have the required prerequisites installed, and are using the correct versions of these.

The authoring tool requires the following:

- [git {{{git}}}](https://git-scm.com/downloads): for getting the latest code changes
- [MongoDB {{{mongod}}}](https://www.mongodb.com/try/download/community): for storing all of your data
- [Node.js {{{node}}}](https://nodejs.org/en/download/): for running the code
- [npm {{{npm}}}](https://nodejs.org/en/download/): for managing dependencies

> We strongly recommend using a version manager to install Node.js and npm like [nvm](https://github.com/nvm-sh/nvm) (Linux/Mac OS) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows). This makes it very easy to switch versions later.

You can confirm that you have the correct prerequisites installed by executing the commands below in your terminal:

{{{commands}}}

If any of these return errors, or the installed versions don't match the requirements above, please look up the relevant documentation for installing/upgrading (you can use the links above).

## 2. Run the installer
We've build a user-friendly installer utility which will walk you through the various steps of the install.

To run the installer, execute the following command in a terminal:
```
npx adapt-security/adapt-authoring-installer install --prerelease [DIRECTORY]
```
> If you don't pass the `[DIRECTORY]` param, the application will be installed in a new `adapt-authoring` folder in the current working directory.

Once you run this command, the installer will automatically open in your default web browser, and guide you through the rest of the process.

Good luck!
