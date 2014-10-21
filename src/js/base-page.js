/**
 * @module base-page
 */
define([
    'backbone'
], function(Backbone) {

    return Backbone.View.extend({

        attributes: {
            style: 'display:none;'
        },

        show: function() {
            this.$el.show();

            // for Selenium testing
            this.$el.attr('data-pagename', this.pageName);

            this.update();
        },

        hide: function() {
            this.$el.hide();
        },

        isVisible: function() {
            return this.$el.is(':visible');
        },

        update: $.noop,

        getSelectedRoute: $.noop

    });

});