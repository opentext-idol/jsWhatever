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
 * @module js-whatever/js/dirty-base-page
 */
define([
    'js-whatever/js/base-page'
], function(BasePage) {
    'use strict';

    /**
     * @name module:js-whatever/js/dirty-base-page.DirtyBasePage
     * @desc A version of {@link module:js-whatever/js/base-page.BasePage|BasePage} which tracks dirty state. Call the renderIfVisible to
     * render the view only if it is visible, otherwise a dirty flag will be set to true and the view rendered at a
     * later date
     * @constructor
     * @extends module:js-whatever/js/base-page.BasePage
     * @abstract
     */
    return BasePage.extend(/** @lends module:js-whatever/js/dirty-base-page.DirtyBasePage.prototype */{
        /**
         * @desc Calls the {@link js-whatever/js/dirty-base-page.DirtyBasePage#render|render} method if the page isVisible, otherwise sets the dirty flag to true
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
         * @desc If the dirty flag is true, call {@link js-whatever/js/dirty-base-page.DirtyBasePage#dirtyRender|dirtyRender}
         */
        update: function() {
            if(this.dirty) {
                this.dirtyRender();
            }
        },

        /**
         * @desc Default implementation of dirtyRender, which just calls {@link js-whatever/js/dirty-base-page.DirtyBasePage#render|render}
         * @abstract
         */
        dirtyRender: function() {
            this.render();
        }
    });
});
