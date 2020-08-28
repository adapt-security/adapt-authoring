const { exec } = require('child_process');
const path = require('path');

const { dependencies, devDependencies } = require('../package.json');
const cfg = require(`../conf/${process.env.NODE_ENV}.config.js`);

let localModulesDir;
try {
  localModulesDir = cfg['adapt-authoring-core'].modulesDir;
} catch(e) {
  console.log('adapt-authoring-core.localModulesDir must be set to use local modules');
  process.exit();
}
Object.keys({ ...dependencies, ...devDependencies }).forEach(async d => {
  try {
    await globalLink(d);
    await localLink(d);
    console.log(`Successfully linked '${d}'`);
  } catch {}
});

function globalLink(name) {
  if(!localModulesDir) return Promise.resolve();
  return new Promise((resolve, reject) => {
    exec('npm link', { cwd: path.resolve(`${localModulesDir}/${name}`) })
      .on('error', reject)
      .on('exit', resolve);
  });
}

function localLink(name) {
  return new Promise((resolve, reject) => {
    exec(`npm link ${name}`)
      .on('error', reject)
      .on('exit', resolve);
  });
}