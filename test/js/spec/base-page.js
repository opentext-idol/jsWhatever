/*
 * (c) Copyright 2013-2017 Micro Focus or one of its affiliates.
 *
 * Licensed under the MIT License (the "License"); you may not use this file
 * except in compliance with the License.
 *
 * The only warranties for products and services of Micro Focus and its affiliates
 * and licensors ("Micro Focus") are as may be set forth in the express warranty
 * statements accompanying such products and services. Nothing herein should be
 * construed as constituting an additional warranty. Micro Focus shall not be
 * liable for technical or editorial errors or omissions contained herein. The
 * information contained herein is subject to change without notice.
 */

define([
    'jquery',
    'js-whatever/js/base-page'
], function($, BasePage) {
    'use strict';

    describe('Base Page', function() {
        beforeEach(function() {
            jasmine.addMatchers({
                toBeVisible: function() {
                    return {
                        compare: function(actual) {
                            var pass = actual.$el.css('display') !== 'none' && actual.isVisible() === true;
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
            spyOn(this.page, 'render');
        });

        it('should be invisible when newly created', function() {
            expect(this.page).not.toBeVisible();
        });

        describe('show', function() {
            beforeEach(function() {
                this.page.show();
            });

            it('should call the render method', function() {
                expect(this.page.render).toHaveBeenCalled();
                expect(this.page.render.calls.count()).toEqual(1);
            });

            it('if called multiple times, should only call render once', function() {
                this.page.show();
                expect(this.page.render).toHaveBeenCalled();
                expect(this.page.render.calls.count()).toEqual(1);
            });

            it('should make pages visible', function() {
                expect(this.page).toBeVisible();
            });

            it('should add the data-pagename attribute', function() {
                expect(this.page.$el.data('pagename')).toEqual('test')
            });

            it('should call the update method', function() {
                expect(this.page.update).toHaveCallCount(1);
            });
        });

        describe('hide', function() {
            it('should make pages invisible', function() {
                this.page.show();
                this.page.hide();

                expect(this.page).not.toBeVisible();
            });
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
                expect(this.page.isVisible()).toEqual(true);
            });

            it('should return false for invisible pages', function() {
                expect(this.page.isVisible()).toEqual(false);
            });

            it('should change value if the page is shown or hidden', function() {
                expect(this.page.isVisible()).toEqual(false);
                this.page.show();
                expect(this.page.isVisible()).toEqual(true);
                this.page.hide();
                expect(this.page.isVisible()).toEqual(false);
                this.page.show();
                expect(this.page.isVisible()).toEqual(true);
            });
        })
    });
});
