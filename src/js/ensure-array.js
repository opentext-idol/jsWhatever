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
 * @module js-whatever/js/ensure-array
 */
define([
    'underscore'
], function(_) {
    'use strict';

    /**
     * @alias module:js-whatever/js/ensure-array
     * @desc Function which ensures an array is present. Useful for dealing with the results of JSON serialized
     * using the Badgerfish convention
     * @param {*} value Value to ensure is an array
     * @returns {Array} value if value is an array, a singleton array containing value for truthy values, and the
     * empty array for falsy values
     */
    function ensureArray(value) {
        return _.isArray(value)
            ? value
            : (value ? [value] : []);
    }

    return ensureArray;
});
