/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/duration-format'
], function(durationFormat) {
    'use strict';

    describe('Utility: durationFormat', function() {
        it('10ms', function() {
            expect(durationFormat(10)).toEqual('10.0ms')
        });

        it('10.12345ms', function() {
            expect(durationFormat(10.12345)).toEqual('10.1ms')
        });

        it('10.12345ms to 4 digits', function() {
            expect(durationFormat(10.12345, null, 4)).toEqual('10.1235ms')
        });

        it('-10.12345ms to 4 digits', function() {
            expect(durationFormat(-10.12345, null, 4)).toEqual('-10.1235ms')
        });

        it('30s', function() {
            expect(durationFormat(30e3)).toEqual('30.0s')
        });

        it('-1.1234s', function() {
            expect(durationFormat(-1234.5)).toEqual('-1.2s')
        });

        it('exactly 1 minute', function() {
            expect(durationFormat(60e3)).toEqual('1 min')
        });

        it('exactly -1 minute', function() {
            expect(durationFormat(-60e3)).toEqual('-1 min')
        });

        it('1.5 mins', function() {
            expect(durationFormat(60e3)).toEqual('1 min')
        });

        it('-1.2345 mins', function() {
            expect(durationFormat(-1.2345 * 60e3)).toEqual('-1.2 mins')
        });

        it('-1.2345 mins to 4 digits', function() {
            expect(durationFormat(-1.2345 * 60e3, null, 4)).toEqual('-1.2345 mins')
        });

        it('1 hour', function() {
            expect(durationFormat(3600e3)).toEqual('1 hour')
        });

        it('-1 hour', function() {
            expect(durationFormat(-3600e3)).toEqual('-1 hour')
        });

        it('19.44 hours', function() {
            expect(durationFormat(19.44 * 3600e3)).toEqual('19.4 hours')
        });

        it('-19.44 hours', function() {
            expect(durationFormat(-19.44 * 3600e3)).toEqual('-19.4 hours')
        });

        it('1 day', function() {
            expect(durationFormat(86400e3)).toEqual('1 day');
        });

        it('4.6 days', function() {
            expect(durationFormat(4.6 * 86400e3)).toEqual('4.6 days');
        });

        it('-4.6 days', function() {
            expect(durationFormat(-4.6 * 86400e3)).toEqual('-4.6 days');
        });

        it('zero', function() {
            expect(durationFormat(0)).toEqual('0.0ms')
        });

        it('negative zero', function() {
            expect(durationFormat(-0)).toEqual('0.0ms')
        });

        it('Infinity', function() {
            expect(durationFormat(Infinity)).toEqual('\u221e')
        });

        it('-Infinity', function() {
            expect(durationFormat(-Infinity)).toEqual('-\u221e')
        });

        it('NaN', function() {
            expect(durationFormat(NaN)).toEqual('NaN')
        });

        it('should accept a map of strings as an optional second argument and use them instead of the defaults', function() {
            var strings = {
                'duration.day': 'Yoda',
                'duration.short.minutes': 'artichokes'
            };

            expect(durationFormat(86400e3, strings)).toEqual('1 Yoda');
            expect(durationFormat(-1.2345 * 60e3, strings)).toEqual('-1.2 artichokes');
        });
    });
});
