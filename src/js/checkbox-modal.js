define([
    'backbone',
    'js-utils/js/ensure-array',
    'text!js-utils/templates/checkbox-modal/checkbox-modal.html',
    'text!js-utils/templates/checkbox-modal/checkbox-table.html'
], function(Backbone, ensureArray, checkboxModal, checkboxTable) {

    return Backbone.View.extend({
        initialize: function(init) {
            _.bindAll(this, 'render', 'setRows', 'setRow', 'getSelectedRows', 'remove', 'resizeModal',
                'getModalTemplateParams', 'getElementValue', 'restorePrevState', 'setGlobalCheckboxes');

            this.templateModal = _.template(init.templateModal || checkboxModal);
            this.templateTableModal = _.template(init.templateTableModal || checkboxTable);
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
            _.each(this.tables, function(table) {
                table.initialState = table.initialState || false;

                table.columnStates = _.reduce(table.rows, function(memo, row) {
                    if (_.isArray(table.initialState)) {
                        memo[row] = _.contains(table.initialState, row);
                    } else {
                        memo[row] = table.initialState;
                    }

                    return memo;
                }, {});

                table.prevConfig = '';
            });
        },

        setRow: function(index, name, value) {
            this.tables[index].columnStates[name] = value;
        },

        setRows: function(index, value) {
            _.each(this.tables[index].columnStates, function(oldValue, field) {
                this.setRow(index, field, value);
            }, this);
        },

        clearAllRows: function() {
            _.each(this.tables, function(table, index) {
                this.setRows(index, false);
            }, this);
        },

        // because of the global checkbox this uses one based indexing
        setNthCheckbox: function(index, n, value) {
            this.editModal.find('table:eq(' + index + ') input:eq(' + n + ')').prop('checked', value);
        },

        setCheckbox: function(index, rowName, value) {
            this.editModal.find('table:eq(' + index + ') input[data-row-name="' + rowName + '"]').prop('checked', value);
        },

        setCheckboxes: function(index, value) {
            this.editModal.find('table:eq(' + index + ') input').prop('checked', value);
        },

        clearAllCheckboxes: function() {
            this.editModal.find('th input[type="checkbox"]').prop('indeterminate', false);
            this.editModal.find('input[type="checkbox"]').prop('checked', false);
        },

        setIndeterminateCheckbox: function(index, value) {
            this.editModal.find('table:eq(' + index + ') input[data-row-name=""]').prop('indeterminate', value);
        },

        setCheckboxesAndRows: function(index, valueCheckbox, valueGlobalCheckbox) {
            this.setCheckboxes(index, valueCheckbox);
            this.setRows(index, valueCheckbox);
            if (valueGlobalCheckbox !== undefined) {
                this.setIndeterminateCheckbox(index, valueGlobalCheckbox);
            }
        },

        setGlobalCheckboxes: function() {
            _.each(this.editModal.find('table'), function(table, index) {
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
            }, this);
        },

        getSelectedRows: function() {
            return _.map(this.editModal.find('table'), function(table, index) {
                var checked = $(table).find('td input[type="' + this.checkboxOrRadio + '"]:checked');
                var notChecked = $(table).find('td input[type="' + this.checkboxOrRadio + '"]:not(:checked)');
                var globalCheckbox = $(table).find('input[data-row-name=""]');
                var innerCheckedRows = [];

                if (checked.length && (!globalCheckbox.length || globalCheckbox.prop('indeterminate'))) {
                    this.setRow(index, '', 'indeterminate');

                    _.each(notChecked, function(elem) {
                        this.setRow(index, $(elem).data('row-name'), false);
                    }, this);

                    innerCheckedRows = _.map(checked, function(elem) {
                        this.setRow(index, $(elem).data('row-name'), true);
                        return $(elem).data('row-name');
                    }, this);
                } else {
                    if (globalCheckbox.prop('checked')) {
                        innerCheckedRows = _.map(checked, function(elem) {
                            return $(elem).data('row-name');
                        }, this);

                        this.setRows(index, true);
                    } else {
                        this.setRows(index, false);
                    }
                }

                return innerCheckedRows;
            }, this);
        },

        getModalTemplateParams: function() {
            var tableConfig = _.map(this.tables, function(table) {
                return {
                    i18nTableHeader: table.tableHeader,
                    rows: table.columnStates,
                    i18n: this.i18n
                };
            }, this);

            var templateParams = {
                tableConfigs: tableConfig,
                tableTemplate: this.templateTableModal,
                i18n: this.i18n,
                okIcon: this.okIcon,
                okClass: this.okClass,
                cancelClass: this.cancelClass
            };

            _.each(this.parameters, function(entry) {
                _.each(entry, function(value, key) {
                    templateParams[key] = value;
                });
            });

            return templateParams;
        },

        // don't use this to get the value of checkboxes or you will have a bad time
        getElementValue: function(selector) {
            return this.editModal.find(selector).val();
        },

        // don't use this to set the value of checkboxes or you will have a bad time
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
            _.each(this.tables, function(table) {
                _.each(table.prevConfig, function(state, element) {
                    if (state === 'indeterminate') {
                        this.editModal.find('input[data-row-name="' + element + '"]').prop('indeterminate', true);
                    } else {
                        this.editModal.find('input[data-row-name="' + element + '"]').prop('checked', state);
                    }
                }, this);
            }, this);
        },

        render: function() {
            this.editModal = $(this.templateModal(this.getModalTemplateParams()));
            this.editModal.on('shown', this.resizeModal);
            this.setGlobalCheckboxes();

            this.editModal.find('table input[type="' + this.checkboxOrRadio + '"]').change(_.bind(this.handleCheckBoxChange, this));
            this.editModal.find('button.ok').click(_.bind(this.onOkClick, this));

            this.editModal.on('shown', function() {
                document.activeElement.blur();
            });

            return this;
        },

        handleCheckBoxChange: function(e) {
            var $target = $(e.target);
            var rowName = $target.data('row-name');
            var checkboxes = $target.closest('table').find('td input[type="' + this.checkboxOrRadio + '"]');
            var checked = $target.closest('table').find('td input[type="' + this.checkboxOrRadio + '"]:checked');
            var globalCheckbox = $target.closest('table').find('input[data-row-name=""]');

            if (this.storePrevConfig) {
                this.prevConfig = this.columnStates;
                this.storePrevConfig = false;
            }

            if (rowName === '') {
                if ($target.prop('checked') || this.atLeastOneElementSelected) {
                    checkboxes.prop('checked', true);
                    globalCheckbox.prop('indeterminate', false);

                    if (this.atLeastOneElementSelected) {
                        globalCheckbox.prop('checked', true);
                    }
                } else {
                    checkboxes.prop('checked', false);
                    globalCheckbox.prop('indeterminate', false);
                }
            } else {
                if ($target.prop('checked')) {
                    if (checkboxes.length === checked.length) {
                        globalCheckbox.prop('checked', true);
                        globalCheckbox.prop('indeterminate', false);
                    } else {
                        globalCheckbox.prop('indeterminate', true);
                    }
                } else {
                    if (checked.length === 0) {
                        if (this.atLeastOneElementSelected) {
                            $(e.delegateTarget).prop('checked', true);
                        } else {
                            globalCheckbox.prop('indeterminate', false);
                            globalCheckbox.prop('checked', false);
                        }
                    } else {
                        globalCheckbox.prop('indeterminate', true);
                    }
                }
            }
        },

        onOkClick: function() {
            this.okCallback(this.getSelectedRows(), this.editModal);
            this.storePrevConfig = true;

            _.each(this.tables, function(table) {
                table.prevConfig = table.columnStates;
            });

            this.hideModal();
        },

        remove: function() {
            this.editModal.remove();
            Backbone.View.prototype.remove.call(this);
        }
    });
});