define(function() {

    var hostname = window.location.hostname;
    var pathname = window.location.pathname;
    var port = window.location.port;
    var protocol = window.location.protocol;

    return {
        hostname: function() {
            return hostname;
        },

        pathname: function() {
            return pathname;
        },

        port: function() {
            return port;
        },

        protocol: function() {
            return protocol;
        }
    };
});