/*
 * Copyright 2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'underscore',
    'jquery',
    'backbone',
    'text!js-whatever/templates/modal.html',
    'bootstrap'
], function(_, $, Backbone, modalHtml) {
    'use strict';

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

            this.showFooter = _.isUndefined(options.showFooter) || options.showFooter;

            this.render();

            this.listenTo(this.contentView, 'primary-button-disable', function() {
                this.$('.modal-footer .button-primary').addClass('not-clickable disabled');
            });

            this.listenTo(this.contentView, 'primary-button-enable', function() {
                this.$('.modal-footer .button-primary').removeClass('not-clickable disabled');
            });
        },

        render: function() {
            $(document.activeElement).blur();

            this.$el.html(modalTemplate({
                actionButtonClass: this.actionButtonClass,
                actionButtonText: this.actionButtonText,
                secondaryButtonText: this.secondaryButtonText,
                showFooter: this.showFooter,
                title: this.title
            })).modal();

            if(this.content) {
                this.$('.modal-body').html(this.content);
            } else if(this.contentView) {
                this.contentView.render();
                this.$('.modal-body').append(this.contentView.$el);
            }
        },

        hide: function() {
            this.$el.modal('hide');
        }
    });
});
