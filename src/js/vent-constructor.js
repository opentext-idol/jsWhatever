
define([
    'backbone'
],
    /**
     * @exports vent
     */
    function(Backbone) {
        /**
         * @desc Constructs a new instance of vent.  Observes resize events on window
         * @param {Backbone.Router} router The router to use for navigation
         * @constructs module:vent.Vent
         * @emits vent:resize When the window has resized. Fired at most once every 200ms
         */
        var Vent = function(router){
            _.bindAll(this, 'fireResize');

            $(window).on('resize', this.fireResize);

            this.router = router;
        };

        _.extend(Vent.prototype, Backbone.Events,
            /**
             * @lends module:vent.Vent
             */
            {
                /**
                 * @desc Aggregated navigation method. The Backbone.Router.navigate trigger option defauls to true
                 * @param {string} route The route to navigate to
                 * @param {object} options Options passed to router.navigate.
                 * @memberOf module:vent.Vent
                 * @instance
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
                 * @memberOf module:vent.Vent
                 * @method
                 * @instance
                 */
                fireResize: _.throttle(function(){
                    this.trigger('vent:resize');
                }, 200)
            }
        );

        return Vent;

    }
);