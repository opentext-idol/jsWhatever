/*
 * Copyright 2013-2017 Open Text.
 *
 * Licensed under the MIT License (the "License"); you may not use this file
 * except in compliance with the License.
 *
 * The only warranties for products and services of Open Text and its affiliates
 * and licensors ("Open Text") are as may be set forth in the express warranty
 * statements accompanying such products and services. Nothing herein should be
 * construed as constituting an additional warranty. Open Text shall not be
 * liable for technical or editorial errors or omissions contained herein. The
 * information contained herein is subject to change without notice.
 */

define([
    'js-whatever/js/checkbox-modal',
    'text!js-whatever/templates/checkbox-modal/radio-table.html',
    'jasmine-jquery'
], function(CheckboxModal, radioTemplate) {
    'use strict';

    var i18n = {
        frenchTable: 'French',
        modalHeader: 'Modal Header',
        spanishTable: 'Spanish',
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
                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toEqual(true);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(true);
                    });

                    it('should set the nth checkbox correctly', function() {
                        this.modal.setNthCheckbox(0, 2, false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                    });

                    it('should set checkboxes by name correctly', function() {
                        this.modal.setCheckbox(0, 'two', false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                    });

                    it('should set all checkboxes correctly', function() {
                        this.modal.setCheckboxes(0, false);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(false);
                    });

                    it('should clear all checkboxes correctly', function() {
                        this.modal.clearAllCheckboxes();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(false);

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toEqual(false);
                    });

                    it('should mark the global checkbox indeterminate correctly', function() {
                        this.modal.setIndeterminateCheckbox(0, true);

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toEqual(true);
                    });

                    it('should get the selected rows correctly', function() {
                        expect(this.modal.getSelectedRows()).toEqual([['one', 'two', 'three']]);
                    });

                    it('should handle changes correctly', function() {
                        this.modal.editModal.find('[data-row-name="one"]').click().change();

                        // we don't check the value of the checked property as phantom differs in behaviour to other browsers

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toEqual(true);

                        expect(this.modal.getSelectedRows()).toEqual([['two', 'three']]);
                    });

                    it('should handle changes to the global checkbox correctly', function() {
                        this.modal.editModal.find('[data-row-name=""]').click().change();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toEqual(false);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(false);
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
                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toEqual(false);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(false);
                    });

                    it('should set the nth checkbox correctly', function() {
                        this.modal.setNthCheckbox(0, 2, true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                    });

                    it('should set checkboxes by name correctly', function() {
                        this.modal.setCheckbox(0, 'two', true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                    });

                    it('should set all checkboxes correctly', function() {
                        this.modal.setCheckboxes(0, true);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(true);
                    });

                    it('should clear all checkboxes correctly', function() {
                        this.modal.clearAllCheckboxes();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(false);

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toEqual(false);
                    });

                    it('should mark the global checkbox indeterminate correctly', function() {
                        this.modal.setIndeterminateCheckbox(0, true);

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toEqual(true);
                    });

                    it('should get the selected rows correctly', function() {
                        expect(this.modal.getSelectedRows()).toEqual([[]]);
                    });

                    it('should handle changes correctly', function() {
                        this.modal.editModal.find('[data-row-name="one"]').click().change();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toEqual(true);

                        expect(this.modal.getSelectedRows()).toEqual([['one']]);
                    });

                    it('should handle changes to the global checkbox correctly', function() {
                        this.modal.editModal.find('[data-row-name=""]').click().change();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toEqual(false);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(true);
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
                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name=""]')).toHaveProp('indeterminate', true);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(true);
                    });

                    it('should set the nth checkbox correctly', function() {
                        this.modal.setNthCheckbox(0, 2, true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                    });

                    it('should set checkboxes by name correctly', function() {
                        this.modal.setCheckbox(0, 'two', true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                    });

                    it('should set all checkboxes correctly', function() {
                        this.modal.setCheckboxes(0, true);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(true);
                    });

                    it('should clear all checkboxes correctly', function() {
                        this.modal.clearAllCheckboxes();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(false);

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toEqual(false);
                    });

                    it('should mark the global checkbox indeterminate correctly', function() {
                        this.modal.setIndeterminateCheckbox(0, true);

                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toEqual(true);
                    });

                    it('should get the selected rows correctly', function() {
                        expect(this.modal.getSelectedRows()).toEqual([['one', 'three']]);
                    });

                    it('should handle changes correctly', function() {
                        this.modal.editModal.find('[data-row-name="one"]').click().change();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toEqual(true);

                        expect(this.modal.getSelectedRows()).toEqual([['three']]);
                    });

                    it('should handle changes to the global checkbox correctly', function() {
                        this.modal.editModal.find('[data-row-name=""]').click().change();

                        expect(this.modal.editModal.find('[data-row-name=""]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toEqual(false);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(true);
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
                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(false);
                    });

                    it('should set the nth checkbox correctly', function() {
                        this.modal.setNthCheckbox(0, 1, true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                    });

                    it('should set checkboxes by name correctly', function() {
                        this.modal.setCheckbox(0, 'two', true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                    });

                    it('should set all checkboxes correctly', function() {
                        this.modal.setCheckboxes(0, true);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(true);
                    });

                    it('should clear all checkboxes correctly', function() {
                        this.modal.clearAllCheckboxes();

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(false);
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
                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(false);
                    });

                    it('should set the nth checkbox correctly', function() {
                        this.modal.setNthCheckbox(0, 1, true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                    });

                    it('should set checkboxes by name correctly', function() {
                        this.modal.setCheckbox(0, 'two', true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                    });

                    it('should set all checkboxes correctly', function() {
                        this.modal.setCheckboxes(0, true);

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(true);
                    });

                    it('should clear all checkboxes correctly', function() {
                        this.modal.clearAllCheckboxes();

                        expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(false);

                        expect(this.modal.editModal.find('[data-row-name="one"]').prop('indeterminate')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="two"]').prop('indeterminate')).toEqual(false);
                        expect(this.modal.editModal.find('[data-row-name="three"]').prop('indeterminate')).toEqual(false);
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

        describe('with multiple tables', function() {
            describe('with checkboxes', function() {
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
                        }, {
                            initialState: false,
                            tableHeader: 'frenchTable',
                            rows: [
                                'un',
                                'deux',
                                'trois'
                            ]
                        }, {
                            initialState: [
                                'uno'
                            ],
                            tableHeader: 'spanishTable',
                            rows: [
                                'uno',
                                'dos',
                                'tres'
                            ]
                        }]
                    });
                });

                it('should set the initial values correctly', function() {
                    expect(this.modal.editModal.find('[data-row-name=""]:eq(0)').is(':checked')).toEqual(true);

                    expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(true);
                    expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(true);
                    expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(true);

                    expect(this.modal.editModal.find('[data-row-name=""]:eq(1)').is(':checked')).toEqual(false);

                    expect(this.modal.editModal.find('[data-row-name="un"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="deux"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="trois"]').is(':checked')).toEqual(false);

                    expect(this.modal.editModal.find('[data-row-name=""]:eq(2)').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name=""]:eq(2)')).toHaveProp('indeterminate', true);

                    expect(this.modal.editModal.find('[data-row-name="uno"]').is(':checked')).toEqual(true);
                    expect(this.modal.editModal.find('[data-row-name="dos"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="tres"]').is(':checked')).toEqual(false);
                });

                it('should set the nth checkbox correctly', function() {
                    this.modal.setNthCheckbox(0, 2, false);
                    expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);

                    this.modal.setNthCheckbox(1, 2, true);
                    expect(this.modal.editModal.find('[data-row-name="deux"]').is(':checked')).toEqual(true);

                    this.modal.setNthCheckbox(2, 2, true);
                    expect(this.modal.editModal.find('[data-row-name="dos"]').is(':checked')).toEqual(true);

                    // this one shouldn't have changed
                    expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                });

                it('should set checkboxes by name correctly', function() {
                    this.modal.setCheckbox(0, 'two', false);
                    expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);

                    this.modal.setCheckbox(1, 'deux', true);
                    expect(this.modal.editModal.find('[data-row-name="deux"]').is(':checked')).toEqual(true);

                    this.modal.setCheckbox(2, 'dos', true);
                    expect(this.modal.editModal.find('[data-row-name="dos"]').is(':checked')).toEqual(true);

                    // this one shouldn't have changed
                    expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                });

                it('should set all checkboxes correctly', function() {
                    this.modal.setCheckboxes(0, false);

                    expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(false);

                    expect(this.modal.editModal.find('[data-row-name="uno"]').is(':checked')).toEqual(true);
                });

                it('should clear all checkboxes correctly', function() {
                    this.modal.clearAllCheckboxes();

                    expect(this.modal.editModal.find('[data-row-name=""]:eq(0)').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(false);

                    expect(this.modal.editModal.find('[data-row-name=""]:eq(1)').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="un"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="deux"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="trois"]').is(':checked')).toEqual(false);

                    expect(this.modal.editModal.find('[data-row-name=""]:eq(2)').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="uno"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="dos"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="tres"]').is(':checked')).toEqual(false);

                    expect(this.modal.editModal.find('[data-row-name=""]:eq(0)').prop('indeterminate')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name=""]:eq(1)').prop('indeterminate')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name=""]:eq(2)').prop('indeterminate')).toEqual(false);
                });

                it('should mark the global checkbox indeterminate correctly', function() {
                    this.modal.setIndeterminateCheckbox(0, true);

                    expect(this.modal.editModal.find('[data-row-name=""]:eq(0)').prop('indeterminate')).toEqual(true);
                    expect(this.modal.editModal.find('[data-row-name=""]:eq(1)').prop('indeterminate')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name=""]:eq(2)').prop('indeterminate')).toEqual(true);
                });

                it('should get the selected rows correctly', function() {
                    expect(this.modal.getSelectedRows()).toEqual([['one', 'two', 'three'], [], ['uno']]);
                });

                it('should handle changes correctly', function() {
                    this.modal.editModal.find('[data-row-name="one"]').click().change();

                    // we don't check the value of the checked property as phantom differs in behaviour to other browsers

                    expect(this.modal.editModal.find('[data-row-name=""]').prop('indeterminate')).toEqual(true);

                    expect(this.modal.getSelectedRows()).toEqual([['two', 'three'], [], ['uno']]);
                });

                it('should handle changes to the global checkbox correctly', function() {
                    this.modal.editModal.find('[data-row-name=""]:eq(0)').click().change();

                    expect(this.modal.editModal.find('[data-row-name=""]:eq(0)').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name=""]:eq(0)').prop('indeterminate')).toEqual(false);

                    expect(this.modal.editModal.find('[data-row-name="one"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="two"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="three"]').is(':checked')).toEqual(false);

                    this.modal.editModal.find('[data-row-name=""]:eq(1)').click().change();

                    expect(this.modal.editModal.find('[data-row-name=""]:eq(1)').is(':checked')).toEqual(true);
                    expect(this.modal.editModal.find('[data-row-name=""]:eq(1)').prop('indeterminate')).toEqual(false);

                    expect(this.modal.editModal.find('[data-row-name="un"]').is(':checked')).toEqual(true);
                    expect(this.modal.editModal.find('[data-row-name="deux"]').is(':checked')).toEqual(true);
                    expect(this.modal.editModal.find('[data-row-name="trois"]').is(':checked')).toEqual(true);

                    // don't change the global checkbox here as phantom differs from other browsers

                    expect(this.modal.editModal.find('[data-row-name="uno"]').is(':checked')).toEqual(true);
                    expect(this.modal.editModal.find('[data-row-name="dos"]').is(':checked')).toEqual(false);
                    expect(this.modal.editModal.find('[data-row-name="tres"]').is(':checked')).toEqual(false);
                });
            });
        });
    });
});
