module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-apidoc');

  grunt.initConfig({
    apidoc: {
      accounting: {
        src: "./server/routes/",
        dest: "./server/public/apidoc"
      }
    }
  });
};
