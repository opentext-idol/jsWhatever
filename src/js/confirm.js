/**
 * @module {function} confirm
 * @desc Creates and returns a new instance of {@link module:confirm-view|ConfirmView}. Takes a {@link ConfirmViewOptions}.
 */
define([
    'js-utils/js/confirm-view'
], function(Confirm){

    return function(config) {
        return new Confirm(config);
    };
});