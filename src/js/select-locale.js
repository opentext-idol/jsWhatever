/*
 * Copyright 2026 Open Text.
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

/*
 * Re-implements requirejs-i18n@2.0.6's load()/addPart()/mixin() locale-selection algorithm
 * without the "i18n!" RequireJS loader plugin. There is no "_" -> "-" normalisation and no
 * other locale-tag munging, matching the original plugin exactly.
 */
'use strict';

function hasOwn(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

// Never overwrites a key `target` already owns - this is what lets the caller merge "most
// specific locale first" and have the most specific value win, without a deep clone or an
// explicit priority comparison.
function mixin(target, source) {
    if (source) {
        for (var prop in source) {
            if (hasOwn(source, prop)) {
                if (!hasOwn(target, prop)) {
                    target[prop] = source[prop];
                } else if (isPlainObject(target[prop]) && isPlainObject(source[prop])) {
                    mixin(target[prop], source[prop]);
                }
            }
        }
    }

    return target;
}

function currentLocaleTag() {
    var nav = typeof navigator === 'object' && navigator ? navigator : {};
    var tag = (nav.languages && nav.languages[0]) || nav.language || nav.userLanguage || 'root';

    return String(tag).toLowerCase();
}

// Returns the locale path, root first then increasingly specific, keeping only the tags that
// are actually declared in `declared` (an object whose own keys are the supported locale
// tags) - an undeclared prefix is skipped, exactly like requirejs-i18n's addPart().
function localePath(declared) {
    var tag = currentLocaleTag();
    var parts = tag === 'root' ? [] : tag.split('-');
    var path = [];

    if (hasOwn(declared, 'root')) {
        path.push('root');
    }

    var prefix = '';
    for (var i = 0; i < parts.length; i++) {
        prefix = prefix ? prefix + '-' + parts[i] : parts[i];

        if (hasOwn(declared, prefix)) {
            path.push(prefix);
        }
    }

    return path;
}

/**
 * @desc Merges the locale bundles declared on a master bundle object, picking the browser's
 * locale at call time.
 * @param {Object.<string, function(): Object>} thunks Map from locale tag (e.g. 'root',
 * 'en-gb') to a function returning that locale's bundle object. Bundles are only resolved for
 * locale tags that are actually needed, in root-first order.
 */
function selectLocale(thunks) {
    var path = localePath(thunks);
    var result = {};

    for (var i = path.length - 1; i >= 0; i--) {
        result = mixin(result, thunks[path[i]]());
    }

    return result;
}

module.exports = selectLocale;
