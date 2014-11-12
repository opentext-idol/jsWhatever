/**
 * @module js-utils/js/abstract-pages
 */
define([
    'backbone',
    'underscore'
], function(Backbone, _) {

    /**
     * @name module:js-utils/js/abstract-pages.AbstractPages
     * @constructor
     * @desc Abstract base class for representing groups of pages
     * @extends Backbone.View
     */
    return Backbone.View.extend(/** @lends module:js-utils/js/abstract-pages.AbstractPages.prototype */ {
        /**
         * @desc Backbone.Router instance which is observed for navigation events
         * @abstract
         */
        router: null,

        /**
         * @desc Instance of Vent used for navigation
         * @type {module:js-utils/js/vent-constructor.Vent}
         * @abstract
         */
        vent: null,

        initialize: function() {
            _.bindAll(this, 'changePage', 'findPage');

            if (!this.router || !this.vent) {
                throw 'abstract-pages.js error: router and vent must be provided!';
            }

            this.initializePages();

            _.each(this.pages, function(page) {
                page.view = new page.constructor();
                page.view.pageName = page.pageName;
                page.route = this.buildRoute(page)
            }, this);

            this.router.on(this.eventName, this.changePage);
        },

        /**
         * @desc Sets the value of this.pages to the list of page objects.
         * These must have a pageName and a constructor function.
         * The constructors should extend {@link module:js-utils/js/base-page.BasePage|BasePage}
         * @abstract
         * @method
         * @example
         * this.pages = [{
         *     constructor: Foo,
         *     pageName: 'foo'
         * }, {
         *     constructor: Bar,
         *     pageName: 'bar'
         * }]
         */
        initializePages: $.noop,

        /**
         * @param {String} page The page object
         * @returns {String} The current route for a given page
         */
        buildRoute: function(page) {
            return this.routePrefix + (page.view.getSelectedRoute() || page.pageName )
        },

        /**
         * @param {String} pageName The name of the page
         * @returns {Object} The page object with the given name
         */
        findPage: function(pageName) {
            return _.findWhere(this.pages, { pageName: pageName });
        },

        /**
         * @desc Change to the named page.  This will call it's render method if this hasn't already been called,
         * and hide the current page
         * @param {String} pageName The name of the page
         */
        changePage: function(pageName) {
            var newPage = this.findPage(pageName);

            if (!newPage.hasRendered) {
                newPage.view.render();
                this.$el.append(newPage.view.el);
                newPage.hasRendered = true;
            }

            if (this.currentPage) {
                this.currentPage.view.hide();
            }

            newPage.view.show();

            this.currentPage = newPage;
        },

        /**
         * Navigate to the named page, showing it and using the vent to propagate the navigation
         * @param {String} pageName The name of the page
         */
        navigateToPage: function(pageName) {
            var page = this.findPage(pageName);

            this.changePage(pageName);

            var route = this.buildRoute(page);

            this.vent.navigate(route, {trigger: false});
        }
    });

});
