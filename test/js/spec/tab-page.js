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
    'underscore',
    'js-whatever/js/tab-page',
    'js-testing/backbone-mock-factory'
], function(_, TabPage, backboneMockFactory) {
    'use strict';

    var FirstView = backboneMockFactory.getView(['getSelectedRoute']);
    var SecondView = backboneMockFactory.getView([]);

    var firstTabConstructorOptions = {};

    function initializeTabs() {
        this.tabs = [
            {
                constructor: FirstView,
                constructorOptions: firstTabConstructorOptions,
                href: 'first-tab'
            },
            {
                constructor: SecondView,
                href: 'second-tab'
            }
        ];
    }

    var TestTabPage = TabPage.extend({
        initializeTabs: initializeTabs,
        routePrefix: 'test-tab-page'
    });

    var FilteredTabPage = TabPage.extend({
        initializeTabs: initializeTabs,

        filterTabs: function() {
            this.tabs = _.where(this.tabs, {href: 'first-tab'})
        }
    });

    describe('Tab page', function() {
        describe('without filtering', function() {
            beforeEach(function() {
                this.tabPage = new TestTabPage();
            });

            it('should construct tabs correctly', function() {
                expect(this.tabPage.tabs.length).toBe(2);

                expect(this.tabPage.tabs[0].view).toBeDefined();
                expect(this.tabPage.tabs[0].view).toBeInstanceOf(FirstView);

                expect(this.tabPage.tabs[1].view).toBeDefined();
                expect(this.tabPage.tabs[1].view).toBeInstanceOf(SecondView);

                expect(this.tabPage.tabs[0].view.constructorArgs[0]).toBe(firstTabConstructorOptions)
            });

            it('should construct routes correctly before it renders', function() {
                expect(this.tabPage.getSelectedRoute()).toBe('test-tab-page/first-tab')
            });

            describe('after rendering', function() {
                beforeEach(function() {
                    this.tabPage.render();
                });

                it('should select the current tab when update is called', function() {
                    this.tabPage.update();

                    expect(this.tabPage.tabView.selectTab).toHaveBeenCalled();
                });

                it('should delegate to the tab view when getting the selectedRoute', function() {
                    this.tabPage.getSelectedRoute();

                    expect(this.tabPage.tabView.getSelectedRoute).toHaveBeenCalled();
                });
            });
        });

        describe('with filtering', function() {
            beforeEach(function() {
                this.tabPage = new FilteredTabPage();
            });

            it('should construct tabs correctly', function() {
                expect(this.tabPage.tabs.length).toBe(1);

                expect(this.tabPage.tabs[0].view).toBeDefined();
                expect(this.tabPage.tabs[0].view.constructorArgs[0]).toBe(firstTabConstructorOptions)
            });
        });
    });
});
