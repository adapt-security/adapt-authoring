/**
 * For development
 */
module.exports = function(grunt) {
  grunt.registerTask('dev', 'Copies source, compiles Handlebars + less then runs watch', [
    'copy',
    'handlebars',
    'less:dev',
    'watch'
  ]);
};
