/*
 * Copyright 2013-2017 Open Text.
 *
 * Licensed under the MIT License (the "License"); you may not use this file
 * except in compliance with the License.
 *
 * The only warranties for products and services of Open Text and its affiliates
 * and licensors ("Open Text") are as may be set forth in the express warranty
 * statements accompanying such products and services. Nothing herein should be
 * construed as constituting an additional warranty. Open Text shall not be
 * liable for technical or editorial errors or omissions contained herein. The
 * information contained herein is subject to change without notice.
 */

define(function() {
    'use strict';

    require.config({
        baseUrl: '.',
        paths: {
            // lib
            backbone: 'node_modules/backbone/backbone',
            bootstrap: 'node_modules/bootstrap/dist/js/bootstrap',
            'jasmine-jquery': 'node_modules/jasmine-jquery/lib/jasmine-jquery',
            'jasmine-sinon': 'node_modules/jasmine-sinon/lib/jasmine-sinon',
            jquery: 'node_modules/jquery/dist/jquery',
            'jquery-steps': 'node_modules/jquery-steps/build/jquery.steps',
            'js-testing': 'node_modules/hp-autonomy-js-testing-utils/src/js',
            sinon: 'node_modules/sinon/lib/sinon',
            text: 'node_modules/requirejs-text/text',
            underscore: 'node_modules/underscore/underscore',

            //dir
            test: 'test/js',

            // mock
            store: 'node_modules/hp-autonomy-js-testing-utils/src/js/store',
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
                deps: ['sinon']
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
                'real': 'src'
            }
        }
    });
});
