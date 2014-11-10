define([
    'underscore'
],
    /**
     * @exports repeater
     */
    function () {
        /**
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

        /**
         * @desc Stops the timeout
         * @returns {Repeater} this
         */
        Repeater.prototype.stop = function () {
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }

            return this;
        };

        /**
         * @desc Starts the timeout. If it has already started, this will reset the timeout
         * @returns {Repeater} this
         */
        Repeater.prototype.start = function () {
            this.stop();
            this.timeout = _.delay(this.update, this.interval);
            return this;
        };

        /**
         * @desc Calls the provided function
         * @returns {Repeater} this
         */
        Repeater.prototype.update = function () {
            this.f();

            if (this.timeout !== null) {
                this.start();
            }

            return this;
        };

        return Repeater;
    }
);