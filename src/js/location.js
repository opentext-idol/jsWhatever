/**
 * @module js-whatever/js/location
 * @desc Wrapper around window.location, allowing for easier testing
 */
define(function() {

    var host = window.location.host;
    var hostname = window.location.hostname;
    var pathname = window.location.pathname;
    var port = window.location.port;
    var protocol = window.location.protocol;

    //noinspection UnnecessaryLocalVariableJS
    /**
     * @alias module:js-whatever/js/location
     */
    var location = {

        /**
         * @returns {string} window.location.host
         */
        host: function() {
            return host;
        },

        /**
         * @returns {string} window.location.hostname
         */
        hostname: function() {
            return hostname;
        },

        /**
         * @returns {string} window.location.pathname
         */
        pathname: function() {
            return pathname;
        },

        /**
         * @returns {string} window.location.port
         */
        port: function() {
            return port;
        },

        /**
         * @returns {string} window.location.protocol
         */
        protocol: function() {
            return protocol;
        }
    };

    return location;
});