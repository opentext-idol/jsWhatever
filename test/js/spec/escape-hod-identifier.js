/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/escape-hod-identifier'
], function(escapeHodIdentifier) {

    function testEscape(input, output) {
        expect(escapeHodIdentifier(input)).toEqual(output);
    }

    describe('Escape HOD identifier', function() {
        it('escapes a string without special characters', function() {
            testEscape('cat', 'cat');
        });

        it('escapes a string with one colon', function() {
            testEscape('animal:cat', 'animal\\:cat');
        });

        it('escapes a string with two colons', function() {
            testEscape('animal:chordates:cat', 'animal\\:chordates\\:cat');
        });

        it('escapes a string with two adjacent colons', function() {
            testEscape('std::array', 'std\\:\\:array');
        });

        it('escapes a string with one backslash', function() {
            testEscape('home\\matthew', 'home\\\\matthew');
        });

        it('escapes a string with two backslashes', function() {
            testEscape('\\home\\matthew', '\\\\home\\\\matthew');
        });

        it('escapes a string with two adjacent backslashes', function() {
            testEscape('\\\\', '\\\\\\\\');
        });

        it('escapes a string with one colon and one backslash', function() {
            testEscape('here is a colon : and here is a backslash \\', 'here is a colon \\: and here is a backslash \\\\');
        });

        it('escapes a string with many colons and backslashes', function() {
            testEscape('\\:aaaaaaa\\\\::colons::::', '\\\\\\:aaaaaaa\\\\\\\\\\:\\:colons\\:\\:\\:\\:');
        });
        
        it('escapes a string with different cases', function() {
            testEscape('FunKY\\:CaSE', 'FunKY\\\\\\:CaSE');
        });

        it('escapes a string with non-latin characters', function() {
            testEscape('?\\?:??', '?\\\\?\\:??');
        });
    });

});
