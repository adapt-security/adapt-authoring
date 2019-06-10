# Installation

## 1. Install prerequisites
The first step is to make sure you have the required prerequisites installed, and at the correct version.

```
$ node --version
v10.*

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
You now need to configure your install to make sure the application uses the settings relevant to your machine (at this stage in the prototype, these settings are largely linked to your local MongoDB install).

There are two ways to do this:
- Pass the required options as command-line parameters when starting the application
- Create an environment configuration file and load this by specifying the correct `NODE_ENV` value when starting the application

See the table below for a list of the available environment options:

| Option | Environment | Description |
| ------ | ----------- | ----------- |
| `local_modules_path` | `dev` | Allows the use of local Adapt modules (rather than using those found in `/node_modules`). Handy during development. |
| `server_host` | all | URL that the application will be accessible from |
| `server_port` | all | Port that the application should use to listen for connections. |
| `db_host` | all | Hostname for the database. |
| `db_port` | all | Port for the database. |
| `db_name` | all | Name of the MongoDB database to use for storing data. |

### Command-line parameters
Passing CLI options is as simple as this:
```
adaptat start --db_host=localhost --db_port=5000 --db_name=adapt-db
```

### Environment file

Each environment file must be placed in the root project folder (i.e. `adapt-authoring`), in JSON format, prefixed with a `.` and named according to the environment (e.g. `.dev.json`, `.prod.json` etc.)

By default it is assumed that the current environment is `dev`, but if you want to run the application in another environment, set the `NODE_ENV` environment variable when running the application:
```
NODE_ENV=prod adaptat start
```

Example `.dev.json` configuration:
```
{
  "local_modules_path": "/adapt-authoring-modules",
  "server_host": "http://localhost",
  "server_port": 5000,
  "db_host": "localhost",
  "db_port": 27017,
  "db_name": "adapt-authoring-prototype"
}
```

## *4a. Install local module dependencies (optional)*
If using the `local_modules_path` option, you'll also need to make sure you've install the local dependencies for each of your local modules (i.e. run `npm install` for each module in `local_modules_path`).
