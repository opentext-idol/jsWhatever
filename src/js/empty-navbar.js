/**
 * @module empty-navbar
 * @desc Renders an empty top navbar that may contain a logout button
 */
define([
    'backbone',
    'text!js-utils/templates/empty-navbar.html'
], function(Backbone, template) {

    var defaultOptions = {
        showLogout: true
    };

    return Backbone.View.extend({

        template: _.template(template),

        /**
         * @typedef EmptyNavbarStrings
         * @type {object}
         * @property {string} appName The name of the application
         * @property {string} [logout] The label for the logout link. Must be defined if showLogout is true
         */
        /**
         * @typedef EmptyNavbarOptions
         * @type {object}
         * @property {boolean} [showLogout=true] Set to true if a logout button should be displayed
         * @property {string} [logoutUri] Href for the logout button. Must be defined if showLogout is true
         * @property {EmptyNavbarStrings} strings
         */
        /**
         * @desc Backbone initialize method
         * @param {EmptyNavbarOptions} [options={showLogout: true}]
         */
        initialize: function (options) {
            this.options = _.extend({}, defaultOptions, options || {});
        },

        /**
         * @desc Renders the view with the provided {@link EmptyNavbarOptions}
         */
        render: function() {
            this.$el.html(this.template(this.options));
        }

    });

});