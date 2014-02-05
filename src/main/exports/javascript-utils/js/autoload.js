define([
	'backbone',
    'js-utils/js/autoload-methods'
], function(Backbone, autoloadMethods) {

	return Backbone.Model.extend(_.chain(autoloadMethods).clone().extend({
        eventName: 'change'
    }).value());
}); 
