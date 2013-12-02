define([
    'backbone',
    'jqueryui'
], function(Backbone) {

    return Backbone.View.extend({

        initialize: function(options) {
            _.bindAll(this, 'showTab', 'selectTab');

            var routePrefix = options.routePrefix;

            this.tabs = options.tabs;
            this.router = options.router;
            this.vent = options.vent;
            this.appPrefix = options.appPrefix || 'page';
            this.routePrefix = routePrefix;

            this.router.on('route:' + _.last(routePrefix.split('/')), this.selectTab);

            this.$el.tabs({
                activate: this.showTab,
                active: -1
            });

            // this implicitly calls showTab, and will set this.selectedId
            this.$el.tabs('option', 'active', 0);
        },

        showTab: function(e, ui) {
            var id = ui.newPanel.attr('id');

            // if the tab has just been created, we don't want to update the routes, otherwise when you
            // refresh the page you'll get spurious 'back' entries for the first tab in the tab view.
            var tabNewlyCreated = !this.selectedId;
            this.selectedId = id;

            var tab = this.find(id);
            if (!tabNewlyCreated && (!tab.view || !_.result(tab.view, 'suppressTabHistory'))) {
                var newRoute = this.appPrefix + '/' + this.getSelectedRoute(id);

                var isSubtabRoute = newRoute.indexOf(Backbone.history.fragment.replace(/^.*?page/, 'page') + '/') === 0;

                // if the new route is a subtab of the old route, we should replace the old route
                // e.g. when refreshing a page on #page/performance/performanceStatistics/statstab-ACI we
                // briefly go to #page/performance/performanceStatistics.
                this.vent.navigate(newRoute, {
                    trigger: false,
                    replace: isSubtabRoute
                });
            }
        },

        selectTab: function(reqId) {
            var id = reqId || this.selectedId;

            this.$el.tabs('option', 'active', this.indexOf(id));
            this.selectedId = id;
        },

		find: function(id) {
			return _.find(this.tabs, function(tab) {
				return tab.href === id
			});
		},

        indexOf: function(id) {
            return _.indexOf(this.tabs, this.find(id));
        },

        getSelectedRoute: function(id) {
            id = id || this.selectedId;
            return [this.routePrefix, id].join('/');
        }

    });

});
