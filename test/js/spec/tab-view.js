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
    'jquery',
    'backbone',
    'js-whatever/js/tab-view'
], function(_, $, Backbone, TabView) {
    'use strict';

    describe('Tab view', function() {
        var realTabs = $.fn.tabs;
        var realFragment = Backbone.history.fragment;

        function Router() {
            _.extend(this, Backbone.Events);
        }

        function Vent() {
            this.navigate = jasmine.createSpy('navigate');
        }

        beforeEach(function() {
            $.fn.tabs = jasmine.createSpy('tabs');
            Backbone.history.fragment = '#my-page/app/tabbed/chimpanzee';
            this.vent = new Vent();
            this.router = new Router();

            this.tabView = new TabView({
                appPrefix: 'my-page',
                routePrefix: 'app/tabbed',
                router: this.router,
                tabs: [
                    {href: 'chimpanzee'},
                    {href: 'baboon'},
                    {href: 'macaque'}
                ],
                vent: this.vent
            });

            this.tabView.showTab({}, {
                newPanel: $('<div id="chimpanzee"></div>')
            });
        });

        afterEach(function() {
            $.fn.tabs = realTabs;
            Backbone.history.fragment = realFragment;
        });

        it('should initialize correctly', function() {
            expect($.fn.tabs.calls.argsFor(0)[0]).toEqual({
                activate: this.tabView.showTab,
                active: -1
            });

            expect($.fn.tabs.calls.argsFor(1)).toEqual(['option', 'active', 0]);
            expect(this.vent.navigate).not.toHaveBeenCalled();
        });

        it('should show the correct tab on "selectTab', function() {
            $.fn.tabs.calls.reset();
            this.tabView.selectTab('macaque');

            expect($.fn.tabs).toHaveBeenCalledWith('option', 'active', 2);

            this.tabView.showTab({}, {
                newPanel: $('<div id="macaque"></div>')
            });

            expect(this.vent.navigate).toHaveBeenCalledWith('my-page/app/tabbed/macaque', {
                trigger: false,
                replace: false
            });
        });

        it('should select the correct tab on router "route" event', function() {
            this.router.trigger('route:tabbed', 'baboon');

            expect($.fn.tabs).toHaveBeenCalledWith('option', 'active', 1);
        });

        it('should find tabs by href', function() {
            expect(this.tabView.find('baboon')).toEqual({href: 'baboon'});
            expect(this.tabView.find('cheetah')).toBeUndefined();
        });

        it('should return the correct route from "getSelectedRoute"', function() {
            expect(this.tabView.getSelectedRoute()).toBe('app/tabbed/chimpanzee');

            this.tabView.selectTab('macaque');

            expect(this.tabView.getSelectedRoute()).toBe('app/tabbed/macaque');
        });
    });
});
