define([
    'backbone',
    'store',
    'text!js-utils/templates/footer/footer.html',
    'text!js-utils/templates/footer/footer-tab.html',
    'text!js-utils/templates/footer/footer-tab-view.html'
], function(Backbone, store, footerTemplate, TabTemplate, ViewTemplate) {

    return Backbone.View.extend({
        className: 'tabbable page-footer',

        events: {
            'click .toggle-footer': 'toggle',
            'click .footer-tab': 'handleTabClick'
        },

		expanded: 'footer.expanded',
		index: 'footer.tab-index',

		processors: [
			{ selector: '.footer-tabs', component: 'tab', template: TabTemplate, target: 'li'},
			{ selector: '.tab-content', component: 'view', template: ViewTemplate, target: '.tab-pane' }
		],

        initialize: function(options) {
            this.$parent = options.$parent;
            this.tabData = options.tabData;
            this.vent = options.vent;

            this.strings = options.strings || {
                clickToHide: 'Collapse footer.',
                clickToShow: 'Show more...'
            };
        },

        render: function() {
            this.$el.html(footerTemplate);

            var selectedIndex = store.get(this.index) || 0;
            this.updateForState(store.get(this.expanded) || false);

            _.each(this.processors, function (processor) {
                var $container = this.$(processor.selector);

                _.each(this.tabData, function (item) {
                    var $wrapper = $($.parseHTML(_.template(processor.template, { key: item.key }, { variable: 'ctx' })));
                    var component = item[processor.component];

                    component.render();

                    if ($wrapper.hasClass('context')) {
                        $wrapper.html(component.el);
                    } else {
                        $wrapper.find('.context').html(component.el);
                    }

                    $container.append($wrapper);
                }, this);

                $container.find(processor.target).eq(selectedIndex).addClass('active');
            }, this);
        },

		selectIndex: function(index) {
            store.set(this.index, index);

            _.each(this.processors, function(processor) {
                this.$(processor.target).removeClass('active').eq(index).addClass('active');
            }, this);

            this.updateForState(true);
        },

        handleTabClick: function(e) {
            var $tab = $(e.currentTarget).parent();

            store.set(this.index, $tab.index());

            if ($tab.hasClass('active') && this.$parent.hasClass('show-footer')) {
                this.hide();
            } else {
                this.show();
            }
        },

        hide: function() {
            this.$parent.removeClass('show-footer');
            this.updateForState(false);
        },

        show: function() {
            this.$parent.addClass('show-footer');
            this.updateForState(true);
        },

        toggle: function() {
            this.updateForState(!this.$parent.hasClass('show-footer'));
        },

        updateForState: function (state) {
            store.set(this.expanded, state);
            this.$parent.toggleClass('show-footer', state);

            this.$('.toggle-footer')
                .tooltip('destroy')
                .tooltip({
                    container: 'body',
                    html: true,
                    title: state ? this.strings.clickToHide : this.strings.clickToShow
                });

            this.vent.fireResize();
        }
    });

});