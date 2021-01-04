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
 * @module js-whatever/js/confirm-view
 */
define([
    'underscore',
    'backbone',
    'text!js-whatever/templates/confirm.html',
    'bootstrap'
], function(_, Backbone, template) {
    'use strict';

    /**
     * @typedef ConfirmViewOptions
     * @property {string} message Message to be displayed
     * @property {string} title Modal title
     * @property {string} [okText] Text for the OK button. Must be defined if showButtons or closable are set to
     * true
     * @property {string} [cancelText] Text for the Cancel button. Must be defined if showButtons is set to true
     * @property {function} [okHandler] Function called when the OK button is clicked. If showButtons is set to
     * true, this must be defined
     * @property {function} [cancelHandler] Function called when the Cancel button is clicked
     * @property {string} [modalClass] Class added to modal after rendering
     * @property {string} [cancelClass=btn-danger] Cancel button class
     * @property {string} [cancelIcon=glyphicon-remove] Cancel button icon
     * @property {boolean} [closable=true] Set to true if the modal can be closed. If show buttons is true the modal
     * can still be closed using the buttons
     * @property {string} [okClass=btn-success] OK button class
     * @property {string} [okIcon=glyphicon-ok] OK button icon
     * @property {boolean} [showButtons=true] Set to true if the modal should have OK and Cancel buttons
     * @property {string} [hiddenEvent=hidden.bs.modal] The Bootstrap event to listen for when the
     * modal is hidden. Override if using Bootstrap 3
     */
    /**
     * @name module:js-whatever/js/confirm-view.ConfirmView
     * @desc Creates a Bootstrap modal which presents a message and the option to click OK and Cancel. By default it
     * uses Bootstrap 2 classes, but can be overridden for Bootstrap 3
     * @constructor
     * @param {ConfirmViewOptions} config
     * @extends Backbone.View
     */
    return Backbone.View.extend(/** @lends module:js-whatever/js/confirm-view.ConfirmView.prototype */{
        /**
         * @desc {function} Default template, which can be overridden
         */
        template: _.template(template),

        /**
         * @desc {string} Initial classes for the modal
         */
        className: 'modal hide fade',

        initialize: function(config) {
            _.bindAll(this, 'remove');

            this.config = _.defaults(config, {
                cancelClass: 'btn-danger',
                cancelIcon: 'glyphicon-remove',
                closable: true,
                okClass: 'btn-success',
                okIcon: 'glyphicon-ok',
                showButtons: true,
                hiddenEvent: 'hidden.bs.modal'
            });

            if(!this.config.message) {
                throw 'Confirm Error: message must be defined';
            }

            if(!this.config.title) {
                throw 'Confirm Error: title must be defined in input';
            }

            if(this.config.showButtons && !this.config.okHandler) {
                throw 'Confirm Error: okHandler must be defined when buttons are shown';
            }

            if(this.config.showButtons && (!this.config.okText || !this.config.cancelText)) {
                throw 'Confirm Error: strings must be defined for the ok and cancel buttons when buttons are shown';
            }

            if(this.config.closable && !this.config.okText) {
                throw 'Confirm Error: okText string must be defined if closable is true';
            }

            this.$el.on('show.bs.modal', _.bind(function() {
                document.activeElement.blur();
                this.$('.okButton').focus();
            }, this));

            this.render();
        },

        /**
         * @desc Renders the modal and add listeners to the buttons. Links with the class 'route' will cause the modal
         * to hide.
         */
        render: function() {
            var config = this.config;

            this.$el.html(this.template({
                config: config
            }));

            if(config.modalClass) {
                this.$el.addClass(config.modalClass);
            }

            if(!config.closable) {
                this.$el.data('backdrop', 'static').addClass('undismissable-modal');
            }

            this.$el.modal().on(this.config.hiddenEvent, this.remove);

            this.$('.modal-body a.route').click(_.bind(function() {
                this.$el.modal('hide');
            }, this));

            if(config.okHandler) {
                //pass in value to be used as jquery binding
                var okButton = this.$('.okButton');
                okButton.click(_.wrap(config.okHandler, _.bind(this.handleButton, this, okButton.get(0))));
            }

            if(config.cancelHandler) {
                var cancelButton = this.$('.cancelButton');
                cancelButton.click(_.wrap(config.cancelHandler, _.bind(this.handleButton, this, cancelButton.get(0))));
            }
        },

        /**
         * @desc Calls a handler function with a given element as the context
         * @param element The element which has been clicked
         * @param handler The handler function
         * @protected
         */
        handleButton: function(element, handler) {
            // don't want to pass element or handler to the handler
            var args = _.toArray(arguments).slice(2);

            //wait for popup or we exceed the call stack size if okHandler opens another modal (such as load mask)
            this.$el.on(this.config.hiddenEvent, function() {
                handler.apply(element, args);
            });
        },

        /**
         * @desc Hides the modal and removes it from the DOM
         */
        remove: function() {
            if(this.$el && this.$el.hasClass('in')) {
                this.$el.modal('hide');
            }

            Backbone.View.prototype.remove.call(this);
        }
    });
});
