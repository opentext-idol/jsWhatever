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

/**
 * @module js-whatever/js/lazy-tab-view
 */
define([
    'underscore',
    'js-whatever/js/tab-view'
], function(_, TabView) {
    'use strict';

    /**
     * @name module:js-whatever/js/lazy-tab-view.LazyTabView
     * @desc Version of {@link module:js-whatever/js/tab-view.TabView|TabView} which doesn't render views until they are required.
     * @constructor
     * @extends module:js-whatever/js/tab-view.TabView
     */
    return TabView.extend(/** @lends module:js-whatever/js/lazy-tab-view.LazyTabView.prototype */{
        /**
         * @desc Shows a tab in response to an event from the jQuery plugin. Renders a view if it hasn't been rendered
         * before. Calls the tabActivation method of the view if it is defined.
         * @param {object} e jQuery event object
         * @param {object} ui jQuery UI tabs data
         */
        showTab: function(e, ui) {
            var id = ui.newPanel.attr('id');

            var tabData = _.find(this.tabs, function(tab) {
                return tab.href === id;
            });

            if(!tabData.hasRendered) {
                var tab = tabData.view;

                tab.render();

                this.$('#' + id).append(tab.el);

                tabData.hasRendered = true;
            }

            TabView.prototype.showTab.call(this, e, ui);

            if(tabData.view && tabData.view.tabActivation) {
                tabData.view.tabActivation();
            }
        },

        /**
         * @desc Returns a route representing the current state of the tab view
         * @param {string} [id=this.selectedId] The id of the tab which will be used in the route
         * @returns {string} The route for the lazy-tab-view.
         */
        getSelectedRoute: function(id) {
            id = id || this.selectedId;

            var route = TabView.prototype.getSelectedRoute.apply(this, arguments);

            if(id) {
                var selectedView = this.find(id).view;

                if(selectedView && selectedView.getSelectedRoute) {
                    var additionalRoute = selectedView.getSelectedRoute();

                    if(additionalRoute) {
                        route += '/' + additionalRoute
                    }
                }
            }

            return route;
        }
    });
});
