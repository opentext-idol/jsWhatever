/*
 * (c) Copyright 2013-2017 Micro Focus or one of its affiliates.
 *
 * Licensed under the MIT License (the "License"); you may not use this file
 * except in compliance with the License.
 *
 * The only warranties for products and services of Micro Focus and its affiliates
 * and licensors ("Micro Focus") are as may be set forth in the express warranty
 * statements accompanying such products and services. Nothing herein should be
 * construed as constituting an additional warranty. Micro Focus shall not be
 * liable for technical or editorial errors or omissions contained herein. The
 * information contained herein is subject to change without notice.
 */

/**
 * @module js-whatever/js/escape-with-links
 */
define([
    'underscore',
    'js-whatever/js/regex-replace'
], function(_, regexReplace) {
    'use strict';

    var template = _.template('<a class="<%-className%>" target="<%-target%>" href="<%-href%>"><%-text%></a>');

    /**
     * @alias module:js-whatever/js/escape-with-links
     * @desc HTML escapes a string, replacing any hyperlinks found with &lt;a&gt; tags
     * @param {string} text The text to escape
     * @param {boolean} catchSpaces Whether spaces should be treated as part of the link (true) or as the end of the
     * link (false)
     * @param {string} target The 'target' attribute for the &lt;a&gt; tag of any links found, e.g. '_blank'
     * @param {string} className The class to put on the &lt;a&gt; tag of any links found
     * @returns {string} The original string, HTML escaped and with links wrapped in &lt;a&gt; tags
     */
    function escapeWithLinks(text, catchSpaces, target, className) {
        // /\u0080-\uFFFF/ matches any non-ASCII unicode character. These are not technically valid in a URI, but can
        // be escaped using encodeURI.
        var regex = /\(?https?:\/\/[-A-Za-z0-9\u0080-\uFFFF+&@#/%?=~_()|!:,.;']*[-A-Za-z0-9\u0080-\uFFFF+&@#/%=~_()|]/ig;
        var regexSpaces = /\(?https?:\/\/[-A-Za-z0-9\u0080-\uFFFF+&@#/%?=~_()|!:,.;'\s]*[-A-Za-z0-9\u0080-\uFFFF+&@#/%=~_()|]/ig;

        if(_.isUndefined(target) || _.isNull(target)) {
            target = '_blank';
        }

        if(_.isUndefined(className) || _.isNull(className)) {
            className = 'autoLink';
        }

        var reg = catchSpaces === true ? regexSpaces : regex;

        if(!text) {
            return text;
        }

        return regexReplace(reg, String(text), function(url) {
            var wrapLink = false;

            // Check for links wrapped in brackets
            if(url[0] === '(' && url[url.length - 1] === ')') {
                url = url.substring(1, url.length - 1);
                wrapLink = true;
            }

            var link = template({
                className: className,
                target: target,
                href: encodeURI(url),
                text: url
            });

            if(wrapLink) {
                link = '(' + link + ')';
            }

            return link;
        }, _.escape);
    }

    return escapeWithLinks;
});
