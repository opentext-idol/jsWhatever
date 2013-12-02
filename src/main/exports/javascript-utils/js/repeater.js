define([
    'underscore'
], function () {
    function Repeater(f, interval) {
        this.f = f;
        this.interval = interval;
        this.timeout = null;
        this.update = _.bind(this.update, this);
    }

    Repeater.prototype.stop = function () {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        return this;
    };

    Repeater.prototype.start = function () {
        this.stop();
        this.timeout = _.delay(this.update, this.interval);
        return this;
    };

    Repeater.prototype.update = function () {
        this.f();

        if (this.timeout !== null) {
            this.start();
        }

        return this;
    };

    return Repeater;
});