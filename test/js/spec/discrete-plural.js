/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/discrete-plural'
], function(discretePlural) {

    describe('Discrete plural', function() {

        beforeEach(function() {
            this.plural = discretePlural('kitten', 'kittens');
        });

        it('should return empty labels for non integer numbers', function() {
            expect(this.plural(0.5)).toBe('');
        });

        it('should return the singular label for 1 item', function() {
            expect(this.plural(1)).toBe('1 kitten');
        });

        it('should return the singular label for -1 items', function() {
            expect(this.plural(-1)).toBe('-1 kitten');
        });

        it('should return the plural label for other numbers of items', function() {
            expect(this.plural(2)).toBe('2 kittens');
            expect(this.plural(-2)).toBe('-2 kittens');
        });

    });

});