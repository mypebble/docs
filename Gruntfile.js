module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    execute: {
        dist: {
            src: ['js/build.js']
        }
    },
    watch: {
      scripts: {
        files: ['pages/**/*.md', 'pages/**/*.markdown'],
        tasks: ['execute:dist'],
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', [
    'execute:dist'
  ]);
  grunt.registerTask('w', [
    'watch:scripts'
  ])

};
