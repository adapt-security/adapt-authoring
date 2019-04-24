const { App } = require('adapt-authoring-core');
// TODO remove this once we have config...
Object.assign(process.env, {
  SERVER_HOST: 'localhost',
  SERVER_PORT: 5000,
  DB_HOST: 'localhost',
  DB_PORT: 27017,
  DB_NAME: 'adapt-authoring-prototype'
});
App.instance.start();
