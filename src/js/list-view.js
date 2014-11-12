/**
 * @module js-utils/js/list-view
 */
define([
    'backbone'
], function(Backbone) {

    var defaultItemFilter = function() {
        return true;
    };

    /**
     * @typedef ListViewOptions
     * @property {Backbone.Collection} collection The collection containing the items to render
     * @property {function} [itemFilter = function() { return true; }] Function which takes a model from the
     * collection and returns true if it should be rendered
     * @property {function} itemTemplate Template function, called once per model to render it
     * @property {object} [itemTemplateOptions={}] Options passed to itemTemplate
     */
    /**
     * @name module:js-utils/js/list-view.ListView
     * @desc View representing a Backbone.Collection. Re-renders items in response to changes in the collection
     * @constructor
     * @param {ListViewOptions} options
     * @extends Backbone.View
     */
    return Backbone.View.extend(/** @lends module:js-utils/js/list-view.ListView.prototype */{

        initialize: function(options) {
            this.itemFilter = options.itemFilter || defaultItemFilter;
            this.itemTemplate = options.itemTemplate;
            this.itemTemplateOptions = options.itemTemplateOptions || {};

            this.listenTo(this.collection, 'add', this.onAdd);
            this.listenTo(this.collection, 'change', this.onChange);
            this.listenTo(this.collection, 'remove', this.onRemove);
            this.listenTo(this.collection, 'sort', this.onSort);
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function() {
            this.$el.empty();
            this.collection.each(this.onAdd, this);
            return this;
        },

        /**
         * @desc Call this function each time the filter conditions update. Removes renderings of views which no longer
         * match the filter, and adds ones which do
         */
        filter: function() {
            var $previous;

            this.collection.each(function(model) {
                var $item = this.$('[data-cid="' + model.cid + '"]');
                var matchesFilter = this.itemFilter(model);

                if (matchesFilter) {
                    if (!$item.length) {
                        $item = this.getItem(model);
                    }

                    if ($previous) {
                        $previous = $item.insertAfter($previous);
                    } else {
                        $previous = $item.prependTo(this.$el);
                    }
                } else {
                    if ($item.length) {
                        $item.remove();
                    }
                }
            }, this);
        },

        /**
         * @desc Returns an HTML rendering of a model
         * @param {Backbone.Model} model The model to render
         * @returns {jQuery} A jQuery object
         * @protected
         */
        getItem: function(model) {
            var $item = $(this.itemTemplate(_.extend({
                data: _.clone(model.attributes)
            }, this.itemTemplateOptions)));

            $item.attr('data-cid', model.cid);
            return $item;
        },

        /**
         * @desc Callback called when a model is added to the collection
         * @param {Backbone.Model} model The model added to the collection
         */
        onAdd: function(model) {
            if (this.itemFilter(model)) {
                this.$el.append(this.getItem(model));
            }
        },

        /**
         * @desc Callback called when a model fires a change event
         * @param {Backbone.Model} model The model that fired the change event
         */
        onChange: function(model) {
            var $existing = this.$('[data-cid="' + model.cid + '"]');

            if (this.itemFilter(model)) {
                var $item = this.getItem(model);

                if ($existing.length) {
                    $existing.replaceWith($item);
                } else {
                    this.$el.append($item);
                }
            } else {
                $existing.remove();
            }
        },

        /**
         * @desc Callback called when a model is removed from the collection
         * @param {Backbone.Model} model The model that was removed from the collection
         */
        onRemove: function(model) {
            this.$('[data-cid="' + model.cid + '"]').remove();
        },

        /**
         * @desc Callback called when the collection is sorted. This will reorder the model renderings to reflect the
         * new collection order
         */
        onSort: function() {
            var $previous;

            this.collection.each(function(model) {
                var $model = this.$('[data-cid="' + model.cid + '"]');

                if ($model.length) {
                    if ($previous) {
                        $previous = $model.insertAfter($previous);
                    } else {
                        $previous = $model.prependTo(this.$el);
                    }
                }
            }, this);
        }
    });

});
