/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/hms-duration-format'
], function(durationFormat) {
    'use strict';

    describe('Utility: HMSDurationFormat', function() {
        it('30s', function() {
            expect(durationFormat(30)).toEqual('30s')
        });

        it('exactly 1 minute', function() {
            expect(durationFormat(60)).toEqual('1 min')
        });

        it('1 1/2 mins', function() {
            expect(durationFormat(90)).toEqual('1 min, 30s')
        });

        it('2 1/2 mins', function() {
            expect(durationFormat(150)).toEqual('2 mins, 30s')
        });

        it('1 hour', function() {
            expect(durationFormat(3600)).toEqual('1 hour')
        });

        it('2 hours', function() {
            expect(durationFormat(2 * 3600)).toEqual('2 hours')
        });

        it('1 day', function() {
            expect(durationFormat(3600 * 24)).toEqual('1 day')
        });

        it('2 days', function() {
            expect(durationFormat(2 * 24 * 3600)).toEqual('2 days')
        });

        it('should omit zero units', function() {
            expect(durationFormat(1246000)).toEqual('14 days, 10 hours, 6 mins, 40s')
        });

        it('zero', function() {
            expect(durationFormat(0)).toEqual('0s')
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

        it('should take a map of strings as an optional second argument and use them instead of the defaults', function() {
            var strings = {
                'duration.short.minute': 'swede',
                'duration.short.seconds': 'manglewurzels'
            };

            expect(durationFormat(90, strings)).toEqual('1 swede, 30manglewurzels');
        })
    });
});
