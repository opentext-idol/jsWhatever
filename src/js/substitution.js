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
 * @module js-whatever/js/substitution
 */
define([
    'underscore'
], function(_) {
    'use strict';

    /**
     * @alias module:js-whatever/js/substitution
     * @desc Interpolates placeholders of the form {n} in strings, turning the strings into functions and allowing
     * arguments to be passed in to hide string concatenation
     * @param {object} i18n Object containing strings to interpolate
     * @returns {object} A copy of i18n where the strings containing the interpolation pattern have become functions
     * @example
     * var i18n = {
     *     foo: 'Substitution {0}, {1}'
     * };
     *
     * var substitutedI18n = substitution(i18n);
     *
     * substitutedI18n.foo('works', 'like this'); // returns 'Substitution works, like this'
     */
    function substitution(i18n) {
        var processed = {};

        var regex = /\{(\d+)\}/g;

        _.each(i18n, function(value, key) {
            var matches = value.match(regex);

            if(matches === null) {
                processed[key] = value;
            } else {
                processed[key] = function() {
                    var userArgs = arguments;

                    var finalValue = value;

                    _.each(matches, function(match) {
                        var number = Number(match.replace(/[\{\}]/g, ''));
                        var innerRegex = new RegExp(match.replace('{', '\\{').replace('}', '\\}'), 'g');
                        finalValue = finalValue.replace(innerRegex, userArgs[number]);
                    });

                    return finalValue;
                };
            }
        });

        return processed;
    }

    return substitution;
});
