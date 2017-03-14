/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
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
