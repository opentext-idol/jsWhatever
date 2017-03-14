/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
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
