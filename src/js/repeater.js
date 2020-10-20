/*
 * (c) Copyright 2013-2017 Micro Focus or one of its affiliates.
 *
 * Licensed under the MIT License (the "License"); you may not use this file
 * except in compliance with the License.
 *
 * The only warranties for products and services of Micro Focus and its affiliates
 * and licensors ("Micro Focus") are as may be set forth in the express warranty
 * statements accompanying such products and services. Nothing herein should be
 * construed as constituting an additional warranty. Micro Focus shall not be
 * liable for technical or editorial errors or omissions contained herein. The
 * information contained herein is subject to change without notice.
 */

/**
 * @module js-whatever/js/repeater
 */
define([
    'underscore'
], function(_) {
    'use strict';

    /**
     * @name module:js-whatever/js/repeater.Repeater
     * @desc Wrapper around setTimeout that allows for the control of the timeout
     * @param {function} f The function to be called
     * @param {number} interval The number of milliseconds between invocations of f
     * @constructor
     */
    function Repeater(f, interval) {
        this.f = f;
        this.interval = interval;
        this.timeout = null;
        this.update = _.bind(this.update, this);
    }

    _.extend(Repeater.prototype, /** @lends module:js-whatever/js/repeater.Repeater.prototype */{
        /**
         * @desc Stops the timeout
         * @returns {Repeater} this
         */
        stop: function() {
            if(this.timeout !== null) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }

            return this;
        },

        /**
         * @desc Starts the timeout. If it has already started, this will reset the timeout
         * @returns {Repeater} this
         */
        start: function() {
            this.stop();
            this.timeout = _.delay(this.update, this.interval);
            return this;
        },

        /**
         * @desc Calls the provided function
         * @returns {Repeater} this
         */
        update: function() {
            this.f();

            if(this.timeout !== null) {
                this.start();
            }

            return this;
        }
    });

    return Repeater;
});
