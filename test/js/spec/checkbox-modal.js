define([
    'js-utils/js/checkbox-modal',
    'text!js-utils/templates/checkbox-modal/radio-table.html',
    'jasmine-jquery'
], function(CheckboxModal, radioTemplate) {

    var i18n = {
        modalHeader: 'Modal Header',
        tableTitle: 'My Table'
    };

    var vent = jasmine.createSpyObj('vent', ['on']);

    describe('Checkbox modal', function() {
        describe('with a single table', function() {
            describe('with checkboxes', function() {
                describe('with initialState true', function() {
                    beforeEach(function() {
                        this.modal = new CheckboxModal({
                            i18n: i18n,
                            vent: vent,
                            parameters: {
                                modalHeader: 'modalHeader'
                            },
                            tables: [{
                                initialState: true,
                                tableHeader: 'tableTitle',
                                rows: [
                                    'one',
                                    'two',
                                    'three'
                                ]
                            }]
                        });
                    });

                    it('should set the initial values correctly', function() {
                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toBe(true);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(true);
                    });

                    it('should set the nth checkbox correctly', function() {
                        this.modal.setNthCheckbox(0, 2, false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(false);
                    });

                    it('should set checkboxes by name correctly', function() {
                        this.modal.setCheckbox(0, 'two', false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(false);
                    });

                    it('should set all checkboxes correctly', function() {
                        this.modal.setCheckboxes(0, false);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(false);
                    });

                    it('should clear all checkboxes correctly', function() {
                        this.modal.clearAllCheckboxes();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(false);

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toBe(false);
                    });

                    it('should mark the global checkbox indeterminate correctly', function() {
                        this.modal.setIndeterminateCheckbox(0, true);

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toBe(true);
                    });

                    it('should get the selected rows correctly', function() {
                        expect(this.modal.getSelectedRows()).toEqual([['one','two','three']]);
                    });

                    it('should handle changes correctly', function() {
                        this.modal.editModal.find('[data-row-name="one"]').click().change();

                        // we don't check the value of the checked property as phantom differs in behaviour to other browsers

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toBe(true);

                        expect(this.modal.getSelectedRows()).toEqual([['two','three']]);
                    });

                    it('should handle changes to the global checkbox correctly', function() {
                        this.modal.editModal.find('[data-row-name=""]').click().change();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toBe(false);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(false);
                    });
                });

                describe('with initialState false', function() {
                    beforeEach(function() {
                        this.modal = new CheckboxModal({
                            i18n: i18n,
                            vent: vent,
                            parameters: {
                                modalHeader: 'modalHeader'
                            },
                            tables: [{
                                initialState: false,
                                tableHeader: 'tableTitle',
                                rows: [
                                    'one',
                                    'two',
                                    'three'
                                ]
                            }]
                        });
                    });

                    it('should set the initial values correctly', function() {
                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toBe(false);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(false);
                    });

                    it('should set the nth checkbox correctly', function() {
                        this.modal.setNthCheckbox(0, 2, true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                    });

                    it('should set checkboxes by name correctly', function() {
                        this.modal.setCheckbox(0, 'two', true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                    });

                    it('should set all checkboxes correctly', function() {
                        this.modal.setCheckboxes(0, true);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(true);
                    });

                    it('should clear all checkboxes correctly', function() {
                        this.modal.clearAllCheckboxes();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(false);

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toBe(false);
                    });

                    it('should mark the global checkbox indeterminate correctly', function() {
                        this.modal.setIndeterminateCheckbox(0, true);

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toBe(true);
                    });

                    it('should get the selected rows correctly', function() {
                        expect(this.modal.getSelectedRows()).toEqual([[]]);
                    });

                    it('should handle changes correctly', function() {
                        this.modal.editModal.find('[data-row-name="one"]').click().change();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toBe(true);

                        expect(this.modal.getSelectedRows()).toEqual([['one']]);
                    });

                    it('should handle changes to the global checkbox correctly', function() {
                        this.modal.editModal.find('[data-row-name=""]').click().change();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toBe(false);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(true);
                    });
                });

                describe('with mixed initialState', function() {
                    beforeEach(function() {
                        this.modal = new CheckboxModal({
                            i18n: i18n,
                            vent: vent,
                            parameters: {
                                modalHeader: 'modalHeader'
                            },
                            tables: [{
                                tableHeader: 'tableTitle',
                                initialState: [
                                    'one',
                                    'three'
                                ],
                                rows: [
                                    'one',
                                    'two',
                                    'three'
                                ]
                            }]
                        });
                    });

                    it('should set the initial values correctly', function() {
                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name=""]')).toHaveProp('indeterminate', true);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(true);
                    });

                    it('should set the nth checkbox correctly', function() {
                        this.modal.setNthCheckbox(0, 2, true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                    });

                    it('should set checkboxes by name correctly', function() {
                        this.modal.setCheckbox(0, 'two', true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                    });

                    it('should set all checkboxes correctly', function() {
                        this.modal.setCheckboxes(0, true);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(true);
                    });

                    it('should clear all checkboxes correctly', function() {
                        this.modal.clearAllCheckboxes();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(false);

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toBe(false);
                    });

                    it('should mark the global checkbox indeterminate correctly', function() {
                        this.modal.setIndeterminateCheckbox(0, true);

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toBe(true);
                    });

                    it('should get the selected rows correctly', function() {
                        expect(this.modal.getSelectedRows()).toEqual([['one', 'three']]);
                    });

                    it('should handle changes correctly', function() {
                        this.modal.editModal.find('[data-row-name="one"]').click().change();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toBe(true);

                        expect(this.modal.getSelectedRows()).toEqual([['three']]);
                    });

                    xit('should handle changes to the global checkbox correctly', function() {
                        // the global checkbox behaves differently in phantom and real browsers
                    });
                });
            });

            describe('with radio buttons', function() {
                xdescribe('with initialState true', function() {
                    // this is probably not a sensible thing to do and the tests were inconsistent across browsers
                });

                describe('with initialState false', function() {
                    beforeEach(function() {
                        this.modal = new CheckboxModal({
                            checkboxOrRadio: 'radio',
                            i18n: i18n,
                            templateTableModal: radioTemplate,
                            vent: vent,
                            parameters: {
                                modalHeader: 'modalHeader'
                            },
                            tables: [{
                                initialState: false,
                                inputName: 'testInput',
                                tableHeader: 'tableTitle',
                                rows: [
                                    'one',
                                    'two',
                                    'three'
                                ]
                            }]
                        });
                    });

                    it('should set the initial values correctly', function() {
                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(false);
                    });

                    it('should set the nth checkbox correctly', function() {
                        this.modal.setNthCheckbox(0, 1, true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                    });

                    it('should set checkboxes by name correctly', function() {
                        this.modal.setCheckbox(0, 'two', true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                    });

                    it('should set all checkboxes correctly', function() {
                        this.modal.setCheckboxes(0, true);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(true);
                    });

                    it('should clear all checkboxes correctly', function() {
                        this.modal.clearAllCheckboxes();

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(false);
                    });


                    it('should get the selected rows correctly', function() {
                        expect(this.modal.getSelectedRows()).toEqual([[]]);
                    });

                    it('should handle changes correctly', function() {
                        this.modal.editModal.find('[data-row-name="one"]').click().change();

                        expect(this.modal.getSelectedRows()).toEqual([['one']]);
                    });
                });

                describe('with mixed initialState', function() {
                    beforeEach(function() {
                        this.modal = new CheckboxModal({
                            checkboxOrRadio: 'radio',
                            i18n: i18n,
                            templateTableModal: radioTemplate,
                            vent: vent,
                            parameters: {
                                modalHeader: 'modalHeader'
                            },
                            tables: [{
                                initialState: [
                                    'one'
                                ],
                                inputName: 'testInput',
                                tableHeader: 'tableTitle',
                                rows: [
                                    'one',
                                    'two',
                                    'three'
                                ]
                            }]
                        });
                    });

                    it('should set the initial values correctly', function() {
                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(false);
                    });

                    it('should set the nth checkbox correctly', function() {
                        this.modal.setNthCheckbox(0, 1, true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                    });

                    it('should set checkboxes by name correctly', function() {
                        this.modal.setCheckbox(0, 'two', true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                    });

                    it('should set all checkboxes correctly', function() {
                        this.modal.setCheckboxes(0, true);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(true);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(true);
                    });

                    it('should clear all checkboxes correctly', function() {
                        this.modal.clearAllCheckboxes();

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toBe(false);

                        expect(this.modal.editModal.find('[data-row-name="one"]').prop('indeterminate')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').prop('indeterminate')).toBe(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').prop('indeterminate')).toBe(false);
                    });

                    it('should get the selected rows correctly', function() {
                        expect(this.modal.getSelectedRows()).toEqual([['one']]);
                    });

                    it('should handle changes correctly', function() {
                        this.modal.editModal.find('[data-row-name="two"]').click().change();

                        expect(this.modal.getSelectedRows()).toEqual([['one', 'two']]);
                    });
                });
            });
        });
    });

});