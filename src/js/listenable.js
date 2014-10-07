/**
 * Allows jQuery wrapped objects to be used with backbone style events.
 * e.g. listenTo and stopListening
 */

define([
    'jquery',
    'underscore'
], function listenable() {

    var DATA_KEY = 'listenable';

    return function (el) {
        var $el = $(el);
        var me = {
            on: function (event, fn) {
                var id = me._listenerId || (me._listenerId = _.uniqueId('l'));
                var data = $el.data(DATA_KEY) || {};
                var pairs = data[id] || [];
                pairs.push({ event: event, fn: fn });

                $el.on(event, fn);

                data[id] = pairs;
                $el.data(DATA_KEY, data);
            },

            off: function (event, fn) {
                var data = $el.data(DATA_KEY);
                if (!data) { return; }

                var pairs = data[me._listenerId];
                if (!pairs) { return; }

                if (!event && !fn) {
                    _.each(pairs, function(data){
                        $el.off(data.event, data.fn);
                    });
                }
                else {
                    for (var ii = pairs.length - 1; ii >= 0; ii--) {
                        if (pairs[ii].event === event && (!fn || pairs[ii].fn === fn)) {
                            pairs.splice(ii, 1);
                            $el.off(event, fn);
                        }
                    }
                }

                data[me._listenerId] = pairs;
            }
        };
        return me;
    };
});