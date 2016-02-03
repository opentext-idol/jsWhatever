define([
    'backbone',
    'jquery',
    'text!js-whatever/templates/modal.html',
    'bootstrap'
], function(Backbone, $, modalHtml) {

    var modalTemplate = _.template(modalHtml);

    return Backbone.View.extend({
        className: 'modal fade',

        events: {
            'hidden.bs.modal': 'remove',
            'click .modal-action-button': function() {
                this.actionButtonCallback();
            }
        },

        initialize: function(options) {
            // The title and actionButtonText are escaped but content is not
            this.actionButtonCallback = options.actionButtonCallback;
            this.actionButtonClass = options.actionButtonClass;
            this.actionButtonText = options.actionButtonText;
            this.content = options.content;
            this.contentView = options.contentView;
            this.title = options.title;
            this.secondaryButtonText = options.secondaryButtonText;
            this.render();
        },

        render: function() {
            $(document.activeElement).blur();

            this.$el.html(modalTemplate({
                actionButtonClass: this.actionButtonClass,
                actionButtonText: this.actionButtonText,
                secondaryButtonText: this.secondaryButtonText,
                title: this.title
            })).modal();

            if (this.content) {
                this.$('.modal-body').html(this.content);
            } else if (this.contentView) {
                this.contentView.render();
                this.$('.modal-body').append(this.contentView.$el);
            }
        },

        hide: function() {
            this.$el.modal('hide');
        }
    });

});