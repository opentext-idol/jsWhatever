/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/autoload'
], function(Autoload) {
    'use strict';

    return describe('Autoload model', function() {
        it('should throw an exception if we try to create an instance', function() {
            expect(function() {
                new Autoload()
            }).toThrow();
        })
    });
});
