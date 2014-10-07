define([
    'backbone',
    'js-utils/js/ensure-array'
], function(Backbone, ensureArray) {

    return Backbone.View.extend({
        initialize: function(init) {
            _.bindAll(this, 'render', 'setRows', 'setRow', 'getSelectedRows', 'remove', 'resizeModal',
                'getModalTemplateParams', 'getElementValue', 'restorePrevState', 'setGlobalCheckboxes');

            this.templateModal = _.template(init.templateModal);
            this.templateTableModal = _.template(init.templateTableModal);
            this.tables = init.tables;
            this.parameters = ensureArray(init.parameters);
            this.okCallback = init.okCallback || $.noop;
            this.okIcon = init.okIcon || 'icon-refresh';
            this.okClass = init.okClass || 'btn-success';
            this.cancelClass = init.cancelClass || '';
            this.atLeastOneElementSelected = init.atLeastOneElementSelected || false;

            this.i18n = init.i18n;
            this.vent = init.vent;

            this.checkboxOrRadio = init.checkboxOrRadio || 'checkbox';

            if (this.checkboxOrRadio === 'radio') {
                this.atLeastOneElementSelected = true;
            }

            this.setTableInitialState();

            this.storePrevConfig = true;
            this.render();
            this.listenTo(this.vent, 'vent:resize', this.resizeModal);
        },

        resizeModal: function() {
            var header = this.editModal.find('.modal-header').outerHeight(true);
            var footer = this.editModal.find('.modal-footer').outerHeight(true);

            this.editModal.find('.modal-body').css('max-height',
                Math.min(400, Math.max(1, 0.8 * $(window).height() - header - footer))
            );
        },

        setTableInitialState: function() {
            _.each(this.tables, _.bind(function(table) {
                table.initialState = table.initialState || false;

                table.columnStates = _.reduce(table.rows, _.bind(function(memo, row) {
                    if (_.isArray(table.initialState)) {
                        memo[row] = _.contains(table.initialState, row);
                    } else {
                        memo[row] = table.initialState;
                    }

                    return memo;
                }, this), {});

                table.prevConfig = '';
            }, this));
        },

        setRow: function(index, name, value) {
            this.tables[index].columnStates[name] = value;
        },

        setRows: function(index, value) {
            _.each(this.tables[index].columnStates, _.bind(function(oldValue, field) {
                this.setRow(index, field, value);
            }, this));
        },

        clearAllRows: function() {
            _.each(this.tables, _.bind(function(table, index) {
                this.setRows(index, false);
            }, this));
        },

        setNthCheckbox: function(index, n, value) {
            this.editModal.find('table:eq(' + index + ') input:eq(' + n + ')').prop('checked', value);
        },

        setCheckbox: function(index, columnName, value) {
            this.editModal.find('table:eq(' + index + ') input[data-col-name="' + columnName + '"]').prop('checked', value);
        },

        setCheckboxes: function(index, value) {
            this.editModal.find('table:eq(' + index + ') input').prop('checked', value);
        },

        clearAllCheckboxes: function() {
            this.editModal.find('th input[type="checkbox"]').prop('indeterminate', false);
            this.editModal.find('input[type="checkbox"]').prop('checked', false);
        },

        setIndeterminateCheckbox: function(index, value) {
            this.editModal.find('table:eq(' + index + ') input[data-col-name=""]').prop('indeterminate', value);
        },

        setCheckboxesAndRows: function(index, valueCheckbox, valueGlobalCheckbox) {
            this.setCheckboxes(index, valueCheckbox);
            this.setRows(index, valueCheckbox);
            if (valueGlobalCheckbox !== undefined) {
                this.setIndeterminateCheckbox(index, valueGlobalCheckbox);
            }
        },

        setGlobalCheckboxes: function() {
            _.each(this.editModal.find('table'), _.bind(function(table, index) {
                var tempCheck = '';

                _.each($(table).find('td input[type="' + this.checkboxOrRadio + '"]'), function(check) {
                    if (tempCheck === '') {
                        tempCheck = $(check).prop('checked');
                    }

                    if (tempCheck !== $(check).prop('checked')) {
                        tempCheck = 'indeterminate';
                    }
                });


                if (tempCheck !== 'indeterminate') {
                    this.setCheckbox(index, '', tempCheck);
                } else {
                    this.setIndeterminateCheckbox(index, true);
                }
            }, this));
        },

        getSelectedRows: function() {

            return _.map(this.editModal.find('table'), _.bind(function(table, index) {

                var checked = $(table).find('td input[type="' + this.checkboxOrRadio + '"]:checked');
                var notChecked = $(table).find('td input[type="' + this.checkboxOrRadio + '"]:not(:checked)');
                var all = $(table).find('input[data-col-name=""]');
                var innerCheckedRows = {};

                if (checked.length && (!all.length || all.prop('indeterminate'))) {
                    this.setRow(index, '', 'indeterminate');

                    _.each(notChecked, _.bind(function(elem) {
                        this.setRow(index, $(elem).data('col-name'), false);
                    }, this));

                    innerCheckedRows = _.map(checked, _.bind(function(elem) {
                        this.setRow(index, $(elem).data('col-name'), true);
                        return $(elem).data('col-name');
                    }, this));
                } else {
                    if (all.prop('checked')) {
                        innerCheckedRows = _.map(checked, _.bind(function(elem) {
                            return $(elem).data('col-name');
                        }, this));
                        this.setRows(index, true);
                    } else {
                        this.setRows(index, false);
                    }
                }
                return innerCheckedRows;

            }, this));

        },

        getModalTemplateParams: function() {
            var tableConfig = _.map(this.tables, _.bind(function(table) {
                return {
                    i18nTableHeader: table.tableHeader,
                    rows: table.columnStates,
                    i18n: this.i18n
                };
            }, this));

            var templateParams = {
                tableConfigs: tableConfig,
                tableTemplate: this.templateTableModal,
                i18n: this.i18n,
                okIcon: this.okIcon,
                okClass: this.okClass,
                cancelClass: this.cancelClass
            };

            _.each(this.parameters, _.bind(function(entry) {
                _.each(entry, _.bind(function(value, key) {
                    templateParams[key] = value;
                }, this));
            }, this));

            return templateParams;
        },

        getElementValue: function(selector) {
            return this.editModal.find(selector).val();
        },

        setElementValue: function(selector, value) {
            this.editModal.find(selector).val(value);
        },

        showModal: function() {
            this.editModal.modal('show');
            if (!this.storePrevConfig) {
                this.restorePrevState();
            }
        },

        hideModal: function() {
            this.editModal.modal('hide');
        },

        restorePrevState: function() {
            _.each(this.tables, _.bind(function(table) {
                _.each(table.prevConfig, _.bind(function(state, element) {
                    if (state === 'indeterminate') {
                        this.editModal.find('input[data-col-name="' + element + '"]').prop('indeterminate', true);
                    } else {
                        this.editModal.find('input[data-col-name="' + element + '"]').prop('checked', state);
                    }
                }, this));
            }, this));
        },

        render: function() {
            this.editModal = $(this.templateModal(this.getModalTemplateParams()));
            this.editModal.on('shown', this.resizeModal);
            this.setGlobalCheckboxes();

            this.editModal.find('table input[type="' + this.checkboxOrRadio + '"]').change(_.bind(this.handleCheckBoxChange, this));
            this.editModal.find('button.ok').click(_.bind(this.onOkClick, this));

            this.editModal.on('shown', _.bind(function() {
                document.activeElement.blur();
            }, this));
            return this;
        },

        handleCheckBoxChange: function(e) {
            var rowname = $(e.target).data('col-name');
            var checkboxes = $(e.target).closest('table').find('td input[type="' + this.checkboxOrRadio + '"]');
            var checked = $(e.target).closest('table').find('td input[type="' + this.checkboxOrRadio + '"]:checked');
            var all = $(e.target).closest('table').find('input[data-col-name=""]');

            if (this.storePrevConfig) {
                this.prevConfig = this.columnStates;
                this.storePrevConfig = false;
            }

            if (rowname === '') {
                if ($(e.target).prop('checked') || this.atLeastOneElementSelected) {
                    checkboxes.prop('checked', true);
                    all.prop('indeterminate', false);

                    if (this.atLeastOneElementSelected) {
                        all.prop('checked', true);
                    }
                } else {
                    checkboxes.prop('checked', false);
                    all.prop('indeterminate', false);
                }
            } else {
                if ($(e.target).prop('checked')) {
                    if (checkboxes.length === checked.length) {
                        all.prop('checked', true);
                        all.prop('indeterminate', false);
                    } else {
                        all.prop('indeterminate', true);
                    }
                } else {
                    if (checked.length === 0) {
                        if (this.atLeastOneElementSelected) {
                            $(e.delegateTarget).prop('checked', true);
                        } else {
                            all.prop('indeterminate', false);
                            all.prop('checked', false);
                        }
                    } else {
                        all.prop('indeterminate', true);
                    }
                }
            }
        },

        onOkClick: function() {
            this.okCallback(this.getSelectedRows(), this.editModal);
            this.storePrevConfig = true;

            _.each(this.tables, _.bind(function(table) {
                table.prevConfig = table.columnStates;
            }, this));

            this.hideModal();
        },

        remove: function() {
            this.editModal.remove();
            Backbone.View.prototype.remove.call(this);
        }
    });
});