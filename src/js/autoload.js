/**
 * @module js-whatever/js/autoload
 */
define([
    'backbone',
    'js-whatever/js/autoload-methods'
], function(Backbone, autoloadMethods) {

    /**
     * @name module:js-whatever/js/autoload.Autoload
     * @desc A Backbone.Model which incorporates {@link module:js-whatever/js/autoload-methods|AutoloadMethods}
     * @constructor
     * @extends Backbone.Model
     * @abstract
     */
    return Backbone.Model.extend(_.chain(autoloadMethods).clone().extend({
        eventName: 'change'
    }).value());
}); 
