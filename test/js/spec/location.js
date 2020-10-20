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
    'js-whatever/js/location'
], function(location) {
    'use strict';

    describe('Utility: `Location`', function() {
        it('should retrieve the correct host', function() {
            expect(location.host()).toBe(window.location.host);
        });

        it('should retrieve the correct hostname', function() {
            expect(location.hostname()).toBe(window.location.hostname);
        });

        it('should retrieve the correct pathname', function() {
            expect(location.pathname()).toBe(window.location.pathname);
        });

        it('should retrieve the correct port', function() {
            expect(location.port()).toBe(window.location.port);
        });

        it('should retrieve the correct protocol', function() {
            expect(location.protocol()).toBe(window.location.protocol);
        });

        it('should retrieve the correct search', function() {
            expect(location.search()).toBe(window.location.search);
        });
    });
});
