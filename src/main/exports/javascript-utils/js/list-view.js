define([
    'backbone'
], function(Backbone) {

    var defaultItemFilter = function(model) {
        return true;
    };

    // Takes a Backbone Collection and renders one itemTemplate for each Model
    // If the collection has a comparator, they are maintained in the correct order
    // If an itemFilter is provided, only models which pass the filter are displayed

    return Backbone.View.extend({
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

        // Call this function each time the filter conditions update
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

        getItem: function(model) {
            var $item = $(this.itemTemplate(_.extend({
                data: _.clone(model.attributes)
            }, this.itemTemplateOptions)));

            $item.attr('data-cid', model.cid);
            return $item;
        },

        onAdd: function(model) {
            if (this.itemFilter(model)) {
                this.$el.append(this.getItem(model));
            }
        },

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

        onRemove: function(model) {
            this.$('[data-cid="' + model.cid + '"]').remove();
        },

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
