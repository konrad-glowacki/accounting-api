module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-apidoc');

  grunt.initConfig({
    apidoc: {
      accounting: {
        src: "./server/api/",
        dest: "./server/public/apidoc"
      }
    }
  });

  grunt.registerTask('default', 'Default task', function() {
    if (process.env.NODE_ENV !== 'test') {
      grunt.task.run('apidoc');
    }
  });
};
