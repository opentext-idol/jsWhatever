module.exports = (grunt) ->

  jasmineSpecRunner = 'spec-runner.html'

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    build:
      src: 'src'
      dest: 'build'
    clean: [
      jasmineSpecRunner
      'build'
    ]
    connect:
      test:
        port: 8000
    jasmine:
      test:
        src: 'src/main/exports/javascript-utils/js/**/*.js'
        options:
          host: 'http://localhost:8000/'
          keepRunner: true
          outfile: jasmineSpecRunner
          specs: 'src/test/js/spec/**/*.js'
          styles: 'src/test/css/bootstrap-stub.css'
          template: require 'grunt-template-jasmine-requirejs'
          templateOptions:
            requireConfigFile: 'src/test/js/js-test-require-config.js'
    jshint:
      all: [
        'src/main/exports/javascript-utils/js/**/*.js'
        'src/test/js/mock/*.js'
        'src/test/js/spec/*.js'
        'src/test/js/*.js'
      ],
      options:
        asi: true
        bitwise: true
        curly: true
        expr: true
    coffeelint:
      app: [
        'Gruntfile.coffee'
      ]

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-coffeelint'

  grunt.registerTask 'default', 'test'
  grunt.registerTask 'test', ['connect', 'jasmine']
  grunt.registerTask 'lint', ['jshint', 'coffeelint']
