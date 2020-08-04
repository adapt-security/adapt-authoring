const { exec } = require('child_process');
const fs = require('fs-extra');

fs.readJSON('package.json', (error, pkg) => {
  if(error) return console.log(error);
  Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).forEach(d => {
    exec(`npm link ${d}`, (error, stdout, stderr) => !error && !stderr && console.log(`Successfully linked '${d}'`));
  });
});