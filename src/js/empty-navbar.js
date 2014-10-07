define([
    'backbone',
    'text!js-utils/templates/empty-navbar.html'
], function(Backbone, template) {

    var defaultOptions = {
        showLogout: true
    };

    return Backbone.View.extend({

        template: _.template(template),

        initialize: function (options) {
            this.options = _.extend({}, defaultOptions, options || {});
        },

        render: function() {
            this.$el.html(this.template(this.options));
        }

    });

});