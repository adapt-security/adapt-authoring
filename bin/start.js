const {App} = require('adapt-authoring-core');

async function start() {
  console.log(`Running application from ${process.cwd()}`);
  const app = new App();
  try {
    await app.preloadDelegate(app);
    await app.bootDelegate(app);
  } catch(e) {
    console.log(`Failed to start application: ${e}`);
  }
}

module.exports = start();
