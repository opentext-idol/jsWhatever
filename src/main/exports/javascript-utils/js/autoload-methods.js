define({

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

        // Test code; doesn't fire the alert in the previous version on the first model fetch, would only fire if another change happened
//        this.onLoad(_.bind(function(){
//            this.onLoad(_.bind(function(){
//                alert('i should be called');
//            }, this));
//        }, this));
    },

    ///Override to something like: "?action=GetStatus&ResponseFormat=json"
    url: function() {
        typeof console !== 'undefined' && console.log("You are being a very silly person.  Override the url property of your ACI Model!");
    },

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
});