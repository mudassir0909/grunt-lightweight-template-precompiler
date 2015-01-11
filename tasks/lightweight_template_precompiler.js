/*
 * grunt-lightweight-template-precompiler
 * https://github.com/mudassir0909/grunt-lightweight-template-precompiler
 *
 * Copyright (c) 2015 Mudassir Ali
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('lightweight_template_precompiler', 'Ultra lightweight js template precompiler', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        punctuation: '.',
        separator: ', '
      }),
      path = require('path'),
      template_namespace = options.namespace || 'JST',
      precompile = function(template_data, template_name) {
        var precompiled_template,
            regex = /{([^{}]*)}/g;

        // replace double quotes with single quotes
        precompiled_template = template_data.replace(/\"/g, "'");

        // split each line, enclose in double quotes & join them using + sign
        precompiled_template = precompiled_template.split("\n").map(
          function(line) {
            return '"' + line.trim() + '"';
          }).join(" \t+\n ");

        // replace the curly braces with the variables
        precompiled_template = precompiled_template.replace(
          regex, function(a, b) {
            return '" + data.' + b + ' + "';
          });

        return "(function() {\n\t" +
                  "window." + template_namespace + ' = window.' + template_namespace + ' || {};\n\t' +
                  template_namespace + '["' + template_name + '"] = ' + 'function(data) {\n\t\t' +
                    'return ' + precompiled_template + ';\n\t' +
                  '};\n' +
                '})();';
      };

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var precompiled_templates = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath, i) {
        if (grunt.file.isDir(filepath)) {
          return;
        }

        var template_data = grunt.file.read(filepath),
            template_name = path.basename(filepath, '.html');

        return precompile(template_data, template_name);
      }).join('\n\n');

      grunt.file.write(f.dest, precompiled_templates);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
