/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define(function() {
    require.config({
        baseUrl: '.',
        paths: {
            // lib
            backbone: 'bower_components/backbone/backbone',
            bootstrap: 'bower_components/bootstrap/bootstrap/js/bootstrap',
            'jasmine-jquery': 'bower_components/jasmine-jquery/lib/jasmine-jquery',
            'jasmine-sinon': 'bower_components/jasmine-sinon/lib/jasmine-sinon',
            jquery: 'bower_components/jquery/jquery',
            'jquery-steps': 'bower_components/jquery-steps/build/jquery.steps',
            'js-testing': 'bower_components/hp-autonomy-js-testing-utils/src/js',
            sinon: 'bower_components/sinon/index',
            text: 'bower_components/requirejs-text/text',
            underscore: 'bower_components/underscore/underscore',

            //dir
            test: 'test/js',

            // mock
            store: 'bower_components/hp-autonomy-js-testing-utils/src/js/store',
            jqueryui: 'test/js/mock/lib/jquery-ui'
        },
        shim: {
            backbone: {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            bootstrap: {
                deps: ['jquery']
            },
            'jasmine-sinon': {
                deps:['sinon']
            },
            'jquery-steps': {
                deps: ['jquery']
            },
            sinon: {
                exports: 'sinon'
            },
            underscore: {
                exports: '_'
            }
        },
        // the jasmine grunt plugin loads all files based on their paths on disk
        // this breaks imports beginning in real or js-whatever
        // map here fixes it
        // list mocks here, not above
        map: {
            '*': {
                'js-whatever': 'src',
                'js-whatever/js/lazy-tab-view': 'test/mock/lazy-tab-view',
                'js-whatever/js/regex-replace': 'test/mock/regex-replace',
                'real': 'src'
            }
        }
    });
});