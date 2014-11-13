/**
 * @module js-whatever/js/confirm
 */
define([
    'js-whatever/js/confirm-view'
], function(Confirm){
    //noinspection UnnecessaryLocalVariableJS
    /**
     * @alias module:js-whatever/js/confirm
     * @desc Creates and returns a new instance of {@link module:js-whatever/js/confirm-view.ConfirmView|ConfirmView}
     * @param {ConfirmViewOptions} config Options passed to the confirm view
     */
    var confirm = function(config) {
        return new Confirm(config);
    };

    return confirm;
});