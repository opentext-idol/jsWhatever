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

define([
    'underscore',
    'js-whatever/js/escape-regex'
], function(_, escapeRegex) {
    'use strict';

    describe('Utility: escapeRegex', function() {
        it('should escape alternation operator', function() {
            var reg = new RegExp(escapeRegex('a|b'), 'i');

            expect(reg.test('cat')).toBeFalsy();
            expect(reg.test('a|b')).toBeTruthy();
            expect(reg.test('asdva|basdvasd')).toBeTruthy();
        });

        it('should escape correctly', function() {
            var chars = '\\^$*+-?.(){}[]|';
            var charsList = chars.split('');

            _.times(255, function(code) {
                var character = String.fromCharCode(code);
                if(_.contains(charsList, character)) {
                    expect(escapeRegex(character)).toBe('\\' + character);
                } else {
                    expect(escapeRegex(character)).toBe(character);
                }
            })
        });

        it('should not break on unicode', function() {
            var character = '\u263A';
            expect(escapeRegex(character)).toBe(character);
        });
    });
});
