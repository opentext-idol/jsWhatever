define([
    'js-utils/js/confirm',
    'jasmine-jquery'
], function(confirm) {

    describe('Confirm function', function() {
        var waitTime = 2000;

        function modalToOpen() {
            return $('.modal').length > 0;
        }

        function modalToClose() {
            return $('.modal').length === 0;
        }

        function wrapConfirmOptions(options) {
            return function() {
                confirm(options);
            };
        }

        function openModalWithOptions(options) {
            runs(function() {
                confirm(options);
            });

            waitsFor('modal to open', modalToOpen, waitTime);
        }

        afterEach(function() {
            runs(function() {
                $('.confirm-test').remove();
                $('.modal').modal('hide');
            });

            waitsFor('modal to close', modalToClose, waitTime);
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

        it('should throw when passing "showButtons" without both of "cancelText" or "okText"', function() {
            var baseOptions = {
                message: 'Are you sure you want to index this boring document?',
                okHandler: $.noop,
                showButtons: true,
                title: 'Indexing Confirm'
            };

            runs(function() {
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
            });

            waitsFor('modal to open', modalToOpen, waitTime);
        });

        it('should blur document active element on modal create', function() {
            runs(function() {
                $('body').append('<div class=confirm-test><button>TEST</button></div>');
                $('.confirm-test button').focus();
            });

            waitsFor('button to get focus', function() {
                return $('.confirm-test button').get(0) === document.activeElement;
            }, waitTime);

            runs(function() {
                confirm({
                    cancelText: 'Cancel',
                    okText: 'OK',
                    message: 'A message',
                    okHandler: $.noop,
                    title: 'A title'
                });
            });

            waitsFor('button to lose focus', function() {
                return $('.confirm-test button').get(0) !== document.activeElement;
            }, waitTime);
        });

        it('should open a modal with the correct title and message', function() {
            openModalWithOptions({
                cancelText: 'Cancel',
                okText: 'OK',
                message: 'Possum',
                okHandler: $.noop,
                title: 'Llama'
            });

            runs(function() {
                var $modal = $('.modal');
                expect($modal.find('.modal-header h3')).toHaveText('Llama');
                expect($modal.find('.modal-body p')).toHaveText('Possum');
            });
        });

        it('should add class passed in "modalClass" to the modal element', function() {
            openModalWithOptions({
                cancelText: 'Cancel',
                okText: 'OK',
                message: 'Are you sure?',
                modalClass: 'awesome-modal',
                okHandler: $.noop,
                title: 'Just click ok already.'
            });

            runs(function() {
                expect($('.modal')).toHaveClass('awesome-modal');
            });
        });

        it('should not be possible to close the modal if option "closable" is false', function() {
            openModalWithOptions({
                closable: false,
                cancelText: 'Cancel',
                okText: 'OK',
                message: 'Baboon',
                okHandler: $.noop,
                title: 'Tree'
            });

            runs(function() {
                expect($('.modal').find('button.close')).toHaveLength(0);
                $('.modal-backdrop').click();
            });

            waits(500);

            runs(function() {
                expect($('.modal')).toHaveLength(1);
            });
        });

        it('should remove the modal on clicking <a class="route"></a> in the modal', function() {
            openModalWithOptions({
                cancelText: 'Cancel',
                okText: 'OK',
                message: '<a class="route">A link!</a>',
                okHandler: $.noop,
                title: 'Link To Stuff'
            });

            runs(function() {
                var $a = $('.modal a');
                expect($a).toHaveLength(1);
                $a.click();
            });

            waitsFor('modal to close on clicking a', modalToClose, waitTime);
        });

        it('should show ok and cancel buttons if "showButtons" is not passed', function() {
            openModalWithOptions({
                cancelText: 'Cancel',
                okText: 'OK',
                message: 'A message.',
                okHandler: $.noop,
                title: 'A Title'
            });

            runs(function() {
                expect($('.modal .okButton')).toHaveLength(1);
                expect($('.modal .cancelButton')).toHaveLength(1);
            });
        });

        it('should not show cancel button if "showButtons" is passed as false when "closable" is not passed', function() {
            openModalWithOptions({
                cancelText: 'Cancel',
                message: 'A message.',
                showButtons: false,
                title: 'A Title'
            });

            runs(function() {
                expect($('.modal .okButton')).toHaveLength(1);
                expect($('.modal .cancelButton')).toHaveLength(0);
            });
        });

        it('should not show ok or cancel button if "showButtons" and "closable" are passed as false', function() {
            openModalWithOptions({
                closable: false,
                message: 'A message.',
                showButtons: false,
                title: 'A Title'
            });

            runs(function() {
                expect($('.modal .okButton')).toHaveLength(0);
                expect($('.modal .cancelButton')).toHaveLength(0);
            });
        });

        describe('when called with message, title, okHandler and cancelHandler', function() {
            beforeEach(function() {
                runs(function() {
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
                });

                waitsFor('modal to open', modalToOpen, waitTime);
            });

            it('should close the modal and call the okHandler on clicking the ok button', function() {
                runs(function() {
                    var $okButton = $('.modal .okButton');
                    expect($okButton).toHaveLength(1);
                    $okButton.click();
                });

                waitsFor('modal to close', modalToClose, waitTime);

                runs(function() {
                    expect(this.okHandler).toHaveBeenCalled();
                });
            });

            it('should close the modal and call the cancelHandler on clicking the cancel button', function() {
                runs(function() {
                    var $cancelButton = $('.modal .cancelButton');
                    expect($cancelButton).toHaveLength(1);
                    $cancelButton.click();
                });

                waitsFor('modal to close', modalToClose, waitTime);

                runs(function() {
                    expect(this.cancelHandler).toHaveBeenCalled();
                });
            });
        });
    });

});