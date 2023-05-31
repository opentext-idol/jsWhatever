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
 * @module js-whatever/js/confirm
 */
define([
    'js-whatever/js/confirm-view'
], function(Confirm) {
    'use strict';

    /**
     * @alias module:js-whatever/js/confirm
     * @desc Creates and returns a new instance of {@link module:js-whatever/js/confirm-view.ConfirmView|ConfirmView}
     * @param {ConfirmViewOptions} config Options passed to the confirm view
     */
    function confirm(config) {
        return new Confirm(config);
    }

    return confirm;
});
