/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'underscore',
    'js-whatever/js/ensure-array'
], function(_, ensureArray) {
    'use strict';

    describe('Utility: Ensure Array', function() {
        describe('should have appropriate output for input of:', function() {
            it('undefined', function() {
                expect(ensureArray()).toEqual([]);
            });

            it('null', function() {
                expect(ensureArray(null)).toEqual([]);
            });

            it('the empty object', function() {
                var obj = {};
                expect(ensureArray(obj)).toEqual([obj]);
            });

            it('array-like object', function() {
                var obj = {
                    length: 2,
                    splice: _.noop,
                    0: 'a', 1: 'b'
                };
                expect(ensureArray(obj)).toEqual([obj]);
            });

            it('the empty array', function() {
                expect(ensureArray([])).toEqual([]);
            });

            it('a non-empty array', function() {
                var arr = [1, 2, 3];
                expect(ensureArray(arr)).toEqual(arr);
            });
        });
    });
});
