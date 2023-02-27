module.exports = function(grunt) {
  const isDev = grunt.option('isDev');
  return {
    compile: {
      options: {
        amd: 'handlebars',
        namespace: 'Handlebars.templates',
        processName: function(filePath) {
          var newFilePath = filePath.split('/');
          newFilePath = newFilePath[newFilePath.length - 1].replace(/\.[^/.]+$/, '');
          return newFilePath;
        },
        partialRegex: /.*/,
        partialsPathRegex: /\/partials\//
      },
      files: [
        {
          src: [
            '<%= srcDir %>**/*.hbs'
          ],
          follow: true,
          dest: `${isDev ? '<%= buildDir %>' : '<%= srcDir %>'}/templates.js`
        }
      ]
    }
  };
};
