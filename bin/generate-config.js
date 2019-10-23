const { App, Utils } = require('adapt-authoring-core');
const fs = require('fs');
const path = require('path');
const ConfigUtils = require('adapt-authoring-config').Utils;

const appPkg = require(path.join(process.cwd(), 'package.json'));
const outpath = path.resolve(path.join(process.cwd(), 'conf', `${process.env.NODE_ENV}.config.js`));
const configJson = {};

try {
  Object.assign(configJson, require(outpath));
  console.log(`Config already exists for NODE_ENV '${process.env.NODE_ENV}'. Any missing values will be added.`);
} catch(e) {
  console.log(`No config found for NODE_ENV '${process.env.NODE_ENV}'. File will be written to ${outpath}\n`);
}
Object.keys({ ...appPkg.dependencies, ...appPkg.devDependencies }).forEach(d => {
  const schema = ConfigUtils.loadConfigSchema(Utils.getModuleDir(d));
  if(!schema || !schema.definition) return;

  if(!configJson[d]) configJson[d] = {};

  const generated = Object.entries(schema.definition).reduce((memo, [attr, config]) => {
    if(config.default) memo[attr] = config.default;
    else if(config.required) memo[attr] = null;
    return memo;
  }, {});

  Object.assign(configJson[d], generated);
});

fs.writeFileSync(outpath, `module.exports = ${JSON.stringify(configJson, null, 2)};`);
console.log('Config file written successfully.\n');
