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
 * @module js-whatever/js/discrete-plural
 */
define(function() {
    'use strict';

    /**
     * @typedef DiscretePluralFunction
     * @type {function}
     * @param {number} count The number of items
     * @returns {string} The empty string for non-integer numbers. The singular string for the numbers 1 and -1. The
     * plural string for all other numbers.
     */
    /**
     * @alias module:js-whatever/js/discrete-plural
     * @desc Generates a function which returns a pluralised form for a given number of items
     * @param {string} singular The singular form of the string
     * @param {string} plural The plural form of the string
     * @returns {DiscretePluralFunction} The DiscretePluralFunction for the two strings
     * @example
     * var pluralFunction = discretePlural('kitten', 'kittens');
     *
     * pluralFunction(1); // returns '1 kitten'
     * pluralFunction(-1); // returns '-1 kitten'
     * pluralFunction(3); // returns '3 kittens'
     * pluralFunction(1.5); //returns ''
     */
    function discretePlural(singular, plural) {
        return function(count) {
            if((count % 1) !== 0) {
                // prevents printing of fractional documents on flot axes
                return '';
            }
            return count + (count === 1 || count === -1
                    ? ' ' + singular
                    : ' ' + plural);
        };
    }

    return discretePlural;
});
