'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-apidoc');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-bower-install-simple');

  grunt.initConfig({
    apidoc: {
      accounting: {
        src: './server/api/',
        dest: './server/apidoc'
      }
    },

    'bower-install-simple': {
      options: {
        color: true,
        cwd: 'client',
        directory: 'components'
      },

      prod: {
        options: {
          production: true
        }
      },
    },

    sass: {
      dist: {
        files: {
          'client/public/css/application.css': 'client/assets/application.scss'
        }
      }
    }
  });

  grunt.registerTask('setup', 'Setup task', function () {
    if (process.env.NODE_ENV !== 'test') {
      grunt.task.run('apidoc');
      grunt.task.run('bower-install-simple');
      grunt.task.run('sass');
    }
  });
};
