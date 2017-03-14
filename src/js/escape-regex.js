/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

/**
 * @module js-whatever/js/escape-regex
 */
define(function() {
    'use strict';

    /**
     * @alias module:js-whatever/js/escape-regex
     * @desc Escapes regular expression characters in strings to allow them to be used with new RegExp()
     * @param {string} str The string to escape
     * @returns {string} The input string with regular expression characters escaped
     */
    function escapeRegex(str) {
        return str.replace(/([\\^$*+\-?.(){}[\]|])/g, '\\$1');
    }

    return escapeRegex;
});
