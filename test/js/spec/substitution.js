/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/substitution'
], function(substitution) {

    describe('i18n substitution', function() {

        it('should leave strings without placeholders unchanged', function() {
            var input = { key: 'value' };

            expect(substitution(input)).toEqual(input);
        });

        it('should transform single placeholders', function() {
            var input = { key: 'The following will be replaced: {0}' };
            var output = substitution(input);

            expect(output.key(42)).toEqual('The following will be replaced: 42');
        });

        it('should transform multiple placeholders', function() {
            var input = { key: 'The following will be replaced: {1}, {0}' };
            var output = substitution(input);

            expect(output.key(42, 56)).toEqual('The following will be replaced: 56, 42');
        });

        it('should transform multiple references to the same placeholder', function() {
            var input = { key: 'The following will be replaced: {0}, {0}' };
            var output = substitution(input);

            expect(output.key(42)).toEqual('The following will be replaced: 42, 42');
        });

    });

});