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
    'js-whatever/js/ip-pad'
], function(ipPad) {
    'use strict';

    describe('IP Pad', function() {
        it('should leave falsy values unchanged', function() {
            expect(ipPad(undefined)).toBe(undefined);
            expect(ipPad(null)).toBe(null);
            expect(ipPad('')).toBe('');
        });

        it('should leave IPv4 addresses with 3 digits in each block unchanged', function() {
            expect(ipPad('255.255.255.255')).toBe('255.255.255.255');
        });

        it('should add leading zeroes to blocks in IPv4 addresses with fewer than 3 digits', function() {
            expect(ipPad('5.255.255.255')).toBe('005.255.255.255');
            expect(ipPad('255.5.255.255')).toBe('255.005.255.255');
            expect(ipPad('255.255.5.255')).toBe('255.255.005.255');
            expect(ipPad('255.255.255.5')).toBe('255.255.255.005');
        });

        it('should add leading zeroes to multiple blocks', function() {
            expect(ipPad('5.5.5.5')).toBe('005.005.005.005');
        });
    });
});
