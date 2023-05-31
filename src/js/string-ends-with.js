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
 * @module js-whatever/js/string-ends-with
 */
define([
    'underscore'
], function(_) {
    'use strict';

    _.mixin({
        /**
         * @desc Tests if the given string ends with any of the given suffices. Provided as an underscore mixin
         * @param {string} string The string to test
         * @param {string|String[]} suffices The suffices to test for
         * @returns {boolean} true if the given string ends with any of the given suffices, false otherwise
         * @example
         * _.endsWith('hello world', 'world'); // returns true
         * _.endsWith('hello world', 'hello'); // returns false
         * _.endsWith('hello world', ['hello', 'world']); // returns true
         */
        endsWith: function(string, suffices) {
            if(_.isString(string) && (_.isArray(suffices) || _.isString(suffices))) {
                var length = string.length;

                if(!_.isArray(suffices)) {
                    suffices = [suffices];
                }

                return _.some(suffices, function(suffix) {
                    return string.indexOf(suffix, length - suffix.length) !== -1;
                });
            }

            return false;
        }
    });
});
