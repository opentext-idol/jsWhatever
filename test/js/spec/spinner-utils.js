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

define([
    'jquery',
    'js-whatever/js/spinner-utils',
    'jasmine-jquery'
], function($, spinnerUtils) {
    'use strict';

    describe('Spinner Utils', function() {

        it('should remove the given classes and add the spinner classes when enabling the spinner', function() {
            var $element = $('<div class="foo"></div>');

            spinnerUtils.enableSpinner($element, 'foo');

            expect($element).toHaveClass('icon-spin');
            expect($element).toHaveClass('icon-spinner');
            expect($element).not.toHaveClass('foo');
        });

        it('should remove the spinner classes and add the given pinner classes when disabling the spinner', function() {
            var $element = $('<div class="icon-spin icon-spinner"></div>');

            spinnerUtils.disableSpinner($element, 'foo');

            expect($element).not.toHaveClass('icon-spin');
            expect($element).not.toHaveClass('icon-spinner');
            expect($element).toHaveClass('foo');
        });
    });
});
