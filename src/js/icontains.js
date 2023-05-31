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
 * @module js-whatever/js/icontains
 * @desc jQuery pseudo selector to test if an element contains a particular string, ignoring case
 * @example
 * // <div class="test">cats</div>
 *
 * var $test = $('.test');
 *
 * $test.filter(':icontains("cats")').length; // returns 1
 * $test.filter(':icontains("CATS")').length; // returns 1
 * $test.filter(':icontains("bears")').length; // returns 0
 */
define([
    'jquery'
], function($) {
    'use strict';

    $.expr[':'].icontains = $.expr.createPseudo(function(arg) {
        return function(elem) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });
});
