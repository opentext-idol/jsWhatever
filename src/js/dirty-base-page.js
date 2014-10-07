define([
    'js-utils/js/base-page'
], function(BasePage) {

    return BasePage.extend({

        renderIfVisible: function() {
            if(this.isVisible()) {
                this.render();
            } else {
                this.setDirty(true);
            }
        },

        setDirty: function(dirty) {
            this.dirty = dirty;
        },

        update: function() {
            if (this.dirty) {
                this.dirtyRender();
            }
        },

        dirtyRender: function() {
            this.render();
        }

    });

});