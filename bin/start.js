const { App } = require('adapt-authoring-core');

console.log('Using the following environment vars:');
console.log(`{`);
console.log(`  NODE_ENV: ${process.env.NODE_ENV}`);
Object.entries(process.env).forEach(([key, value]) => {
  if(key.slice(0,4) === 'aat_') console.log(`  ${key}: ${value}`);
});
console.log(`}`);

App.instance.start();
