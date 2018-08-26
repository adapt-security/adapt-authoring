const config = require('adapt-authoring-config');

const c = new config();
c.preloadDelegate().then(() => {
  console.log('then');
  console.log('Hi', c, c.get('db'));
});
