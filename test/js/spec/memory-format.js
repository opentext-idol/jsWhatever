/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/memory-format'
], function(memoryFormat) {
    'use strict';

    describe('Utility: memoryFormat', function() {
        it('10 bytes', function() {
            expect(memoryFormat(10)).toEqual('10 B');
        });

        it('-10 bytes', function() {
            expect(memoryFormat(-10)).toEqual('-10 B');
        });

        it('1KB', function() {
            expect(memoryFormat(1024)).toEqual('1.0 KB');
        });

        it('-1.77KB', function() {
            expect(memoryFormat(-1.77 * 1024)).toEqual('-1.8 KB');
        });

        it('512.123MB', function() {
            expect(memoryFormat(512.123 * 1048576)).toEqual('512.1 MB');
        });

        it('-512MB', function() {
            expect(memoryFormat(-512 * 1048576)).toEqual('-512.0 MB');
        });

        it('1.99GB', function() {
            expect(memoryFormat(1.99 * 1073741824)).toEqual('2.0 GB');
        });

        it('-99.97GB', function() {
            expect(memoryFormat(-99.97 * 1073741824)).toEqual('-100.0 GB');
        });

        it('55.3TB', function() {
            expect(memoryFormat(55.3 * 1099511627776)).toEqual('55.3 TB');
        });

        it('-1.36TB', function() {
            expect(memoryFormat(-1.36 * 1099511627776)).toEqual('-1.4 TB');
        });

        it('0 bytes', function() {
            expect(memoryFormat(0)).toEqual('0 B');
        });

        it('-0 bytes', function() {
            expect(memoryFormat(-0)).toEqual('0 B');
        });

        it('scaler', function() {
            expect(memoryFormat(-1.36, 1099511627776)).toEqual('-1.4 TB');
        });

        it('Infinite', function() {
            expect(memoryFormat(Infinity)).toEqual('Infinity');
        });

        it('-Infinite', function() {
            expect(memoryFormat(-Infinity)).toEqual('-Infinity');
        });

        it('excessively large scaled numbers', function() {
            expect(memoryFormat(Number.MAX_VALUE, Number.MAX_VALUE)).toEqual('Infinity');
        });

        it('NaN', function() {
            expect(memoryFormat(NaN)).toEqual('NaN');
        });
    })
});
