module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-apidoc');

  grunt.initConfig({
    apidoc: {
      accounting: {
        src: "routes/",
        dest: "public/apidoc"
      }
    }
  });
};
