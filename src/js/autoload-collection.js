/**
 * @module js-utils/js/autoload-collection
 */
define([
    'backbone',
    'js-utils/js/autoload-methods'
], function(Backbone, autoloadMethods) {

    /**
     * @name module:js-utils/js/autoload-collection.AutoloadCollection
     * @desc A Backbone.Collection which incorporates {@link module:autoload-methods|AutoloadMethods}
     * @constructor
     * @extends Backbone.Collection
     * @abstract
     */
    return Backbone.Collection.extend(_.chain(autoloadMethods).clone().extend({
        eventName: 'reset add change remove'
    }).value());
});
