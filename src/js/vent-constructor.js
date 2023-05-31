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
 * @module js-whatever/js/vent-constructor
 */
define([
    'underscore',
    'jquery',
    'backbone'
], function(_, $, Backbone) {
    'use strict';

    /**
     * @name module:js-whatever/js/vent-constructor.Vent
     * @desc Constructs a new instance of vent.  Observes resize events on window
     * @param {Backbone.Router} router The router to use for navigation
     * @constructor
     * @emits vent:resize When the window has resized. Fired at most once every 200ms
     */
    function Vent(router) {
        _.bindAll(this, 'fireResize');

        $(window).on('resize', this.fireResize);

        this.router = router;
    }

    _.extend(Vent.prototype, Backbone.Events, /** @lends module:js-whatever/js/vent-constructor.Vent.prototype */ {
            /**
             * @desc Aggregated navigation method. The Backbone.Router.navigate trigger option defauls to true
             * @param {string} route The route to navigate to
             * @param {object} options Options passed to router.navigate.
             */
            navigate: function(route, options) {
                options = options || {};

                options = _.defaults(options, {
                    trigger: true
                });

                this.router.navigate(route, options);
            },

            /**
             * @desc Requests that the vent:resize event be fired
             * @method
             */
            fireResize: _.throttle(function() {
                this.trigger('vent:resize');
            }, 200)
        }
    );

    return Vent;
});
