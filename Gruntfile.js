module.exports = function(grunt) {
  grunt.registerTask('default', ['apidoc']);
  grunt.loadNpmTasks('grunt-apidoc');

  grunt.initConfig({
    apidoc: {
      accounting: {
        src: "./server/api/",
        dest: "./server/public/apidoc"
      }
    }
  });
};
