#!/usr/bin/env node
const Module = require('module');
const path = require('path');

const { input, command } = getInput();
const options = getOptions();
const env = process.env;

processEnv();

const confPath = path.resolve(process.cwd(), `conf`, `${env.NODE_ENV}.config.js`);
let local_modules_path;
try {
  const conf = require(confPath);
  local_modules_path = conf && conf.app && conf.app.local_modules_path;
} catch(e) {
  console.log(`\nFailed to load config file at ${e.message.replace(process.cwd(), '')}\n`);
  process.exit(1);
}
if(env.NODE_ENV === 'dev' && local_modules_path) {
  hijackRequire();
}
loadScript();
/**
* Sorts the input, extracts the command
*/
function getInput() {
  const input = process.argv.slice(2).sort((a,b) => {
    if(a[0] !== '-') return -1;
    if(b[0] !== '-') return 1;
  });
  return { input, command: input.shift() };
}
/*
* Store any valid params
* - Must be prefixed with --
* - Can also have a value (i.e. --test=true)
*/
function getOptions() {
  const o = {};
  input.forEach(i => {
    if(i.slice(0,2) !== '--') return; // we don't deal with unknown params
    const [option,value] = i.slice(2).split('=');
    o[option] = value || true;
  });
  return o;
}
/**
* Makes sure the NODE_ENV is set, and any options are stored in the process.env with an aat_ prefix
*/
function processEnv() {
  process.env.NODE_ENV = env.NODE_ENV || 'dev';
  Object.entries(options).forEach(([key,val]) => process.env[`aat_${key}`] = val);
  console.log(`Running the application with '${env.NODE_ENV}' environment`);
}
/**
* Hijacks the require function to allow use of local modules.
* @note Only applies to modules prefixed 'adapt-authoring'
* @note Looks for app.local_modules_path config value
*/
function hijackRequire() {
  console.log(`Using Adapt modules in ${path.resolve(local_modules_path)}`);
  // keep track of any failed requires, so we only log the problem once
  const failedRequires = [];
  const __require = Module.prototype.require;
  // Hijack the standard require function
  Module.prototype.require = function(modPath) {
    if(modPath.includes('adapt-authoring') && !failedRequires.includes(modPath)) {
      const parts = modPath.split(path.sep);
      let isRoot = false;

      if(parts.length > 1) {
        const file = path.basename(modPath);
        let i = 0, m;
        parts.reverse().forEach(p => {
          if(p === file) {
            return i++;
          }
          if(!m) {
            if(p.search(/^adapt-authoring/) > -1) m = p;
            i++;
          }
        });
        modPath = path.join(...parts.reverse().slice(i*-1));
        if(modPath.search(`^${path.basename(process.cwd())}${path.sep}`) > -1) isRoot = true;
      }
      try {
        return __require.call(this, path.resolve(path.join(local_modules_path, modPath)));
      } catch(e) {
        switch(e.name) {
          case 'ReferenceError':
          case 'SyntaxError':
          case 'TypeError':
            console.trace(e);
            return process.exit(1);
          case 'Error':
            break;
          default:
            console.log(e.name);
        }
        if(isRoot) {
          try {
            return __require.call(this, path.resolve(process.cwd(), '..', modPath));
          } catch(e) {}
        }
        failedRequires.push(modPath);
      }
    }
    return __require.apply(this, arguments);
  };
}
/**
* Tries to load the relevant script
*/
function loadScript() {
  console.log();
  try {
    require(`./${command}`);
  } catch(e) {
    console.trace(e);
    console.log(`Unknown command '${command}', use the -h flag for help`);
  }
}
