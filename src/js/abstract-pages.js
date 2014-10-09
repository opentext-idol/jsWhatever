define([
    'backbone',
    'underscore'
], function(Backbone, _) {

    return Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, 'changePage', 'findPage');

            if (!this.initializePages || !this.router || !this.vent) {
                throw 'abstract-pages.js error: initializePages, router and vent must be provided!';
            }

            this.initializePages();

            _.each(this.pages, function(page) {
                page.view = new page.constructor();
                page.view.pageName = page.pageName;
                page.route = this.buildRoute(page)
            }, this);

            this.router.on(this.eventName, this.changePage);
        },

        // override this in your subtype
        initializePages: $.noop,

        buildRoute: function(page) {
            return this.routePrefix + (page.view.getSelectedRoute() || page.pageName )
        },

        findPage: function(pageName) {
            return _.findWhere(this.pages, { pageName: pageName });
        },

        changePage: function(pageName) {
            var newPage = this.findPage(pageName);

            if(!newPage.hasRendered) {
                newPage.view.render();
                this.$el.append(newPage.view.el);
                newPage.hasRendered = true;
            }

            if(this.currentPage) {
                this.currentPage.view.hide();
            }

            newPage.view.show();

            this.currentPage = newPage;
        },

        navigateToPage: function(pageName) {
            var page = this.findPage(pageName);

            this.changePage(pageName);

            var route = this.buildRoute(page);

            this.vent.navigate(route, {trigger: false});
        }
    });

});
