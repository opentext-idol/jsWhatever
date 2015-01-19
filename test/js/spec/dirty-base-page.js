/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/dirty-base-page'
], function(DirtyBasePage) {

    describe('Dirty base page', function() {
        beforeEach(function() {
            this.page = new DirtyBasePage();
        });

        describe('renderIfVisible', function() {
            it('should call render when visible', function() {
                spyOn(this.page, 'isVisible').andReturn(true);
                spyOn(this.page, 'render');

                this.page.renderIfVisible();

                expect(this.page.render).toHaveBeenCalled();
            });

            it('should mark the page dirty when not visible', function() {
                spyOn(this.page, 'isVisible').andReturn(false);
                spyOn(this.page, 'render');
                spyOn(this.page, 'setDirty');

                this.page.renderIfVisible();

                expect(this.page.setDirty).toHaveBeenCalledWith(true);
                expect(this.page.render).not.toHaveBeenCalled();
            });
        });

        describe('update', function() {
            beforeEach(function() {
                spyOn(this.page, 'dirtyRender');
            });

            it('should call dirtyRender when dirty', function() {
                this.page.setDirty(true);

                this.page.update();

                expect(this.page.dirtyRender).toHaveBeenCalled();
            });

            it('should not call dirtyRender when not dirty', function() {
                this.page.update();

                expect(this.page.dirtyRender).not.toHaveBeenCalled();
            })
        });
    });

});