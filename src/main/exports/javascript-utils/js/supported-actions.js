define([
    'backbone',
    'underscore',
    'js-utils/js/ensure-array'
], function(Backbone, _, ensureArray) {
    var SupportedActions = Backbone.Model.extend({

        initialize: function(attributes, options) {

            options = options || {};

            this.licenseInfo = options.licenseInfo;
            this.version = options.version;
            this.ports = options.ports;

            if (!this.licenseInfo.loaded) {
                this.licenseInfo.fetch({async: false});
            }

            if (!this.version.loaded) {
                this.version.fetch({async: false});
            }

            if (this.version.get('aci')) {
                this.server = this.version.get('productTypeCsv');
            }

            _.bindAll(this, 'supported');
        },

        /**
         * Check whether this ACI server supports everything a Model/View needs
         * @param required  Object containing three optional arrays:
         *   servers - list of acceptable product types, e.g 'AXE'
         *   ports   - list of required ports, e.g. 'index' - in practise, neither aci nor service need to be specified
         *   actions - list of required ACI actions, e.g. 'GETSTATUS'
         * @returns {boolean}  True if this ACI server satisfies all requirements, false if not.
         */
        supported: function(required) {
            required = required || {};

            if (required.servers) {
                required.servers = ensureArray(required.servers);
                if (required.servers.length && !_.contains(required.servers, this.server)) {
                    return false;
                }
            }

            if (required.anyServerExcept) {
                if (_.contains(ensureArray(required.anyServerExcept), this.server)) return false;
            }

            if (required.ports) {
                if (!hasPorts.call(this, ensureArray(required.ports))) return false;
            }

            if (required.actions) {
                if (!actionsAreSupported.call(this, ensureArray(required.actions))) return false;
            }

            return true; //all tests have passed
        }
    });

    //Local functions - not for external use.

    function actionsAreSupported(actions) {
        return _.every(actions, _.bind(function(action) {
            return this.licenseInfo.isSupported(action);
        }, this));
    }

    function hasPorts(ports) {
        var allPortsSupported = true;

        _.each(ports, _.bind(function(port) {
            if (!hasPort.call(this, port)) allPortsSupported = false;
        }, this));

        return allPortsSupported;
    }

    function hasPort(type) {
        return this.ports.isPortSupported(type);
    }

    return SupportedActions;
});
