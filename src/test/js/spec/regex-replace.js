define([
    'real/js/regex-replace',
    'underscore'
], function (regexReplace) {

    describe('Utility: regexReplace', function () {
        var nonGlobalReg = /[^]/;
        var globalReg = /[^]/g;
        var encase = function (left, right) {
            return function (value) {
                return [left, value, right].join('');
            };
        };

        it('should error when given invalid input', function () {

            expect(function () {
                regexReplace();
            }).toThrow();

            expect(function () {
                regexReplace(void 0, '', _.identity);
            }).toThrow();

            expect(function () {
                regexReplace(nonGlobalReg, '');
            }).toThrow();

            expect(function () {
                regexReplace(globalReg, '');
            }).toThrow();

            expect(function () {
                regexReplace(globalReg, '', _.identity);
            }).toThrow();

            expect(function () {
                regexReplace(globalReg, '', void 0, _.identity);
            }).toThrow();

            expect(function () {
                regexReplace(nonGlobalReg, '', _.identity, _.identity);
            }).toThrow();
        });


        it('should not error when given valid input', function () {
            expect(function () {
                regexReplace(globalReg, '', _.identity, _.identity);
            }).not.toThrow();
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