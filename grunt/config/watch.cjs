// TODO excludes
module.exports = {
  handlebarsApp: {
    files: ['<%= workspaceDir %>/adapt-authoring-ui/app/**/*.hbs'],
    tasks: ['newer:copy:handlebarsApp', 'handlebars']
  },
  handlebarsPluginUi: {
    files: ['<%= workspaceDir %>/*/ui-plugin/**/*.hbs'],
    tasks: ['newer:copy:handlebarsPluginUi', 'handlebars']
  },
  lessApp: {
    files: ['<%= workspaceDir %>/adapt-authoring-ui/app/**/*.less'],
    tasks: ['newer:copy:lessApp', 'less:dev']
  },
  lessPluginUi: {
    files: ['<%= workspaceDir %>/*/ui-plugin/**/*.less'],
    tasks: ['newer:copy:lessPluginUi', 'less:dev']
  },
  jsAppUi: {
    files: ['<%= workspaceDir %>/adapt-authoring-ui/app/**/*.js'],
    tasks: ['newer:copy:jsApp']
  },
  jsPluginUi: {
    files: ['<%= workspaceDir %>/*/ui-plugin/**/*.js'],
    tasks: ['newer:copy:jsPluginUi']
  }
};
