#!/usr/bin/env node
const Module = require('module');
const path = require('path');
const { input, command } = getInput();
const options = getOptions();

processEnv();
if(process.env.NODE_ENV === 'dev' && process.env.aat_local_modules_path) {
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
  process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
  // try to load any local env variables
  try {
    Object.entries(require(`../.${process.env.NODE_ENV}.json`)).forEach(([key,val]) => options[key] = val);
  } catch(e) {
    if(e.code !== 'MODULE_NOT_FOUND') console.log(`Failed to load ${path.resolve(`../.${process.env.NODE_ENV}.json`)}: ${e}`);
  }
  Object.entries(options).forEach(([key,val]) => process.env[`aat_${key}`] = val);
}
/**
* Hijacks the require function to allow use of local modules.
* @note Only applies to modules prefixed 'adapt-authoring'
* @note Lookds for aat_local_modules_path env var
*/
function hijackRequire() {
  console.log(`Using Adapt modules in ${process.env.aat_local_modules_path}`);
  // keep track of any failed requires, so we only log the problem once
  const failedRequires = [];
  const __require = Module.prototype.require;
  // Hijack the standard require function
  Module.prototype.require = function(modPath) {
    if(modPath.includes('adapt-authoring') && !failedRequires.includes(modPath)) {
      const parts = modPath.split(path.sep);

      if(parts.length > 1) {
        const file = parts.pop();
        let m;
        parts.reverse().forEach(p => {
          if(!m && p.search(/^adapt-authoring/) > -1) m = p;
        });
        modPath = path.join(m, file);
      }
      try {
        return __require.call(this, path.join(process.env.aat_local_modules_path, modPath));
      } catch(e) {
        console.log(`Failed to load local '${modPath}', ${e.message}`);
        console.log(e.stack);
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
  try {
    require(`./${command}`);
  } catch(e) {
    console.log(e);
    console.log(`Unknown command '${command}', use the -h flag for help`);
  }
}
