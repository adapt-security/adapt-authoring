const { App } = require('adapt-authoring-core');
// TODO remove this once we have config...
const DEFAULTS = {
  SERVER_HOST: 'localhost',
  SERVER_PORT: 5000,
  DB_HOST: 'localhost',
  DB_PORT: 27017,
  DB_NAME: 'adapt-authoring-prototype'
};
Object.assign(process.env, DEFAULTS);
console.log('NOTE: for this prototype, the following env variables are assumed:\n', JSON.stringify(DEFAULTS,null,2));
App.instance.start();
