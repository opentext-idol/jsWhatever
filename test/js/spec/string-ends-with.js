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
    'js-whatever/js/string-ends-with'
], function(_) {
    'use strict';

    describe('Utility: stringEndsWith `_.endsWith` underscore mixin', function() {
        it('should return false for inappropriate input', function() {
            expect(_.endsWith(undefined, ['fail', 'demo'])).toBe(false);
            expect(_.endsWith(null, ['demo', 'fail'])).toBe(false);
            expect(_.endsWith(NaN, ['demo', 'fail'])).toBe(false);
            expect(_.endsWith(0, ['fail'])).toBe(false);
            expect(_.endsWith(123, ['fail'])).toBe(false);
            expect(_.endsWith(false, ['fail'])).toBe(false);
            expect(_.endsWith(true, ['fail'])).toBe(false);
            expect(_.endsWith('demo', undefined)).toBe(false);
            expect(_.endsWith('demo', null)).toBe(false);
        });

        describe('for valid input', function() {
            it('should match as expected for singletons', function() {
                expect(_.endsWith('demo', ['demo'])).toBe(true);
                expect(_.endsWith('demo', ['emo'])).toBe(true);
                expect(_.endsWith('demo', ['o'])).toBe(true);
                expect(_.endsWith('demo', [''])).toBe(true);
                expect(_.endsWith('d', ['d'])).toBe(true);
                expect(_.endsWith('d', [''])).toBe(true);
                expect(_.endsWith('', [''])).toBe(true);
                expect(_.endsWith(' ', ['demo'])).toBe(false);
                expect(_.endsWith('dem', ['demo'])).toBe(false);
                expect(_.endsWith('deMo', ['Demo'])).toBe(false);
            });

            it('should match as expected for single values', function() {
                expect(_.endsWith('demo', 'demo')).toBe(true);
                expect(_.endsWith('demo', 'emo')).toBe(true);
                expect(_.endsWith('demo', 'o')).toBe(true);
                expect(_.endsWith('demo', '')).toBe(true);
                expect(_.endsWith('d', 'd')).toBe(true);
                expect(_.endsWith('d', '')).toBe(true);
                expect(_.endsWith('', '')).toBe(true);
                expect(_.endsWith(' ', 'demo')).toBe(false);
                expect(_.endsWith('dem', 'demo')).toBe(false);
                expect(_.endsWith('deMo', 'Demo')).toBe(false);
            });

            it('should match as expected for lists of values in which some fail', function() {
                expect(_.endsWith('demo', ['fail', 'demo'])).toBe(true);
                expect(_.endsWith('demo', ['demo', 'fail'])).toBe(true);
                expect(_.endsWith('demo', ['fail'])).toBe(false);
                expect(_.endsWith('demo', [])).toBe(false);
            });
        });
    });
});
