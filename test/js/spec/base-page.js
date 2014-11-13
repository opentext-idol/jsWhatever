define([
    'js-utils/js/base-page'
], function(BasePage) {

    describe('Base Page', function() {

        beforeEach(function() {
            this.addMatchers({
                toBeVisible: function() {
                    this.message = function() {
                        return [
                            'Expected ' + jasmine.pp(this.actual) + 'to be visible',
                            'Expected ' + jasmine.pp(this.actual) + 'not to be visible'
                        ];
                    };

                    return this.actual.$el.css('display') !== 'none';
                }
            });

            this.page = new (BasePage.extend({
                pageName: 'test'
            }))();

            spyOn(this.page, 'update');
        });

        it('should be invisible when newly created', function() {
            expect(this.page).not.toBeVisible();
        });

        describe('show', function() {
            beforeEach(function() {
                this.page.show();
            });

            it('should make pages visible', function() {
                expect(this.page).toBeVisible();
            });

            it('should add the data-pagename attribute', function() {
                expect(this.page.$el.data('pagename')).toBe('test')
            });

            it('should call the update method', function() {
                expect(this.page.update).toHaveCallCount(1);
            })
        });

        describe('hide', function() {
            it('should make pages invisible', function() {
                this.page.show();
                this.page.hide();

                expect(this.page).not.toBeVisible();
            })
        });

        describe('isVisible', function() {
            beforeEach(function() {
                $('body').append(this.page.el);
            });

            afterEach(function() {
                this.page.remove();
            });

            it('should return true for visible pages', function() {
                this.page.show();

                expect(this.page.isVisible()).toBe(true);
            });

            it('should return false for invisible pages', function() {
                expect(this.page.isVisible()).toBe(false);
            });
        })

    });

});