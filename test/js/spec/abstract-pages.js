/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/abstract-pages',
    'js-whatever/js/vent-constructor',
    'backbone',
    'js-testing/backbone-mock-factory'
], function(AbstractPages, Vent, Backbone, backboneMockFactory) {

    var View1 = backboneMockFactory.getView(['hide', 'show', 'getSelectedRoute', 'render']);
    var View2 = backboneMockFactory.getView(['hide', 'show', 'getSelectedRoute', 'render']);

    var Router = Backbone.Router.extend({
        routes: {
            '/:pageName': 'test'
        }
    });

    var router = new Router();
    var vent = new Vent();

    var Pages = AbstractPages.extend({
        eventName: 'route:test',
        routePrefix: 'test/',
        router: router,
        vent: vent,

        initializePages: function() {
            this.pages = [
                {
                    pageName: 'firstPage',
                    constructor: View1
                },
                {
                    pageName: 'secondPage',
                    constructor: View2
                }
            ];
        }
    });

    describe('Abstract Pages', function() {
        beforeEach(function() {
            spyOn(router, 'on');
            spyOn(vent, 'navigate');
            this.pages = new Pages();
        });

        afterEach(function() {
            router.on.reset();
            vent.navigate.reset();
        });

        describe('initialize', function() {
            it('should instantiate all the pages', function() {
                _.each(this.pages.pages, function(page) {
                    expect(page.view).toBeDefined();
                });
            });

            it('should give each page the correct route', function() {
                expect(this.pages.findPage('firstPage').route).toBe('test/firstPage');
                expect(this.pages.findPage('secondPage').route).toBe('test/secondPage');
            });
        });

        describe('findPage', function() {
            it('should find pages by name', function() {
                expect(this.pages.findPage('firstPage')).toBe(this.pages.pages[0]);
                expect(this.pages.findPage('secondPage')).toBe(this.pages.pages[1]);
                expect(this.pages.findPage('imaginaryPage')).not.toBeDefined();
            })
        });

        describe('changePage', function(){
            it('should render a page the first time it is used', function() {
                expect(this.pages.findPage('firstPage').view.render).toHaveCallCount(0);
                expect(this.pages.findPage('secondPage').view.render).toHaveCallCount(0);

                this.pages.changePage('firstPage');

                expect(this.pages.findPage('firstPage').view.render).toHaveCallCount(1);
            });

            it('should render a page only once', function() {
                expect(this.pages.findPage('firstPage').view.render).toHaveCallCount(0);
                expect(this.pages.findPage('secondPage').view.render).toHaveCallCount(0);

                this.pages.changePage('firstPage');
                this.pages.changePage('secondPage');
                this.pages.changePage('firstPage');

                expect(this.pages.findPage('firstPage').view.render).toHaveCallCount(1);
                expect(this.pages.findPage('secondPage').view.render).toHaveCallCount(1);
            });

            it('should cache the rendered state of a page', function() {
                expect(this.pages.findPage('firstPage').view.render).toHaveCallCount(0);

                this.pages.changePage('firstPage');

                expect(this.pages.findPage('firstPage').hasRendered).toBe(true);
                expect(this.pages.findPage('secondPage').hasRendered).toBeFalsy();
            });

            it('should hide the current page and show the new page when changing', function() {
                expect(this.pages.findPage('firstPage').view.render).toHaveCallCount(0);

                this.pages.changePage('firstPage');

                expect(this.pages.findPage('firstPage').view.show).toHaveCallCount(1);

                this.pages.changePage('secondPage');

                expect(this.pages.findPage('firstPage').view.hide).toHaveCallCount(1);
                expect(this.pages.findPage('firstPage').view.show).toHaveCallCount(1);

                this.pages.changePage('firstPage');

                expect(this.pages.findPage('firstPage').view.show).toHaveCallCount(2);
            });
        });

        describe('navigateToPage', function() {
            beforeEach(function() {
                this.pages.navigateToPage('firstPage');
            });

            it('should cause the vent to navigate', function() {
                expect(vent.navigate).toHaveCallCount(1);
                expect(vent.navigate).toHaveBeenCalledWith('test/firstPage', {trigger:false});
            });

            it('should change to the page', function() {
                expect(this.pages.findPage('firstPage').view.show).toHaveCallCount(1);
            })
        });

    });

});