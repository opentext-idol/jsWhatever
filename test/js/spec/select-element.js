define([
    'js-whatever/js/select-element'
], function (selectElement) {

    var getSelectedText = function () {
        if (window.getSelection) {
            return window.getSelection().toString();
        }
        if (document.selection) {
            return document.selection.createRange().text;
        }
        return null;
    };

    describe('Utility: `selectElement`', function () {

        describe('for a selector matching no elements', function () {
            it('should return false', function () {
                expect(selectElement('')).toBe(false);
            });
        });

        describe('for a matching selector', function () {

            beforeEach(function () {
                this.parent = $('<div class="hidden">');

                this.child0  = $('<p>some</p>');
                this.child1  = $('<p>demo</p>');
                this.child2  = $('<p>content</p>');

                this.parent.append(this.child0);
                this.parent.append(this.child1);
                this.parent.append(this.child2);

                $('body').append(this.parent);
            });

            afterEach(function () {
                this.parent.remove();
            });

            it('should select the text for that element', function () {

                expect(selectElement(this.child0)).toBe(true);
                expect(getSelectedText()).toBe('some');

                expect(selectElement(this.child1)).toBe(true);
                expect(getSelectedText()).toBe('demo');

                expect(selectElement(this.child2)).toBe(true);
                expect(getSelectedText()).toBe('content');

                expect(selectElement(this.parent)).toBe(true);
                expect(getSelectedText()).toMatch(/^some\s*demo\s*content$/);

            });
        });
    });
});
