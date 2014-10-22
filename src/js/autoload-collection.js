/**
 * @module autoload-collection
 * @desc A Backbone.Collection which incorporates {@link module:autoload-methods|AutoloadMethods}
 * @extends Backbone.Collection
 * @abstract
 */
define([
    'backbone',
    'js-utils/js/autoload-methods'
], function(Backbone, autoloadMethods) {

    return Backbone.Collection.extend(_.chain(autoloadMethods).clone().extend({
        eventName: 'reset add change remove'
    }).value());
});
