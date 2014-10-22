/**
 * @module autoload
 * @desc A Backbone.Model which incorporates {@link module:autoload-methods|AutoloadMethods}
 * @extends Backbone.Model
 * @abstract
 */
define([
    'backbone',
    'js-utils/js/autoload-methods'
], function(Backbone, autoloadMethods) {

    return Backbone.Model.extend(_.chain(autoloadMethods).clone().extend({
        eventName: 'change'
    }).value());
}); 
