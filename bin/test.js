const testing = require('adapt-authoring-testing');
if(process.env.NODE_ENV !== 'testing') {
  process.env.NODE_ENV = 'testing';
}
module.exports = testing();
