/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/location'
], function (location) {

    describe('Utility: `Location`', function () {
        it('should retrieve the correct host', function () {
            expect(location.host()).toBe(window.location.host);
        });

        it('should retrieve the correct hostname', function () {
            expect(location.hostname()).toBe(window.location.hostname);
        });

        it('should retrieve the correct pathname', function () {
            expect(location.pathname()).toBe(window.location.pathname);
        });

        it('should retrieve the correct port', function () {
            expect(location.port()).toBe(window.location.port);
        });

        it('should retrieve the correct protocol', function () {
            expect(location.protocol()).toBe(window.location.protocol);
        });

        it('should retrieve the correct search', function () {
            expect(location.search()).toBe(window.location.search);
        });
    });
});