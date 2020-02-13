#!/usr/bin/env node
const { input, command } = getInput();
const options = getOptions();
const env = process.env;

processEnv();
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
  console.log(`Running the application with '${env.NODE_ENV}' environment`);
  Object.entries(options).forEach(([key,val]) => process.env[`aat_${key}`] = val);
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
