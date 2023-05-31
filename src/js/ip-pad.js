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

/**
 * @module js-whatever/js/ip-pad
 */
define(function() {
    'use strict';

    /**
     * @alias module:js-whatever/js/ip-pad
     * @desc Pads the components of an IPv4 address with leading zeros to allow them to be lexicographically sorted
     * @param {string} ip The IP address
     * @returns {string} The IP address with leading zeros
     * @example
     * ipPad('93.184.216.119'); // returns 093.184.216.119
     * ipPad('10.7.14.241'); // returns 010.007.014.241
     */
    function ipPad(ip) {
        return ip
            ? String(ip).replace(/\d+/g, function(num) {
                return '000'.slice(num.length) + num;
            })
            : ip;
    }

    return ipPad
});
