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

define([
    'js-whatever/js/dirty-base-page'
], function(DirtyBasePage) {
    'use strict';

    describe('Dirty base page', function() {
        beforeEach(function() {
            this.page = new DirtyBasePage();
        });

        describe('renderIfVisible', function() {
            it('should call render when visible', function() {
                spyOn(this.page, 'isVisible').and.returnValue(true);
                spyOn(this.page, 'render');

                this.page.renderIfVisible();

                expect(this.page.render).toHaveBeenCalled();
            });

            it('should mark the page dirty when not visible', function() {
                spyOn(this.page, 'isVisible').and.returnValue(false);
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
