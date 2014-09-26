define(function() {
    require.config({
        baseUrl: '.',
        paths: {
            // lib
            backbone: 'bower_components/backbone/backbone',
            bootstrap: 'bower_components/bootstrap/js/bootstrap',
            'jasmine-jquery': 'bower_components/jasmine-jquery/lib/jasmine-jquery',
            'jasmine-sinon': 'bower_components/jasmine-sinon/lib/jasmine-sinon',
            jquery: 'bower_components/jquery/jquery',
            'jquery-steps': 'bower_components/jquery-steps/build/jquery.steps',
            sinon: 'bower_components/sinon/index',
            text: 'bower_components/requirejs-text/text',
            underscore: 'bower_components/underscore/underscore',

            //dir
            test: 'src/test/js',

            // mock
            store: 'src/test/js/mock/store',
            jqueryui: 'src/test/js/mock/lib/jquery-ui'
        },
        shim: {
            backbone: {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            bootstrap: {
                deps: ['jquery']
            },
            'jquery-steps': {
                deps: ['jquery']
            },
            underscore: {
                exports: '_'
            }
        },
        // the jasmine grunt plugin loads all files based on their paths on disk
        // this breaks imports beginning in real or js-utils
        // map here fixes it
        // list mocks here, not above
        map: {
            '*': {
                'js-utils': 'src/main/exports/javascript-utils',
                'js-utils/js/regex-replace': 'src/test/js/mock/regex-replace',
                'real': 'src/main/exports/javascript-utils'
            }
        }
    });
});