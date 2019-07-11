#!/usr/bin/env node
const Module = require('module');
const path = require('path');

const { input, command } = getInput();
const options = getOptions();

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
const env = process.env;

console.log(`\nRunning the application with '${env.NODE_ENV}' environment`);

let local_modules_path;
try {
  local_modules_path = require(`../conf/${env.NODE_ENV}.json`).app.local_modules_path;
} catch(e) {
  // do nothing
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
