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

/**
 * @module js-whatever/js/escape-hod-identifier
 */
define(function() {
    'use strict';

    var regExp = /([\\:])/g;

    //noinspection UnnecessaryLocalVariableJS
    /**
     * @alias module:js-whatever/js/escape-hod-identifier
     * @desc Escape colons in HOD identifiers. HOD identifiers (domain names, application names, index names etc) can be
     * concatenated with colons. In these cases, : must become \: and \ must become \\.
     * @param {string} input The input string
     * @return {string} The escaped string
     */
    function escapeHodIdentifier(input) {
        return input.replace(regExp, '\\$&');
    }

    return escapeHodIdentifier;
});
