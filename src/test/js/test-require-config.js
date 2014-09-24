define(function() {
    require.config({
        paths: {
            // lib
            backbone: '/src/main/lib/backbone/backbone',
            bootstrap: '/src/main/lib/bootstrap/js/bootstrap',
            text: '/src/main/lib/require/text',

            //dir
            'js-utils': '/src/main/exports/javascript-utils',
            real: '/src/main/exports/javascript-utils',
            test: '/test',

            // mock
            store: '/test/mock/store',
            'js-utils/js/regex-replace': '/test/mock/regex-replace',
            jqueryui: '/test/mock/lib/jquery-ui'
        },
        shim: {
            backbone: {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            }
        }
    });
});