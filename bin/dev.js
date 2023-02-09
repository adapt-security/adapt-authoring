import nodemon from 'nodemon';

nodemon({
  script: './bin/start',
  watch: ['local_adapt_modules'],
  args: ['--rebuild-ui'],
  ext: 'css,js,hbs,html,less,schema.json'
});