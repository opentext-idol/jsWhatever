define([
    'backbone',
    'text!js-utils/templates/navigation.html'
], function(Backbone, template) {

    return Backbone.View.extend({
        getTemplateParameters: $.noop,
        template: _.template(template, undefined, {variable: 'ctx'}),

        initialize: function(options) {
            _.bindAll(this, 'navigate');

            if (!this.event || !this.router || !this.getTemplateParameters) {
                throw 'navigation.js error: event, router and getTemplateParameters must be provided!';
            }

            this.pages = options.pages;
            this.router.on(this.event, this.navigate);
        },

        navigate: function(pageName) {
            this.$('li').removeClass('active');
            var clicked = this.$('li[data-pagename="' + pageName + '"]');
            clicked.addClass('active');
            clicked.closest('.dropdown').addClass('active');
        },

        render: function() {
            var params = this.getTemplateParameters();

            this.$el.html(this.template(params));

            this.$('li').click(_.bind(function(e) {
                if (e.which !== 2) {
                    var target = $(e.delegateTarget);
                    var route = target.data('pagename');

                    if (route) {
                        e.preventDefault();
                        this.navigate(route);
                        this.pages.navigateToPage(route);
                    }
                }
            }, this));
        }
    });

});