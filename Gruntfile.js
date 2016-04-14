'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-apidoc');
  grunt.loadNpmTasks('grunt-bower-task');

  grunt.initConfig({
    apidoc: {
      accounting: {
        src: './server/api/',
        dest: './server/apidoc'
      }
    },

    bower: {
      install: {
        options: {
          targetDir: './client/bower_components',
          cleanBowerDir: true
        }
      }
    }
  });

  grunt.registerTask('setup', 'Setup task', function () {
    if (process.env.NODE_ENV !== 'test') {
      grunt.task.run('apidoc');
      grunt.task.run('bower:install');
    }
  });
};
