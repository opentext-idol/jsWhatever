define([
    'backbone'
], function(Backbone) {

    var Vent = function(router){
        _.bindAll(this, 'fireResize');

        $(window).on('resize', this.fireResize);

        this.router = router;
    };

    _.extend(Vent.prototype, Backbone.Events, {
        navigate: function(route, options) {
            options = options || {};

            options = _.defaults(options, {
                trigger: true
            });

            this.router.navigate(route, options);
        },

        fireResize: _.throttle(function(){
            this.trigger('vent:resize');
        }, 200),

        query: function(queryString) {
            this.navigate('page/console/console-test-action/' + encodeURIComponent(queryString))
        }
    });

    return Vent;

});