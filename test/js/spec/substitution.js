/*
 * (c) Copyright 2013-2017 Micro Focus or one of its affiliates.
 *
 * Licensed under the MIT License (the "License"); you may not use this file
 * except in compliance with the License.
 *
 * The only warranties for products and services of Micro Focus and its affiliates
 * and licensors ("Micro Focus") are as may be set forth in the express warranty
 * statements accompanying such products and services. Nothing herein should be
 * construed as constituting an additional warranty. Micro Focus shall not be
 * liable for technical or editorial errors or omissions contained herein. The
 * information contained herein is subject to change without notice.
 */

define([
    'js-whatever/js/substitution'
], function(substitution) {
    'use strict';

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
