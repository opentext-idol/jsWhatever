/*
 * (c) Copyright 2013-2017 Micro Focus or one of its affiliates.
 *
 * Licensed under the MIT License (the "License"); you may not use this file
 * except in compliance with the License.
 *
 * The only warranties for products and services of Micro Focus and its affiliates
 * and licensors ("Micro Focus") are as may be set forth in the express warranty
 * statements accompanying such products and services. Nothing herein should be
 * construed as constituting an additional warranty. Micro Focus shall not be
 * liable for technical or editorial errors or omissions contained herein. The
 * information contained herein is subject to change without notice.
 */

/**
 * @module js-whatever/js/filtering-collection
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    function getTrackedAttributes(trackedModel) {
        return this.attributes
            ? trackedModel.pick.apply(trackedModel, this.attributes)
            : trackedModel.attributes;
    }

    function createTrackingModel(trackedModel) {
        return new this.model(getTrackedAttributes.call(this, trackedModel), {trackedModel: trackedModel});
    }

    function getTrackingModel(trackedModel) {
        return this.find(function(currentModel) {
            return currentModel.trackedModel === trackedModel;
        });
    }

    function getFilteredModels() {
        var filteredModels = this.collection.filter(function(model) {
            return this.modelFilter(model, this.filters);
        }, this);

        return _.map(filteredModels, function(model) {
            return createTrackingModel.call(this, model);
        }, this);
    }

    function removeModel(model) {
        this.remove(model);
        model.stopListening();
    }

    /**
     * @callback module:js-whatever/js/filtering-collection.FilteringCollection~modelFilter
     * @param {Backbone.Model} model The model to check against the filter
     * @param {Object} filters Filters data
     * @returns {Boolean} True if the model passes the filter, false if not
     */
    /**
     * @typedef module:js-whatever/js/filtering-collection.FilteringCollection~FilteringCollectionOptions
     * @property {Backbone.Collection} collection The collection to track
     * @property {module:js-whatever/js/filtering-collection.FilteringCollection~modelFilter} modelFilter
     * @property {Object} [filters={}] Initial filters data which will be passed to the modelFilter
     */
    /**
     * @name module:js-whatever/js/filtering-collection.FilteringCollection
     * @desc Collection which tracks another collection. Models added to the tracked collection are only added to the
     * FilteringCollection if they pass the modelFilter function. If the tracked model changes, the modelFilter is applied
     * again and if it passes the new attributes are set on the tracking model, or if it fails the model is removed.
     * Models removed from the tracked collection are removed from the FilteringCollection.
     * @constructor
     * @param {Backbone.Model[]} models Initial models
     * @param {module:js-whatever/js/filtering-collection.FilteringCollection~FilteringCollectionOptions} Options for the filtering collection
     * @extends Backbone.Collection
     */
    return Backbone.Collection.extend(/** @lends module:js-whatever/js/filtering-collection.FilteringCollection.prototype */{
        initialize: function(models, options) {
            this.attributes = options.attributes;
            this.collection = options.collection;
            this.filters = options.filters || {};
            this.modelFilter = options.modelFilter;

            this.listenTo(this.collection, 'add', function(trackedModel) {
                if(this.modelFilter(trackedModel, this.filters)) {
                    this.add(createTrackingModel.call(this, trackedModel));
                }
            });

            this.listenTo(this.collection, 'change', function(trackedModel) {
                var existingModel = getTrackingModel.call(this, trackedModel);

                if(existingModel) {
                    if(this.modelFilter(trackedModel, this.filters)) {
                        existingModel.set(getTrackedAttributes.call(this, trackedModel));
                    } else {
                        removeModel.call(this, existingModel);
                    }
                } else if(this.modelFilter(trackedModel, this.filters)) {
                    this.add(createTrackingModel.call(this, trackedModel));
                }
            });

            this.listenTo(this.collection, 'remove', function(trackedModel) {
                var trackingModel = getTrackingModel.call(this, trackedModel);

                if(trackingModel) {
                    removeModel.call(this, trackingModel);
                }
            });

            this.listenTo(this.collection, 'reset', function() {
                this.reset(getFilteredModels.call(this));
            });

            _.each(getFilteredModels.call(this), function(model) {
                models.push(model);
            });
        },

        /**
         * @desc Updates the filters data to the method parameter and re-filters the collection
         * @param {Object} filters New filters data
         */
        filter: function(filters) {
            this.filters = filters;
            this.reset(getFilteredModels.call(this));
        },

        model: Backbone.Model.extend({
            initialize: function(attributes, options) {
                this.trackedModel = options.trackedModel;
            }
        })
    });
});
