define([
    'js-utils/js/ensure-array'
], function (ensureArray) {

    describe('Utility: Ensure Array', function () {
        describe('should have appropriate output for input of:', function () {
            it('undefined', function () {
                expect(ensureArray()).toEqual([]);
            });

            it('null', function () {
                expect(ensureArray(null)).toEqual([]);
            });

            it('the empty object', function () {
                var obj = {};
                expect(ensureArray(obj)).toEqual([obj]);
            });

            it('array-like object', function () {
                var obj = { length: 2, splice: function () {}, 0: 'a', 1: 'b' };
                expect(ensureArray(obj)).toEqual([obj]);
            });

            it('the empty array', function () {
                expect(ensureArray([])).toEqual([]);
            });

            it('a non-empty array', function () {
                var arr = [1, 2, 3];
                expect(ensureArray(arr)).toEqual(arr);
            });
        });
    });
});