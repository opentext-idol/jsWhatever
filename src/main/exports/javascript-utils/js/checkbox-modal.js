define([
    'backbone',
    'js-utils/js/ensure-array'
], function(Backbone, ensureArray) {

    return Backbone.View.extend({
        initialize: function(init) {
            _.bindAll(this, 'render', 'setRows', 'setRow', 'getSelectedRows', 'remove', 'resizeModal',
                'getModalTemplateParams', 'getElementValue', 'restorePrevState', 'setGlobalCheckboxes');

            this.template_modal = _.template(init.template_modal);
            this.template_table_modal = _.template(init.template_table_modal);
            this.tables = init.tables;
            this.parameters = ensureArray(init.parameters);
            this.okCallback = init.okCallback || $.noop;
            this.okIcon = init.okIcon || 'icon-refresh';
            this.atLeastOneElementSelected = init.atLeastOneElementSelected || false;

            this.i18n = init.i18n;
            this.vent = init.vent;

            this.checkboxOrRadio = init.checkboxOrRadio || 'checkbox';

            if (this.checkboxOrRadio === "radio") {
                this.atLeastOneElementSelected = true;
            }

            this.setTableInitialState();

            this.store_prev_config = true;
            this.render();
            this.listenTo(this.vent, 'vent:resize', this.resizeModal);
        },

        resizeModal: function() {
            var header = this.edit_modal.find('.modal-header').outerHeight(true);
            var footer = this.edit_modal.find('.modal-footer').outerHeight(true);

            this.edit_modal.find('.modal-body').css('max-height',
                Math.min(400, Math.max(1, 0.8 * $(window).height() - header - footer))
            );
        },

        setTableInitialState: function() {
            _.each(this.tables, _.bind(function(table) {
                table.initial_state = table.initial_state || false;

                table.columnStates = _.reduce(table.rows, _.bind(function(memo, row) {
                    if (_.isArray(table.initial_state)) {
                        memo[row] = _.contains(table.initial_state, row);
                    } else {
                        memo[row] = table.initial_state;
                    }

                    return memo;
                }, this), {});

                table.prev_config = '';
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
            this.edit_modal.find('table:eq(' + index + ') input:eq(' + n + ')').prop('checked', value);
        },

        setCheckbox: function(index, col_name, value) {
            this.edit_modal.find('table:eq(' + index + ') input[data-col-name="' + col_name + '"]').prop('checked', value);
        },

        setCheckboxes: function(index, value) {
            this.edit_modal.find('table:eq(' + index + ') input').prop('checked', value);
        },

        clearAllCheckboxes: function() {
            this.edit_modal.find('th input[type="checkbox"]').prop('indeterminate', false);
            this.edit_modal.find('input[type="checkbox"]').prop('checked', false);
        },

        setIndeterminateCheckbox: function(index, value) {
            this.edit_modal.find('table:eq(' + index + ') input[data-col-name=""]').prop('indeterminate', value);
        },

        setCheckboxesAndRows: function(index, value_checkbox, value_global_checkbox) {
            this.setCheckboxes(index, value_checkbox);
            this.setRows(index, value_checkbox);
            if (value_global_checkbox !== undefined) {
                this.setIndeterminateCheckbox(index, value_global_checkbox);
            }
        },

        setGlobalCheckboxes: function() {
            _.each(this.edit_modal.find('table'), _.bind(function(table, index) {
                var temp_check = '';

                _.each($(table).find('td input[type="' + this.checkboxOrRadio + '"]'), function(check) {
                    if (temp_check === '') {
                        temp_check = $(check).prop('checked');
                    }

                    if (temp_check !== $(check).prop('checked')) {
                        temp_check = 'indeterminate';
                    }
                });


                if (temp_check !== 'indeterminate') {
                    this.setCheckbox(index, '', temp_check);
                } else {
                    this.setIndeterminateCheckbox(index, true);
                }
            }, this));
        },

        getSelectedRows: function() {

            return _.map(this.edit_modal.find('table'), _.bind(function(table, index) {

                var checked = $(table).find('td input[type="' + this.checkboxOrRadio + '"]:checked');
                var not_checked = $(table).find('td input[type="' + this.checkboxOrRadio + '"]:not(:checked)');
                var all = $(table).find('input[data-col-name=""]');
                var inner_checked_rows = {};

                if (checked.length && (!all.length || all.prop('indeterminate'))) {
                    this.setRow(index, '', 'indeterminate');

                    _.each(not_checked, _.bind(function(elem) {
                        this.setRow(index, $(elem).data('col-name'), false);
                    }, this));

                    inner_checked_rows = _.map(checked, _.bind(function(elem) {
                        this.setRow(index, $(elem).data('col-name'), true);
                        return $(elem).data('col-name');
                    }, this));
                } else {
                    if (all.prop('checked')) {
                        inner_checked_rows = _.map(checked, _.bind(function(elem) {
                            return $(elem).data('col-name');
                        }, this));
                        this.setRows(index, true);
                    } else {
                        this.setRows(index, false);
                    }
                }
                return inner_checked_rows;

            }, this));

        },

        getModalTemplateParams: function() {
            var table_config = _.map(this.tables, _.bind(function(table) {
                return {
                    i18n_table_header: table.table_header,
                    rows: table.columnStates,
                    i18n: this.i18n
                };
            }, this));

            var tpl_params = {
                table_configs: table_config,
                table_template: this.template_table_modal,
                i18n: this.i18n,
                okIcon: this.okIcon
            };

            _.each(this.parameters, _.bind(function(entry) {
                _.each(entry, _.bind(function(value, key) {
                    tpl_params[key] = value;
                }, this));
            }, this));

            return tpl_params;
        },

        getElementValue: function(selector) {
            return this.edit_modal.find(selector).val();
        },

        setElementValue: function(selector, value) {
            this.edit_modal.find(selector).val(value);
        },

        showModal: function() {
            this.edit_modal.modal('show');
            if (!this.store_prev_config) {
                this.restorePrevState();
            }
        },

        hideModal: function() {
            this.edit_modal.modal('hide');
        },

        restorePrevState: function() {
            _.each(this.tables, _.bind(function(table) {
                _.each(table.prev_config, _.bind(function(state, element) {
                    if (state === 'indeterminate') {
                        this.edit_modal.find('input[data-col-name="' + element + '"]').prop('indeterminate', true);
                    } else {
                        this.edit_modal.find('input[data-col-name="' + element + '"]').prop('checked', state);
                    }
                }, this));
            }, this));
        },

        render: function() {
            this.edit_modal = $(this.template_modal(this.getModalTemplateParams()));
            this.edit_modal.on('shown', this.resizeModal);
            this.setGlobalCheckboxes();

            this.edit_modal.find('table input[type="' + this.checkboxOrRadio + '"]').change(_.bind(this.handleCheckBoxChange, this));
            this.edit_modal.find('button.ok').click(_.bind(this.onOkClick, this));

            this.edit_modal.on('shown', _.bind(function() {
                document.activeElement.blur();
            }, this));
            return this;
        },

        handleCheckBoxChange: function(e) {
            var rowname = $(e.target).data('col-name');
            var checkboxes = $(e.target).closest('table').find('td input[type="' + this.checkboxOrRadio + '"]');
            var checked = $(e.target).closest('table').find('td input[type="' + this.checkboxOrRadio + '"]:checked');
            var all = $(e.target).closest('table').find('input[data-col-name=""]');

            if (this.store_prev_config) {
                this.prev_config = this.columnStates;
                this.store_prev_config = false;
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
            this.okCallback(this.getSelectedRows(), this.edit_modal);
            this.store_prev_config = true;

            _.each(this.tables, _.bind(function(table) {
                table.prev_config = table.columnStates;
            }, this));

            this.hideModal();
        },

        remove: function() {
            this.edit_modal.remove();
            Backbone.View.prototype.remove.call(this);
        }
    });
});