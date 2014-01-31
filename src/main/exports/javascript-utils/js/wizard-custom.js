define([
    'backbone',
    'underscore',
    'fuelux/wizard'
], function(Backbone, _) {

    return Backbone.View.extend({

        initialize: function(options){
            _.bindAll(this, 'handleStepChange', 'handleStepChanged', 'handleStepClick', 'handleFinished');

            this.template = options.template;
            this.i18n = options.i18n;
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
                i18n: this.i18n
            }));

            this.$wizard = this.$('.wizard');

            _.each(this.steps, function(step){
                step.view = new step.constructor({
                    el: this.$('.'+ step.class)
                });
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