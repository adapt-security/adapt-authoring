import nodemon from 'nodemon';

nodemon({
  script: './bin/start',
  watch: ['local_adapt_modules'],
  args: ['--rebuild-ui'],
  ext: 'js,html,hbs,less,css'
});