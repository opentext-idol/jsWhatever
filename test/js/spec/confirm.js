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

define([
    'underscore',
    'jquery',
    'js-whatever/js/confirm',
    'jasmine-jquery'
], function(_, $, confirm) {
    'use strict';

    describe('Confirm function', function() {
        var waitTime = 300;

        function modalToOpen() {
            return $('.modal').length === 1;
        }

        function modalToClose() {
            return $('.modal').length === 0;
        }

        function waitFor(condition, callback, context) {
            setTimeout(_.bind(function() {
                expect(condition()).toBeTruthy();

                if(condition) {
                    callback.call(context);
                }
            }, context), waitTime);
        }

        function wrapConfirmOptions(options) {
            return function() {
                confirm(options);
            };
        }

        function openModalWithOptions(options, callback) {
            confirm(options);

            waitFor(modalToOpen, callback);
        }

        afterEach(function(done) {
            $('.confirm-test').remove();
            $('.modal').modal('hide');

            waitFor(modalToClose, done);
        });

        it('should throw when calling without a message', function() {
            expect(wrapConfirmOptions({
                okHandler: $.noop,
                title: 'Deletion Warning'
            })).toThrow();
        });

        it('should throw when calling without a title', function() {
            expect(wrapConfirmOptions({
                message: 'Are you sure you want to delete all of everything everywhere?',
                okHandler: $.noop
            })).toThrow();
        });

        it('should throw when passing "closable" without "cancelText"', function() {
            expect(wrapConfirmOptions({
                closable: true,
                message: 'DO IT',
                okHandler: $.noop,
                title: 'Revoke License?'
            })).toThrow();
        });

        it('should throw when passing "showButtons" without "okHandler"', function() {
            expect(wrapConfirmOptions({
                message: 'Are you sure?',
                okHandler: $.noop,
                okText: 'You are sure, I can see it in your eyes',
                showButtons: true,
                title: 'Deletion Warning'
            })).toThrow();
        });

        it('should throw when passing "showButtons" without both of "cancelText" or "okText"', function(done) {
            var baseOptions = {
                message: 'Are you sure you want to index this boring document?',
                okHandler: $.noop,
                showButtons: true,
                title: 'Indexing Confirm'
            };

            expect(wrapConfirmOptions(baseOptions)).toThrow();

            expect(wrapConfirmOptions(_.extend({
                cancelText: 'Probably not thanks.'
            }, baseOptions))).toThrow();

            expect(wrapConfirmOptions(_.extend({
                okText: 'Do it do it do it!'
            }, baseOptions))).toThrow();

            expect(wrapConfirmOptions(_.extend({
                cancelText: 'Not today',
                okText: 'Do it do it do it!'
            }, baseOptions))).not.toThrow();

            waitFor(modalToOpen, done);
        });

        it('should blur document active element on modal create', function(done) {
            $('body').append('<div class=confirm-test><button>TEST</button></div>');
            $('.confirm-test button').focus();

            waitFor(function() {
                    return $('.confirm-test button').get(0) === document.activeElement;
                }, function() {
                    confirm({
                        cancelText: 'Cancel',
                        okText: 'OK',
                        message: 'A message',
                        okHandler: $.noop,
                        title: 'A title'
                    });

                    waitFor(function() {
                        return $('.confirm-test button').get(0) !== document.activeElement;
                    }, done);
                }
            );

        });

        it('should open a modal with the correct title and message', function(done) {
            openModalWithOptions({
                cancelText: 'Cancel',
                okText: 'OK',
                message: 'Possum',
                okHandler: $.noop,
                title: 'Llama'
            }, function() {
                var $modal = $('.modal');
                expect($modal.find('.modal-header h3')).toHaveText('Llama');
                expect($modal.find('.modal-body p')).toHaveText('Possum');
                done()
            });
        });

        it('should add class passed in "modalClass" to the modal element', function(done) {
            openModalWithOptions({
                cancelText: 'Cancel',
                okText: 'OK',
                message: 'Are you sure?',
                modalClass: 'awesome-modal',
                okHandler: $.noop,
                title: 'Just click ok already.'
            }, function() {
                expect($('.modal')).toHaveClass('awesome-modal');
                done();
            });
        });

        it('should not be possible to close the modal if option "closable" is false', function(done) {
            openModalWithOptions({
                closable: false,
                cancelText: 'Cancel',
                okText: 'OK',
                message: 'Baboon',
                okHandler: $.noop,
                title: 'Tree'
            }, function() {
                expect($('.modal').find('button.close')).toHaveLength(0);
                $('.modal-backdrop').click();

                setTimeout(function() {
                    expect($('.modal')).toHaveLength(1);

                    if($('.modal').length === 1) {
                        done();
                    }
                }, 500)
            });
        });

        it('should remove the modal on clicking <a class="route"></a> in the modal', function(done) {
            openModalWithOptions({
                cancelText: 'Cancel',
                okText: 'OK',
                message: '<a class="route">A link!</a>',
                okHandler: $.noop,
                title: 'Link To Stuff'
            }, function() {
                var $a = $('.modal a');
                expect($a).toHaveLength(1);
                $a.click();

                waitFor(modalToClose, done);
            });
        });

        it('should show ok and cancel buttons if "showButtons" is not passed', function(done) {
            openModalWithOptions({
                cancelText: 'Cancel',
                okText: 'OK',
                message: 'A message.',
                okHandler: $.noop,
                title: 'A Title'
            }, function() {
                expect($('.modal .okButton')).toHaveLength(1);
                expect($('.modal .cancelButton')).toHaveLength(1);
                done();
            });
        });

        it('should not show cancel button if "showButtons" is passed as false when "closable" is not passed', function(done) {
            openModalWithOptions({
                okText: 'OK',
                message: 'A message.',
                showButtons: false,
                title: 'A Title'
            }, function() {
                expect($('.modal .okButton')).toHaveLength(1);
                expect($('.modal .cancelButton')).toHaveLength(0);
                done();
            });
        });

        it('should not show ok or cancel button if "showButtons" and "closable" are passed as false', function(done) {
            openModalWithOptions({
                closable: false,
                message: 'A message.',
                showButtons: false,
                title: 'A Title'
            }, function() {
                expect($('.modal .okButton')).toHaveLength(0);
                expect($('.modal .cancelButton')).toHaveLength(0);
                done();
            });
        });

        describe('when called with message, title, okHandler and cancelHandler', function() {
            beforeEach(function(done) {
                this.okHandler = jasmine.createSpy('okHandler');
                this.cancelHandler = jasmine.createSpy('cancelHandler');

                confirm({
                    cancelHandler: this.cancelHandler,
                    cancelText: 'Cancel',
                    message: 'Jeremy asks you to click a button.',
                    okHandler: this.okHandler,
                    okText: 'Click me',
                    title: 'Choose a Button'
                });

                waitFor(modalToOpen, done);
            });

            it('should close the modal and call the okHandler on clicking the ok button', function(done) {
                var $okButton = $('.modal .okButton');
                expect($okButton).toHaveLength(1);
                $okButton.click();

                waitFor(modalToClose, function() {
                    expect(this.okHandler).toHaveBeenCalled();
                    done();
                }, this)
            });

            it('should close the modal and call the cancelHandler on clicking the cancel button', function(done) {
                var $cancelButton = $('.modal .cancelButton');
                expect($cancelButton).toHaveLength(1);
                $cancelButton.click();

                waitFor(modalToClose, function() {
                    expect(this.cancelHandler).toHaveBeenCalled();
                    done();
                }, this);
            });
        });
    });
});
