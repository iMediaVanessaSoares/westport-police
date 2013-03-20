'use strict';

module.exports = function(grunt) {

  //Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
          'Gruntfile.js',
          'webapp/js/controllers/*.js',
          'webapp/js/models/*.js',
          'webapp/js/views/*.js',
          '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    coffee: {
        options: {
            bare: true
        },

        index: {
            files: {
                'webapp/js/controllers/index.js' : [
                    'coffeescript/controllers/*.coffee'
                ]
            }
        },

        rubyHaml: {
            glob_to_multiple: {
                expand: true,
                cwd: 'haml/',
                src: ['*.haml'],
                dest: 'webapp/',
                ext: '.html'
            }
        },
        glob_to_multiple: {
            expand: true,
            cwd: 'coffee/',
            src: ['*.coffee','controllers/*.coffee','models/*.coffee','views/*.coffee'],
            dest: 'webapp/js/',
            ext: '.js'
        }
    },

    sass: {
        glob_to_multiple: {
            expand: true,
            cwd: 'sass/',
            src: ['base/*.scss','layout/*.scss','module/*.scss','theme/*.scss'],
            dest: 'webapp/css/',
            ext: '.css'
        }
    },

    rubyHaml: {

        glob_to_multiple: {
            expand: true,
            cwd: 'haml/',
            src: ['*.haml'],
            dest: 'webapp/',
            ext: '.html',
        },
        options: {
            templatize: false
        }

    },

    nodeunit: {
        tests: ['webapp/js/controllers/*.js']
    },

    //Watch
    watch: {
      all: {
          files: ['<%= jshint.all %>'],
          tasks: ['jshint', 'nodeunit'],
          options: {interupt: true}
      },
      coffeesrc: {
          files: ['coffeescript/**/*.coffee'],
          tasks: ['coffee','rubyHaml']
      },
      haml: {
          files: ['haml/**/*.haml'],
          tasks: ['rubyHaml']
      },
      sass: {
          files: ['sass/**/*.scss'],
          tasks: ['sass']
      }
    }
  });

  grunt.loadTasks('grunt-tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-ruby-haml');

  grunt.registerTask('test', [
    'coffee',
    'sass',
    'jshint',
    'rubyHaml'
  ]);
  grunt.registerTask('default', ['test']);

};

