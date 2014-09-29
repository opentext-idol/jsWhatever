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
        browser: true
        camelcase: true
        curly: true
        devel: true
        eqeqeq: true
        es3: true
        expr: true
        forin: true
        freeze: true
        jquery: true
        latedef: true
        newcap: true
        noarg: true
        noempty: true
        nonbsp: true
        undef: true
        unused: true
        globals:
          define: false
          _: false
          expect: false
          it: false
          require: false
          describe: false
          sinon: false
          beforeEach: false
          afterEach: false
          jasmine: false
          runs: false
          waits: false
          waitsFor: false
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
