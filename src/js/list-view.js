/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

/**
 * @module js-whatever/js/list-view
 */
define([
    'backbone',
    'js-whatever/js/list-item-view'
], function(Backbone, ListItemView) {

    /**
     * @typedef module:js-whatever/js/list-view.ListView~ListViewOptions
     * @property {Backbone.Collection} collection The collection containing the items to render
     * @property {boolean} [useCollectionChange=true] Whether to re-render the associated ItemView when the collection
     * fires a change event. This is more efficient than creating one change listener for each model.
     * @property {function} [ItemView=ListItemView] The Backbone.View constructor to instantiate for each model
     * @property {object} [itemOptions={}] The options to pass to the ItemView constructor in addition to the model
     * @property {String[]} [proxyEvents=[]] Events to proxy from ItemViews, prefixed with 'item:'
     */
    /**
     * @name module:js-whatever/js/list-view.ListView
     * @desc View representing a Backbone.Collection. Renders one ItemView for each model, and re-renders in response
     * to collection events
     * @constructor
     * @param {module:js-whatever/js/list-view.ListView~ListViewOptions} options
     * @extends Backbone.View
     */
    return Backbone.View.extend(/** @lends module:js-whatever/js/list-view.ListView.prototype */{
        initialize: function(options) {
            this.itemOptions = options.itemOptions || {};
            this.ItemView = options.ItemView || ListItemView;
            this.proxyEvents = options.proxyEvents || [];

            this.views = {};

            this.listenTo(this.collection, 'add', this.onAdd);
            this.listenTo(this.collection, 'remove', this.onRemove);
            this.listenTo(this.collection, 'sort', this.onSort);
            this.listenTo(this.collection, 'reset', this.render);

            if (options.useCollectionChange || _.isUndefined(options.useCollectionChange)) {
                this.listenTo(this.collection, 'change', this.onChange);
            }
        },

        render: function() {
            this.removeViews();
            var $fragment = $(document.createDocumentFragment());

            this.collection.each(function(model) {
                var view = this.createItemView(model);
                $fragment.append(view.el);
            }, this);

            this.$el.append($fragment);
            return this;
        },

        /**
         * @desc Instantiates and renders an ItemView for the given model. Adds it to the map of model cid to ItemView.
         * @param model The model which needs a view
         * @returns {ItemView} The new ItemView
         */
        createItemView: function(model) {
            var view = this.views[model.cid] = new this.ItemView(_.extend({
                model: model
            }, this.itemOptions));

            _.each(this.proxyEvents, function(event) {
                this.listenTo(view, event, function() {
                    this.trigger.apply(this, ['item:' + event].concat(Array.prototype.slice.call(arguments, 0)));
                });
            }, this);

            view.render();
            return view;
        },

        /**
         * @desc Callback called when a model is added to the collection
         * @param {Backbone.Model} model The model added to the collection
         */
        onAdd: function(model) {
            var view = this.createItemView(model);
            this.$el.append(view.el);
        },

        /**
         * @desc Callback called when the collection fires a change event. Re-renders the associated ItemView.
         * @param {Backbone.Model} model The model that was changed
         */
        onChange: function(model) {
            this.views[model.cid].render();
        },

        /**
         * @desc Callback called when a model is removed from the collection
         * @param {Backbone.Model} model The model that was removed from the collection
         */
        onRemove: function(model) {
            var view = this.views[model.cid];
            this.removeView(view);
        },

        /**
         * @desc Callback called when the collection is sorted. This will reorder the ItemViews to reflect the new
         * collection order
         */
        onSort: function() {
            var $previous;

            this.collection.each(function(model) {
                var $item = this.views[model.cid].$el;

                if ($previous) {
                    $previous = $item.insertAfter($previous);
                } else {
                    $previous = $item.prependTo(this.$el);
                }
            }, this);
        },

        /**
         * @desc Backbone.View remove method. Also calls each ItemView's remove method.
         */
        remove: function() {
            this.removeViews();
            Backbone.View.prototype.remove.call(this);
        },

        /**
         * Remove the view and stopListening to it
         * @param view The view to remove
         */
        removeView: function(view) {
            view.remove();
            this.stopListening(view);
        },

        /**
         * @desc Call each ItemView's remove method and reset the map of views.
         */
        removeViews: function() {
            _.each(this.views, this.removeView, this);
            this.views = {};
        }
    });

});
