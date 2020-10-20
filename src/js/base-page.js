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

/**
 * @module js-whatever/js/base-page
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    /**
     * @name module:js-whatever/js/base-page.BasePage
     * @desc Abstract base class representing a page. All application pages should extend from this or implement the
     * same methods.
     * Base pages will start hidden.
     * @constructor
     * @extends Backbone.View
     * @abstract
     */
    return Backbone.View.extend(/** @lends module:js-whatever/js/base-page.BasePage.prototype */{
        attributes: {
            style: 'display:none;'
        },

        /**
         * @desc Shows the page and calls the {@link module:js-whatever/js/base-page.BasePage#update|update} method
         */
        show: function() {
            this.$el.show();

            // for Selenium testing
            this.$el.attr('data-pagename', this.pageName);

            if(!this.hasRendered) {
                this.render();
                this.hasRendered = true;
            }

            this.visible = true;
            this.update();
        },

        /**
         * @desc Hides the page
         */
        hide: function() {
            this.visible = false;
            this.$el.hide();
        },

        isVisible: function() {
            return !!this.visible;
        },

        /**
         * @desc Called when showing a page. The default implementation is a no-op.
         * @abstract
         * @method
         */
        update: _.noop,

        /**
         * @desc Called when navigating to a page. If a page has state which can be represented by a route, this route
         * should be returned. The default implementation is a no-op.
         * @abstract
         * @method
         */
        getSelectedRoute: _.noop
    });
});
