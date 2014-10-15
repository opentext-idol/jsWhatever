define([
    'js-utils/js/tab-view'
], function(TabView) {

    return TabView.extend({

        showTab: function(e, ui) {
            var id = ui.newPanel.attr('id');

            var tabData = _.find(this.tabs, function(tab) {
                return tab.href === id;
            });

            if(!tabData.hasRendered) {
                var tab  = tabData.view;

                tab.render();

                this.$('#' + id).append(tab.el);

                tabData.hasRendered = true;
            }

            TabView.prototype.showTab.call(this, e, ui);

            if (tabData.view && tabData.view.tabActivation) {
                tabData.view.tabActivation();
            }
        },

        getSelectedRoute: function(id) {
            id = id || this.selectedId;

            var route = TabView.prototype.getSelectedRoute.apply(this, arguments);

            if (id) {
                var selectedView = this.find(id).view;

                if (selectedView && selectedView.getSelectedRoute) {
                    var additionalRoute = selectedView.getSelectedRoute();

                    if (additionalRoute) {
                        route += '/' + additionalRoute
                    }
                }
            }

            return route;
        }
    });
});