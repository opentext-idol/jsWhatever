/**
 * @module js-utils/js/repeater
 */
define([
    'underscore'
], function () {
    /**
     * @name module:js-utils/js/repeater.Repeater
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

    _.extends(Repeater.prototype, /** @lends module:js-utils/js/repeater.Repeater.prototype */{
        /**
         * @desc Stops the timeout
         * @returns {Repeater} this
         */
        stop: function () {
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }

            return this;
        },

        /**
         * @desc Starts the timeout. If it has already started, this will reset the timeout
         * @returns {Repeater} this
         */
        start: function () {
            this.stop();
            this.timeout = _.delay(this.update, this.interval);
            return this;
        },

        /**
         * @desc Calls the provided function
         * @returns {Repeater} this
         */
        update: function () {
            this.f();

            if (this.timeout !== null) {
                this.start();
            }

            return this;
        }
    });

    return Repeater;
});