/*
 * Copyright 2013-2017 Open Text.
 *
 * Licensed under the MIT License (the "License"); you may not use this file
 * except in compliance with the License.
 *
 * The only warranties for products and services of Open Text and its affiliates
 * and licensors ("Open Text") are as may be set forth in the express warranty
 * statements accompanying such products and services. Nothing herein should be
 * construed as constituting an additional warranty. Open Text shall not be
 * liable for technical or editorial errors or omissions contained herein. The
 * information contained herein is subject to change without notice.
 */

/**
 * @module js-whatever/js/navigation
 */
define([
    'underscore',
    'jquery',
    'backbone',
    'text!js-whatever/templates/navigation.html'
], function(_, $, Backbone, template) {
    'use strict';

    /**
     * @typedef NavigationOptions
     * @property {string} event This event is observed on the router to respond to navigation changes
     * @property {Backbone.Router} router The router to observe for navigation events
     * @property {module:js-whatever/js/abstract-pages.AbstractPages} pages Pages which will be linked to from the navbar
     */
    /**
     * @name module:js-whatever/js/navigation.Navigation
     * @desc Wrapper around a Bootstrap navbar to handle updating the active link
     * @constructor
     * @param {NavigationOptions} options
     * @extends Backbone.View
     */
    return Backbone.View.extend(/** @lends module:js-whatever/js/navigation.Navigation.prototype */{
        /**
         * @desc Returns parameters which are passed to the template. Defaults to a no-op
         * @method
         * @abstract
         */
        getTemplateParameters: _.noop,

        /**
         * @desc Template for the navbar
         */
        template: _.template(template, undefined, {variable: 'ctx'}),

        initialize: function(options) {
            _.bindAll(this, 'navigate');

            if(!this.event || !this.router) {
                throw 'navigation.js error: event and router must be provided!';
            }

            this.pages = options.pages;
            this.router.on(this.event, this.navigate);
        },

        /**
         * @desc Updates the active link on the navbar. Called when the given router fires the given event
         * @param pageName The name of the page that has been navigated to
         */
        navigate: function(pageName) {
            this.$('li').removeClass('active');
            var clicked = this.$('li[data-pagename="' + pageName + '"]');
            clicked.addClass('active');
            clicked.closest('.dropdown').addClass('active');
        },

        /**
         * @desc Renders the navbar
         */
        render: function() {
            var params = this.getTemplateParameters();

            this.$el.html(this.template(params));

            this.$('li').click(_.bind(function(e) {
                if(e.which !== 2) {
                    var target = $(e.delegateTarget);
                    var route = target.data('pagename');

                    if(route) {
                        e.preventDefault();
                        this.navigate(route);
                        this.pages.navigateToPage(route);
                    }
                }
            }, this));
        }
    });
});
