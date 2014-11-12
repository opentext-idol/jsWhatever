/**
 * @module js-utils/js/dirty-base-page
 */
define([
    'js-utils/js/base-page'
], function(BasePage) {

    /**
     * @name module:js-utils/js/dirty-base-page.DirtyBasePage
     * @desc A version of {@link module:base-page|base-page} which tracks dirty state. Call the renderIfVisible to
     * render the view only if it is visible, otherwise a dirty flag will be set to true and the view rendered at a
     * later date
     * @constructor
     * @abstract
     */
    return BasePage.extend(/** @lends module:js-utils/js/dirty-base-page.DirtyBasePage.prototype */{

        /**
         * @desc Calls the render method if the page isVisible, otherwise sets the dirty flag to true
         */
        renderIfVisible: function() {
            if(this.isVisible()) {
                this.render();
            } else {
                this.setDirty(true);
            }
        },

        /**
         * @desc Sets the state of the dirty flag
         * @param {boolean} dirty
         */
        setDirty: function(dirty) {
            this.dirty = dirty;
        },

        /**
         * @desc If the dirty flag is true, call dirtyRender
         */
        update: function() {
            if (this.dirty) {
                this.dirtyRender();
            }
        },

        /**
         * @desc Default implementation of dirtyRender, which just calls render. Override this for your application
         * @abstract
         */
        dirtyRender: function() {
            this.render();
        }

    });

});