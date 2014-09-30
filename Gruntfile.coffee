module.exports = (grunt) ->
  jasmineRequireTemplate = require 'grunt-template-jasmine-requirejs'
  jasmineIstanbulTemplate = require 'grunt-template-jasmine-istanbul'

  jasmineSpecRunner = 'spec-runner.html'
  coverageSpecRunner = 'coverage-runner.html'

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    build:
      src: 'src'
      dest: 'build'
    clean: [
      jasmineSpecRunner
      coverageSpecRunner
      'bin'
      'build'
      '.grunt'
    ]
    connect:
      test:
        options:
          port: 8000
      coverage:
        options:
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
          template: jasmineRequireTemplate
          templateOptions:
            requireConfigFile: 'src/test/js/js-test-require-config.js'
      coverage:
        src: 'src/main/exports/javascript-utils/js/**/*.js'
        options:
          host: 'http://localhost:8000/'
          keepRunner: true
          outfile: coverageSpecRunner
          specs: 'src/test/js/spec/**/*.js'
          styles: 'src/test/css/bootstrap-stub.css'
          template: jasmineIstanbulTemplate
          templateOptions:
            coverage: 'bin/coverage/coverage.json'
            replace: false
            report:
              type: 'text'
            template: jasmineRequireTemplate
            templateOptions:
              requireConfigFile: 'src/test/js/js-test-require-config.js'
              requireConfig:
                config:
                  instrumented: {
                    src: grunt.file.expand('src/main/exports/javascript-utils/js/**/*.js')
                  }
                callback: () ->
                  define('instrumented', ['module'], (module) ->
                    module.config().src
                  )
                  require ['instrumented'], (instrumented) ->
                    oldLoad = requirejs.load
                    requirejs.load = (context, moduleName, url) ->
                      if url.substring(0, 1) == '/'
                        url = url.substring 1
                      else if url.substring(0, 2) == './'
                        url = url.substring 2

                      # redirect
                      if instrumented.indexOf(url) > -1
                        url = './.grunt/grunt-contrib-jasmine/' + url;

                      return oldLoad.apply(this, [context, moduleName, url]);
                    return
                  return

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
  grunt.registerTask 'coverage', ['connect:coverage', 'jasmine:coverage']
  grunt.registerTask 'lint', ['jshint', 'coffeelint']
