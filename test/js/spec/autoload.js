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
    'js-whatever/js/autoload'
], function(Autoload) {
    'use strict';

    return describe('Autoload model', function() {
        it('should throw an exception if we try to create an instance', function() {
            expect(function() {
                new Autoload()
            }).toThrow();
        })
    });
});
