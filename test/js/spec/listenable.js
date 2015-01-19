/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'backbone',
    'js-whatever/js/listenable'
], function(Backbone, listenable) {

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