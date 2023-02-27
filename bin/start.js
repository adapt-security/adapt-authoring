import { App } from 'adapt-authoring-core';
import cp from 'child_process';

function runGrunt() {
  let options = {
    isDev: !App.instance.config.get('adapt-authoring-ui.isProduction'),
    buildDir: App.instance.config.get('adapt-authoring-ui.buildDir'),
    srcDir: App.instance.config.get('adapt-authoring-ui.srcDir'),
    pluginsDir: `${App.instance.config.get('adapt-authoring-ui.srcDir')}/plugins`,
    workspaceDir: 'local_adapt_modules'
  }

  /* let options = {
    isDev: true,
    buildDir: './APP_DATA/temp/ui-build',
    srcDir: './APP_DATA/temp/ui-src',
    pluginsDir: './APP_DATA/temp/ui-src/plugins',
    workspaceDir: 'local_adapt_modules'
  } */
  
  let opts = [];

  if (options && Object.keys(options).length) {
    for (const k in options) {
      opts.push(`--${k}${options[k] === null ? '' : `="${options[k]}"`}`);
    }
  }

  const runInShell = /^win/.test(process.platform);

  cp.spawn('grunt', ['--gruntfile=Gruntfile.cjs'].concat(opts), {
    cwd: process.cwd(),
    shell: runInShell,
    stdio: [null, process.stdout, process.stderr]
  });
}

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

//runGrunt(); // N.B. dev purposes

App.instance.onReady().then(async () => {
  const ui = await App.instance.waitForModule('ui');
  ui.postBuildHook.tap(runGrunt);
}).catch(e => console.error(e));

//App.instance.onReady().then(runGrunt).catch(e => console.error(e)); // N.B. dev purposes