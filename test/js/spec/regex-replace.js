/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/regex-replace',
    'underscore'
], function (regexReplace, _) {

    var nonGlobalRegex = /[^]/;
    var globalRegex = /[^]/g;

    function encase(left, right) {
        return function(value) {
            return left + value + right;
        };
    }

    describe('regexReplace', function () {
        it('throws when given no arguments', function() {
            expect(function() {
                regexReplace();
            }).toThrow();
        });

        it('throws when called with no first argument', function() {
            expect(function() {
                regexReplace(undefined, '', _.identity);
            }).toThrow();
        });

        it('throws when called without a regex', function() {
            expect(function() {
                regexReplace(undefined, '', _.identity, _.identity);
            }).toThrow();
        });

        it('throws when called without a yes function', function() {
            expect(function() {
                regexReplace(globalRegex, '', undefined, _.identity);
            }).toThrow();
        });

        it('throws when called without a no function', function() {
            expect(function() {
                regexReplace(globalRegex, '', _.identity, undefined);
            }).toThrow();
        });

        it('throws when called with a non-global regex', function() {
            expect(function() {
                regexReplace(nonGlobalRegex, '', _.identity, _.identity);
            }).toThrow();
        });

        it('should not error when given valid input', function () {
            expect(function () {
                regexReplace(globalRegex, '', _.identity, _.identity);
            }).not.toThrow();
        });

        it('returns the empty string when text is the empty string', function() {
            expect(regexReplace(globalRegex, '', _.identity, _.identity)).toBe('');
        });

        describe('should correctly apply functions where appropriate', function () {
            it('for digit sequences', function () {
                var digits = encase('[digits:', ']');
                var notDigits = encase('<not-digits:', '>');
                var pattern = /\d+/g;
                var input = 'abc123def456ghi789';
                var output = '<not-digits:abc>[digits:123]<not-digits:def>[digits:456]<not-digits:ghi>[digits:789]';
                expect(regexReplace(pattern, input, digits, notDigits)).toBe(output);
            });

            it('for pattern with alternation', function () {
                var cat = encase('<', '>');
                var other = encase('[other:', ']');
                var pattern = /ca+t|do+g/g;
                var input = 'abcaat12cadooooga36caaaat';
                var output = '[other:ab]<caat>[other:12ca]<doooog>[other:a36]<caaaat>';
                expect(regexReplace(pattern, input, cat, other)).toBe(output);
            });

            it('for pattern with groups', function () {
                var cat = function (value, group) { return '<cat ' + group.length + ' a\'s>'; };
                var other = encase('[other:', ']');
                var pattern = /c(a+)t/g;
                var input = 'abcaat12cadooooga36caaaat';
                var output = '[other:ab]<cat 2 a\'s>[other:12cadooooga36]<cat 4 a\'s>';
                expect(regexReplace(pattern, input, cat, other)).toBe(output);
            });

            it('for full pattern match', function () {
                var match = encase('{', '}');
                var other = encase('[oops:', ']');
                var pattern = /\d+/g;
                var input = '0123456789';
                var output = '{0123456789}';
                expect(regexReplace(pattern, input, match, other)).toBe(output);
            });

            it('for full separated pattern matches', function () {
                var match = encase('{', '}');
                var other = encase('[oops:', ']');
                var pattern = /\d/g;
                var input = '0123456789';
                var output = '{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}';
                expect(regexReplace(pattern, input, match, other)).toBe(output);
            });

            it('for no pattern match', function () {
                var match = encase('[oops:', ']');
                var other = encase('{', '}');
                var pattern = /\d/g;
                var input = 'abcdefghijklmnopqrstuvwxyz';
                var output = '{abcdefghijklmnopqrstuvwxyz}';
                expect(regexReplace(pattern, input, match, other)).toBe(output);
            });
        });
    });

});
