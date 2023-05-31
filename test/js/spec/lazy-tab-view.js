/*
 * Copyright 2013-2017 Open Text.
 *
 * Licensed under the MIT License (the "License"); you may not use this file
 * except in compliance with the License.
 *
 * The only warranties for products and services of Open Text and its affiliates
 * and licensors ("Open Text") are as may be set forth in the express warranty
 * statements accompanying such products and services. Nothing herein should be
 * construed as constituting an additional warranty. Open Text shall not be
 * liable for technical or editorial errors or omissions contained herein. The
 * information contained herein is subject to change without notice.
 */

define([
    'jquery',
    'backbone',
    'real/js/lazy-tab-view',
    'js-testing/backbone-mock-factory'
], function($, Backbone, LazyTabView, backboneMockFactory) {
    'use strict';

    var FirstView = backboneMockFactory.getView(['render', 'getSelectedRoute', 'tabActivation']);
    var SecondView = backboneMockFactory.getView(['render']);

    function showTab(tabView, attr) {
        tabView.showTab({}, {
            newPanel: {
                attr: function() {
                    return attr;
                }
            }
        });
    }

    describe('Lazy Tab View', function() {
        beforeEach(function() {
            $.fn.tabs = jasmine.createSpy('tabs');

            this.oldFragment = Backbone.history.fragment;

            Backbone.history.fragment = '';

            this.tabView = new LazyTabView({
                appPrefix: 'app',
                routePrefix: 'testView',
                router: jasmine.createSpyObj('router', ['on']),
                vent: jasmine.createSpyObj('vent', ['navigate']),
                tabs: [{
                    href: 'first',
                    view: new FirstView()
                }, {
                    href: 'second',
                    view: new SecondView()
                }]
            });

            showTab(this.tabView, 'first');
        });

        afterEach(function() {
            FirstView.reset();
            SecondView.reset();
            Backbone.history.fragment = this.oldFragment;
        });

        describe('getSelectedRoute', function() {
            it('should get the selected route correctly when the view implements getSelectedRoute', function() {
                var route = this.tabView.getSelectedRoute('first');

                expect(route).toBe('testView/first');
                expect(this.tabView.tabs[0].view.getSelectedRoute).toHaveBeenCalled();
            });

            it('should get the selected route correctly when the view does not implement getSelectedRoute', function() {
                var route = this.tabView.getSelectedRoute('second');

                expect(route).toBe('testView/second');
            })
        });

        describe('showTab', function() {
            it('should call tabActivation on the view if it exists', function() {
                expect(this.tabView.tabs[0].view.tabActivation).toHaveBeenCalled();
            });

            it('should render the view if necessary', function() {
                expect(this.tabView.tabs[0].view.render).toHaveBeenCalled();
            });

            it('should render the view once', function() {
                showTab(this.tabView, 'second');
                showTab(this.tabView, 'first');
                expect(this.tabView.tabs[0].view.render).toHaveCallCount(1);
            });

            it('should track the rendered state of the view', function() {
                expect(this.tabView.tabs[0].hasRendered).toBe(true);
                expect(this.tabView.tabs[1].hasRendered).toBeUndefined();
            });
        });
    });
});
