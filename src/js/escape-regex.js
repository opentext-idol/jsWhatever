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
