define([
    'backbone',
    'underscore',
    'fuelux/wizard'
], function(Backbone, _) {

    return Backbone.View.extend({

        initialize: function(options){
            this.template = options.template;
            this.i18n = options.i18n;
            this.steps = options.steps;
            this.renderOptions = options.renderOptions;
        },

        render: function(){
            this.$el.html(this.template({
                renderOptions: this.renderOptions,
                steps: this.steps,
                i18n: this.i18n
            }));

            this.$wizard = this.$('.wizard');

            _.each(this.steps, function(step){
                step.view = new step.constructor({
                    el: this.$('.'+ step.class)
                });
            }, this);
        },

        renderActiveStep: function(){
            this.getStepByAttribute({active: 'active'}).view.render();
        },

        getStepByAttribute: function(attributeHash){
            return _.findWhere(this.steps, attributeHash);
        }
    });
});