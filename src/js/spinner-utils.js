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
 * @module js-whatever/js/spinner-utils
 * @desc Utility functions for dealing with spinner classes
 */
define(function() {
    'use strict';

    var spinnerClasses = 'icon-spinner icon-spin';

    //noinspection UnnecessaryLocalVariableJS
    /**
     * @alias module:js-whatever/js/spinner-utils
     * @type {{enableSpinner: Function, disableSpinner: Function}}
     */
    var spinnerUtils = {
        /**
         * @desc Removes the given CSS classes from $element and applies the classes icon-spinner and icon-spin
         * @param {jQuery} $element
         * @param {string} classesToRemove The CSS classes to remove
         */
        enableSpinner: function($element, classesToRemove) {
            $element.removeClass(classesToRemove).addClass(spinnerClasses);
        },

        /**
         * @desc Adds the given CSS classes to $element and removes the classes icon-spinner and icon-spin
         * @param {jQuery} $element
         * @param {string} classesToAdd The CSS classes to add
         */
        disableSpinner: function($element, classesToAdd) {
            $element.removeClass(spinnerClasses).addClass(classesToAdd);
        }
    };

    return spinnerUtils;
});
