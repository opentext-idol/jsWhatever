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

            expect($element).toHaveClass('glyphicon');
            expect($element).toHaveClass('glyphicon-spin');
            expect($element).toHaveClass('glyphicon-spinner');
            expect($element).not.toHaveClass('foo');
        });

        it('should remove the spinner classes and add the given pinner classes when disabling the spinner', function() {
            var $element = $('<div class="glyphicon glyphicon-spin glyphicon-spinner"></div>');

            spinnerUtils.disableSpinner($element, 'foo');

            expect($element).not.toHaveClass('glyphicon');
            expect($element).not.toHaveClass('glyphicon-spin');
            expect($element).not.toHaveClass('glyphicon-spinner');
            expect($element).toHaveClass('foo');
        });
    });
});
