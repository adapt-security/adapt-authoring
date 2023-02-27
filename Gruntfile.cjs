var path = require('path');

var appendSlash = function(dir) {
  if (dir) {
    var lastChar = dir.substring(dir.length - 1, dir.length);
    if (lastChar !== path.sep) return dir + path.sep;
  }
};

module.exports = function(grunt) {
  const data = {
    buildDir:appendSlash(grunt.option('buildDir')),
    srcDir:appendSlash(grunt.option('srcDir')),
    pluginsDir:appendSlash(grunt.option('pluginsDir')),
    workspaceDir:appendSlash(grunt.option('workspaceDir'))
  }

  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt, {
    data: data,
    configPath: path.join(__dirname, 'grunt', 'config'),
    jitGrunt: {
      customTasksDir: path.join(__dirname, 'grunt', 'tasks')
    }
  });

  grunt.registerTask('default', ['dev']);
};
