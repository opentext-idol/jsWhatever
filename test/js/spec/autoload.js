define([
    'js-whatever/js/autoload'
], function(Autoload) {

    return describe('Autoload model', function() {

        it('should throw an exception if we try to create an instance', function() {
            expect(function() {
                new Autoload()
            }).toThrow();
        })
    });
});