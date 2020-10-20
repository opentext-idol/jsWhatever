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

define([
    'jquery',
    'backbone',
    'js-whatever/js/listenable'
], function($, Backbone, listenable) {
    'use strict';

    describe('listenable', function() {
        beforeEach(function() {
            this.view = new Backbone.View();

            this.element = $('<div></div>');
        });

        it("should work with Backbone's listenTo and stopListening", function() {
            var spy = jasmine.createSpy('test event handler');

            this.view.listenTo(listenable(this.element), 'click', spy);

            this.element.click();

            expect(spy).toHaveCallCount(1);

            this.view.stopListening();

            this.element.click();

            expect(spy).toHaveCallCount(1);
        });
    });
});
