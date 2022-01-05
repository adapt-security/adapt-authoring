import { exec } from 'child_process';
import fs from 'fs';

export default class Install {
  constructor(app, config, outputDir) {
    this.outputPath = `${outputDir}/install.md`;
  }
  async run() {
    const output = await new Promise((resolve, reject) => {
      exec(`npx adapt-security/at-utils prereqs`, (error, stdout) => {
        error ? reject(error) : resolve(stdout);
      });
    });
    let file = fs.readFileSync(new URL('install.md', import.meta.url)).toString();
    let commandsMd = '';

    output.split('\n').forEach(o => {
      const match = o.match(/^(\w+): (.+(\..+)(\..+)?)/);
      if(match) {
        file = file.replace(`{{{${match[1]}}}}`, match[2]);
        commandsMd += `\`\`\`\n${match[1]} --version\n\`\`\`\n`;
      }
    });
    file = file.replace(`{{{commands}}}`, commandsMd);

    fs.writeFileSync(this.outputPath, file);
    this.customFiles = [this.outputPath];
  }
}