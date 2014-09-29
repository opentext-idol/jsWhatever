define([
    'js-utils/js/base-page',
    'js-utils/js/lazy-tab-view',
    'text!js-utils/templates/tab-page.html',
    'underscore',
    'jqueryui'
], function(BasePage, LazyTabView, template, _) {

    return BasePage.extend({

        appPrefix: 'page',

        vent: null, // You need to set this

        router: null, // You need to set this

        tabs: [], //You need to set this

        routePrefix: "overrideMe", //You need to set this

        template: _.template(template),

        initialize: function() {
            this.initializeTabs();

            this.filterTabs();

            _.each(this.tabs, function(tab) {
                if (tab.constructor) {
                    tab.view = new tab.constructor(tab.constructorOptions);
                }
            });
        },

        initializeTabs: $.noop, //Override this and create this.tabs

        filterTabs: $.noop, // Override this to filter this.tabs before creating page

        render: function() {
            this.$el.html(this.template({
                tabs: this.tabs
            }));

            this.tabView = new LazyTabView({
                router: this.router,
                vent: this.vent,
                appPrefix: this.appPrefix,
                routePrefix: this.routePrefix,
                el: this.el,
                tabs: this.tabs
            });
        },

        update: function() {
            // select the currently selected tab to update navigation
            this.tabView.selectTab();
        },

        getSelectedRoute: function() {
            return this.tabView ? this.tabView.getSelectedRoute() : [this.routePrefix, this.tabs[0].href].join('/');
        }

    });

});
