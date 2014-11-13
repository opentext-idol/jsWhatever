define([
    'js-whatever/js/spinner-utils',
    'jasmine-jquery'
], function(spinnerUtils) {

    describe('Spinner Utils', function() {

        it('should remove the given classes and add the spinner classes when enabling the spinner', function() {
            var $element = $('<div class="foo"></div>');

            spinnerUtils.enableSpinner($element, 'foo');

            expect($element).toHaveClass('icon-spin');
            expect($element).toHaveClass('icon-spinner');
            expect($element).not.toHaveClass('foo');
        });

        it('should remove the spinner classes and add the given pinner classes when disabling the spinner', function() {
            var $element = $('<div class="icon-spin icon-spinner"></div>');

            spinnerUtils.disableSpinner($element, 'foo');

            expect($element).not.toHaveClass('icon-spin');
            expect($element).not.toHaveClass('icon-spinner');
            expect($element).toHaveClass('foo');
        });

    });

});