/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

/**
 * @module js-whatever/js/autoload
 */
define([
    'underscore',
    'backbone',
    'js-whatever/js/autoload-methods'
], function(_, Backbone, autoloadMethods) {
    'use strict';

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
