const { App, Utils } = require('adapt-authoring-core');
const fs = require('fs');
const path = require('path');
const ConfigUtils = require('adapt-authoring-config').Utils;

const appPkg = require(path.join(process.cwd(), 'package.json'));
const outpath = path.resolve(path.join(process.cwd(), 'conf', `${process.env.NODE_ENV}.config.js`));
const configJson = {};

async function init() {
  try {
    Object.assign(configJson, require(outpath));
    console.log(`Config already exists for NODE_ENV '${process.env.NODE_ENV}'. Any missing values will be added.`);
  } catch(e) {
    console.log(`No config found for NODE_ENV '${process.env.NODE_ENV}'. File will be written to ${outpath}\n`);
  }
  await Promise.all(Object.keys({ ...appPkg.dependencies, ...appPkg.devDependencies }).map(async d => {
    const schema = await ConfigUtils.loadConfigSchema(Utils.getModuleDir(d));
    if(!schema) {
      return;
    }
    const generated = Object.entries(schema.properties).reduce((memo, [attr, config]) => {
      memo[attr] = getValueForAttr(schema, attr);
      return memo;
    }, {});
    if(Object.keys(generated).length) {
      configJson[d] = Object.assign({}, configJson[d], generated);
    }
  }));
  fs.writeFileSync(outpath, `module.exports = ${JSON.stringify(configJson, null, 2)};`);
  console.log('Config file written successfully.\n');
  console.log('NOTE: any null values will likely need to be specified manually.\n');
}

function getValueForAttr(schema, attr) {
  const required = schema.required && schema.required.includes(attr);
  if(required) return null;
  const defaultVal = schema.properties[attr].default;
  if(defaultVal) return defaultVal;
}

init();
