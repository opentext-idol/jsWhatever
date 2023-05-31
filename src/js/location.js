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

/**
 * @module js-whatever/js/location
 * @desc Wrapper around window.location, allowing for easier testing
 */
define(function() {
    'use strict';

    var host = window.location.host;
    var hostname = window.location.hostname;
    var pathname = window.location.pathname;
    var port = window.location.port;
    var protocol = window.location.protocol;
    var search = window.location.search;

    return {
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
        },

        /**
         * @returns {string} window.location.search
         */
        search: function() {
            return search;
        }
    };
});
