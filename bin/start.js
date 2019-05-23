const Module = require('module');
const path = require('path');
const { App } = require('adapt-authoring-core');
/**
* Hijacks the require function to allow use of local modules.
* @note Only applies to modules prefixed 'adapt-authoring'
* @note Specify local modules folder in /.dev.json local_modules_path attribute
*/
if(!process.env.aat_local_modules_path) {
  return start();
}
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

start();

function start() {
  console.log('Using the following environment vars:');
  console.log(`{`);
  console.log(`  NODE_ENV: ${process.env.NODE_ENV}`);
  Object.entries(process.env).forEach(([key, value]) => {
    if(key.slice(0,4) === 'aat_') console.log(`  ${key}: ${value}`);
  });
  console.log(`}`);

  App.instance.start();
}
