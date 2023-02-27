module.exports = function(grunt, options) {

  // remove path/to/adapt-authoring-ui/app
  const stripAppPath = (dest, file) => {
    const match = file.match(/adapt\-authoring\-ui\/app\/(.*)/);
    if (match.length < 2) return;
    return dest + match[1];
  }

  // remove path/to/adapt-authoring-[module]/ui-plugin
  const stripPluginPath = (dest, file) => {
    const match = file.match(/.*\/ui\-plugin\/(.*)/);
    if (match.length < 2) return;
    return dest + match[1];
  }

  var mandatoryTasks = {
    handlebarsApp: {
      files: [
        {
          expand: true,
          src: ['adapt-authoring-ui/app/**/*.hbs'],
          cwd: '<%= workspaceDir %>',
          dest: '<%= srcDir %>/',
          rename: stripAppPath
        }
      ]
    },
    handlebarsPluginUi: {
      files: [
        {
          expand: true,
          src: ['*/ui-plugin/**/*.hbs'],
          cwd: '<%= workspaceDir %>',
          dest: '<%= pluginsDir %>/',
          rename: stripPluginPath
        }
      ]
    },
    lessApp: {
      files: [
        {
          expand: true,
          src: ['adapt-authoring-ui/app/**/*.less'],
          cwd: '<%= workspaceDir %>',
          dest: '<%= srcDir %>/',
          rename: stripAppPath
        }
      ]
    },
    lessPluginUi: {
      files: [
        {
          expand: true,
          src: ['*/ui-plugin/**/*.less'],
          cwd: '<%= workspaceDir %>',
          dest: '<%= pluginsDir %>/',
          rename: stripPluginPath
        }
      ]
    },
    jsApp: {
      files: [
        {
          expand: true,
          src: ['adapt-authoring-ui/app/**/*.js'],
          cwd: '<%= workspaceDir %>',
          dest: '<%= srcDir %>/',
          rename: stripAppPath
        }
      ]
    },
    jsPluginUi: {
      files: [
        {
          expand: true,
          src: ['*/ui-plugin/**/*.js'],
          cwd: '<%= workspaceDir %>',
          dest: '<%= pluginsDir %>/',
          rename: stripPluginPath
        }
      ]
    }
  };

  return mandatoryTasks;
};
