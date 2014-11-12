/**
 * @module js-utils/js/confirm
 */
define([
    'js-utils/js/confirm-view'
], function(Confirm){
    //noinspection UnnecessaryLocalVariableJS
    /**
     * @alias module:js-utils/js/confirm
     * @desc Creates and returns a new instance of {@link module:confirm-view|ConfirmView}
     * @param {ConfirmViewOptions} config Options passed to the confirm view
     */
    var confirm = function(config) {
        return new Confirm(config);
    };

    return confirm;
});