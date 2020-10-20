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
    'js-whatever/js/discrete-plural'
], function(discretePlural) {
    'use strict';

    describe('Discrete plural', function() {
        beforeEach(function() {
            this.plural = discretePlural('kitten', 'kittens');
        });

        it('should return empty labels for non integer numbers', function() {
            expect(this.plural(0.5)).toEqual('');
        });

        it('should return the singular label for 1 item', function() {
            expect(this.plural(1)).toEqual('1 kitten');
        });

        it('should return the singular label for -1 items', function() {
            expect(this.plural(-1)).toEqual('-1 kitten');
        });

        it('should return the plural label for other numbers of items', function() {
            expect(this.plural(2)).toEqual('2 kittens');
            expect(this.plural(-2)).toEqual('-2 kittens');
        });
    });
});
