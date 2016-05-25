/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/base-page'
], function(BasePage) {

    describe('Base Page', function() {

        beforeEach(function() {
            jasmine.addMatchers({
                toBeVisible: function() {
                    return {
                        compare: function(actual) {
                            var pass = actual.$el.css('display') !== 'none';
                            return {
                                message: 'Expected ' + jasmine.pp(actual) + (pass ? ' not ' : '') + 'to be visible',
                                pass: pass
                            }
                        }
                    }
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