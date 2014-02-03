define([
    'backbone',
    'underscore',
    'text!js-utils/templates/wizard/wizard.html',
    'fuelux/wizard'
], function(Backbone, _, template) {

    return Backbone.View.extend({

        template: _.template(template),

        initialize: function(options){
            _.bindAll(this, 'handleStepChange', 'handleStepChanged', 'handleStepClick', 'handleFinished');

            if (options.template) {
                this.template = options.template;
            }

            this.strings = options.strings;
            this.steps = options.steps;
            this.renderOptions = options.renderOptions;

            if(options.onStepChange) {
                this.handleStepChange = options.onStepChange;
            }

            if(options.onStepChanged) {
                this.handleStepChanged = options.onStepChanged;
            }

            if(options.onStepClick) {
                this.handleStepClick = options.onStepClick;
            }

            if(options.onFinished) {
                this.handleFinished = options.onFinished;
            }
        },

        render: function(){
            this.$el.html(this.template({
                renderOptions: this.renderOptions,
                steps: this.steps,
                strings: this.strings
            }));

            this.$wizard = this.$('.wizard');

            _.each(this.steps, function(step){
                var options = step.options || {};

                step.view = new step.constructor(_.defaults({
                    el: this.$('.'+ step.class)
                }, options));
            }, this);

            this.$wizard.on('change', this.handleStepChange);
            this.$wizard.on('changed', this.handleStepChanged);
            this.$wizard.on('stepclick', this.handleStepClick);
            this.$wizard.on('finished', this.handleFinished);
        },

        // takes 1 based arguments to match fuelux
        getStep: function(index) {
            return this.steps[index - 1];
        },

        getCurrentStep: function() {
            return this.getStep(this.$wizard.wizard('selectedItem').step);
        },

        renderActiveStep: function(){
            this.getStepByAttribute({active: true}).view.render();
        },

        getStepByAttribute: function(attributeHash){
            return _.findWhere(this.steps, attributeHash);
        },

        // if you want to override this function you should probably call this as the first line of your function
        handleStepChange: function(e, wizardObj) {
            var newStepNumber = wizardObj.step + (wizardObj.direction === 'next' ? 1 : -1);
            var newStep = this.getStep(newStepNumber);

            if(newStep.view.$el.children().length === 0){
                newStep.view.render();
            }
        },

        handleStepChanged: $.noop,

        handleStepClick: $.noop,

        handleFinished: $.noop
    });
});