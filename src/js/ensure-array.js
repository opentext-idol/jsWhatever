/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
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
