/**
 * @module js-utils/js/autoload
 */
define([
    'backbone',
    'js-utils/js/autoload-methods'
], function(Backbone, autoloadMethods) {

    /**
     * @name module:js-utils/js/autoload.Autoload
     * @desc A Backbone.Model which incorporates {@link module:js-utils/js/autoload-methods|AutoloadMethods}
     * @constructor
     * @extends Backbone.Model
     * @abstract
     */
    return Backbone.Model.extend(_.chain(autoloadMethods).clone().extend({
        eventName: 'change'
    }).value());
}); 
