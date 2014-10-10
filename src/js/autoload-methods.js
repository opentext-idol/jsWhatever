define([
    'jquery',
    'underscore'
],function($, _) {

    return {
        autoload: true,
        loaded: false,

        initialize : function(initialState, options) {
            // We need our .loaded flag to be set true in a change listener since it's fired before the fetch()
            // completion handler fires; prevents loss of the first change event if we call this.onLoad from within
            // this.onLoad e.g. in #1018992. We still keep the fetch completion handler since it's not explicitly
            // mentioned in docs whether the handler or change() events fire first () so it might change in future.
            options = options || {};

            var onLoaded = _.bind(function(){
                this.off(this.eventName, onLoaded);
                this.loaded = true;
            }, this);

            if (options.ports) {
                this.ports = options.ports;
            }

            if (options.autoload !== undefined) {
                this.autoload = options.autoload
            }

            if (options.loaded !== undefined) {
                this.loaded = options.loaded
            }

            this.on(this.eventName, onLoaded);

            if (this.autoload) {
                this.fetch({
                    success: onLoaded
                });
            }
        },

        ///Override to something like: "?action=GetStatus&ResponseFormat=json"
        url: $.noop,

        onLoad: function(callback, ctx) {
            if (ctx) {
                callback = _.bind(callback, ctx);
            }

            if (this.loaded) {
                callback(this);
            }
            else {
                this.on(this.eventName, function listener() {
                    this.off(this.eventName, listener);
                    callback(this);
                });
            }
        }
    }
});