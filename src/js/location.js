define(function() {

    var host = window.location.host;
    var hostname = window.location.hostname;
    var pathname = window.location.pathname;
    var port = window.location.port;
    var protocol = window.location.protocol;

    return {

        host: function() {
            return host;
        },

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