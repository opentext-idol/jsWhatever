define([
    'js-utils/js/escape-regex'
], function (escapeRegex) {
    describe('Utility: escapeRegex', function () {

        it('should escape alternation operator', function () {
            var reg = new RegExp(escapeRegex('a|b'), 'i');
            expect(reg.test('cat')).toBeFalsy();
            expect(reg.test('a|b')).toBeTruthy();
            expect(reg.test('asdva|basdvasd')).toBeTruthy();
        });

        it('should escape correctly', function () {
            var chars = '\\^$*+-?.(){}[]|';
            var charsList = chars.split('');
            _.times(255, function (code) {
                var char = String.fromCharCode(code);
                if (_.contains(charsList, char)) {
                    expect(escapeRegex(char)).toBe('\\' + char);
                } else {
                    expect(escapeRegex(char)).toBe(char);
                }
            })
        });

        it('should not break on unicode', function () {
            var char = '\u263A';
            expect(escapeRegex(char)).toBe(char);
        });
    });
});