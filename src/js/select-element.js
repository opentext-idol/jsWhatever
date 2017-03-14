/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

/**
 * @module js-whatever/js/select-element
 */
define([
    'jquery'
], function($) {
    'use strict';

    /**
     * @alias module:js-whatever/js/select-element
     * @desc Selects the text content of an element, allowing users to copy it to the clipboard. Works in all
     * browsers
     * @param {string|jQuery} selector The element to obtain the text of
     * @returns {boolean} True if the selection succeeded, false if the selection failed
     */
    function selectElement(selector) {
        var el = $(selector);

        if(!el.length) {
            return false;
        }

        // Browser other than IE < 9
        if(window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
            var range = document.createRange();
            range.selectNodeContents(el[0]);
            sel.addRange(range);
            return true;
        } else if(document.selection) { // IE < 9
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el[0]);
            textRange.select();
            return true;
        }

        return false;
    }

    return selectElement;
});
