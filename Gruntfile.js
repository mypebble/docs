module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          'public/app.js': ['./js/app.js']
        },
        options: {
          browserifyOptions: {
            debug: true
          }
        }
      }
    },
    exorcise: {
      dist: {
        options: {
          strict: true
        },
        files: {
          "public/app.js.map": ["public/app.js"]
        }
      }
    },
    execute: {
        dist: {
            src: ['js/build.js']
        }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-exorcise');
  grunt.loadNpmTasks('grunt-execute');

  // Default task(s).
  grunt.registerTask('default', [
    //'browserify:dist',
    //'exorcise:dist',
    'execute:dist'
  ]);

};
