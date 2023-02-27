module.exports = function(grunt, options) {
  var convertSlashes = /\\/g;
  var path = require('path');

  function alphanumericOrder(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function lengthOrder(a, b) {
    return a.length > b.length ? 1 : a.length < b.length ? -1 : 0;
  }

  function compareFilePaths(a, b) {
    /**
     * If not in the same folder sort alphanumerically
     */
    var aParsed = path.parse(a);
    var bParsed = path.parse(b);
    if (aParsed.dir !== bParsed.dir) return alphanumericOrder(a, b);

    /**
     * If names don't start with the same phrase sort alphanumerically
     */
    var aStartsB = bParsed.name.startsWith(aParsed.name);
    var bStartsA = aParsed.name.startsWith(bParsed.name);
    if (!aStartsB && !bStartsA) return alphanumericOrder(a, b);

    /**
     * If at the same level of nesting
     * In the same directory
     * Where one name starts the other
     * Sort by name length
     */
    return lengthOrder(aParsed.name, bParsed.name);
  }

  function sortLESSFilePaths(filepaths) {
    // convert windows slashes to unix slashes
    filepaths = filepaths.map(function(path) {
      return path.replace(convertSlashes, '/');
    });
    return filepaths.sort(compareFilePaths);
  }

  return {
    dev: {
      options: {
        baseUrl: process.cwd(),
        mandatory: [
          '<%= srcDir %>**/*.less'
        ],
        sourcemaps: true,
        compress: false,
        dest: '<%= buildDir %>/css',
        cssFilename: 'adapt.css',
        mapFilename: 'adapt.css.map',
        order: sortLESSFilePaths,
        replaceUrls: [
          {
            'action': 'Replace url(../../assets/ with url(assets/',
            'find': /\.\.\/\.\.\/assets\//,
            'replaceWith': 'assets/'
          }
        ]
      },
      // newer configuration
      files: {
        '<%= buildDir %>/css/adapt.css': [
          '<%= srcDir %>**/*.less'
        ]
      }
    },
    compile: {
      options: {
        baseUrl: process.cwd(),
        mandatory: [
          '<%= srcDir %>**/*.less'
        ],
        sourcemaps: false,
        compress: true,
        dest: '<%= buildDir %>/css',
        cssFilename: 'adapt.css',
        mapFilename: 'adapt.css.map',
        order: sortLESSFilePaths,
        replaceUrls: [
          {
            'action': 'Replace url(../../assets/ with url(assets/',
            'find': /\.\.\/\.\.\/assets\//,
            'replaceWith': 'assets/'
          }
        ]
      }
    }
  };
};
