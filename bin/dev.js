/**
* Hijacks the require function to allow use of local modules.
* @note Only applies to modules prefixed 'adapt-authoring'
* @note Specify local modules folder in /dev.json localModulesPath attribute
*/
const Module = require('module');
const path = require('path');
// path to load local modules
let localModulesPath;

try {
  localModulesPath = require('../.dev.json').localModulesPath;
} catch(e) {
  console.log('dev.js: no .dev.json found, require will behave as normal\n');
}
if(!localModulesPath) {
  return require('./start');
}
// keep track of any failed requires, so we only log the problem once
const failedRequires = [];
const __require = Module.prototype.require;

console.log(`dev.js: using local modules in '${localModulesPath}'\n`);

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
      return __require.call(this, path.join(localModulesPath, modPath));
    } catch(e) {
      console.log(`Failed to load local '${modPath}', ${e.message}`);
      console.log(e.stack);
      failedRequires.push(modPath);
    }
  }
  return __require.apply(this, arguments);
};
// do the standard start routine
require('./start');
