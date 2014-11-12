/**
 * @module js-utils/js/base-page
 */
define([
    'backbone'
], function(Backbone) {

    /**
     * @name module:js-utils/js/base-page.BasePage
     * @desc Abstract base class representing a page. All application pages should extend from this or implement the
     * same methods.
     * Base pages will start hidden.
     * @constructor
     * @extends Backbone.View
     * @abstract
     */
    return Backbone.View.extend(/** @lends module:js-utils/js/base-page.BasePage.prototype */{

        attributes: {
            style: 'display:none;'
        },

        /**
         * @desc Shows the page and calls the update method
         */
        show: function() {
            this.$el.show();

            // for Selenium testing
            this.$el.attr('data-pagename', this.pageName);

            this.update();
        },

        /**
         * @desc Hides the page
         */
        hide: function() {
            this.$el.hide();
        },

        isVisible: function() {
            return this.$el.is(':visible');
        },

        /**
         * @desc Called when showing a page. The default implementation is a no-op.
         * @abstract
         * @method
         */
        update: $.noop,

        /**
         * @desc Called when navigating to a page.  If a page has state which can be represented by a route, this route
         * should be returned. The default implementation is a no-op.
         * @abstract
         * @method
         */
        getSelectedRoute: $.noop

    });

});