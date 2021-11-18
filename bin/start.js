import('adapt-authoring-core').then(({ App }) => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
  App.instance;
});
