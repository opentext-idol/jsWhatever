define([
    'backbone',
    'text!js-utils/templates/confirm.html',
    'underscore',
    'bootstrap'
], function(Backbone, template){

    return Backbone.View.extend({
        template: _.template(template),

        className: 'modal hide fade',

        initialize: function(config) {
            _.bindAll(this, 'remove');

            this.config = _.defaults(config, {
                cancelClass: 'btn-danger',
                cancelIcon: 'icon-remove',
                closable: true,
                okClass: 'btn-success',
                okIcon: 'icon-ok',
                showButtons: true,
                hiddenEvent: 'hidden'
            });

            if(!this.config.message) {
                throw 'Confirm Error: message must be supplied in input';
            }

            if(!this.config.okHandler && this.config.showButtons) {
                throw 'Confirm Error: okHandler must be supplied in input when buttons are shown';
            }

            if(!this.config.title) {
                throw 'Confirm Error: title must be provided in input';
            }

            if(this.config.showButtons && (!this.config.okText || !this.config.cancelText)) {
                throw 'Confirm Error: strings must be provided for the ok and cancel buttons in input, if showButtons is set';
            }

            if(this.config.closable && !this.config.cancelText) {
                throw 'Confirm Error: cancel button string must be provided in input if closable is true';
            }

            this.$el.on('shown', _.bind(function() {
                document.activeElement.blur();
                this.$('.okButton').focus();
            }, this));

            this.render();
        },

        render: function() {
            var config = this.config;

            this.$el.html(this.template({
                config: config
            }));

            if (config.modalClass) {
                this.$el.addClass(config.modalClass);
            }

            if(!config.closable) {
                this.$el.data('backdrop', 'static').addClass('undismissable-modal');
            }

            this.$el.modal().on(this.config.hiddenEvent, this.remove);

            this.$('.modal-body a.route').click(_.bind(function(){
                this.$el.modal('hide');
            }, this));

            if (config.okHandler) {
                //pass in value to be used as jquery binding
                var okButton = this.$('.okButton');
                okButton.click(_.wrap(config.okHandler, _.bind(this.handleButton, this, okButton.get(0))));
            }

            if (config.cancelHandler) {
                var cancelButton = this.$('.cancelButton');
                cancelButton.click(_.wrap(config.cancelHandler, _.bind(this.handleButton, this, cancelButton.get(0))));
            }
        },

        handleButton: function(element, handler) {
            // don't want to pass element or handler to the handler
            var args = _.toArray(arguments).slice(2);

            //wait for popup or we exceed the call stack size if okHandler opens another modal (such as load mask)
            this.$el.on(this.config.hiddenEvent, function() {
                handler.apply(element, args);
            });
        },

        remove: function () {
            if (this.$el && this.$el.hasClass('in')) {
                this.$el.modal('hide');
            }

            Backbone.View.prototype.remove.call(this);
        }
    });
});