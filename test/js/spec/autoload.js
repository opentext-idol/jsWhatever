/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/autoload'
], function(Autoload) {

    return describe('Autoload model', function() {

        it('should throw an exception if we try to create an instance', function() {
            expect(function() {
                new Autoload()
            }).toThrow();
        })
    });
});