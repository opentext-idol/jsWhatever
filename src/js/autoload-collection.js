/**
 * @module js-whatever/js/autoload-collection
 */
define([
    'backbone',
    'js-whatever/js/autoload-methods'
], function(Backbone, autoloadMethods) {

    /**
     * @name module:js-whatever/js/autoload-collection.AutoloadCollection
     * @desc A Backbone.Collection which incorporates {@link module:js-whatever/js/autoload-methods|AutoloadMethods}
     * @constructor
     * @extends Backbone.Collection
     * @abstract
     */
    return Backbone.Collection.extend(_.chain(autoloadMethods).clone().extend({
        eventName: 'reset add change remove'
    }).value());
});
