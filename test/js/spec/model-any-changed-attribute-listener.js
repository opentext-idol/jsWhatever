/*
 * Copyright 2016-2017 Open Text.
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
    'underscore',
    'backbone',
    'js-whatever/js/model-any-changed-attribute-listener'
], function(_, Backbone, anyAttributeChange) {
    'use strict';

    describe('Add any changed attribute listener', function() {
        beforeEach(function() {
            this.model = new Backbone.Model({
                name: 'Matt',
                age: 25,
                job: 'cook'
            });

            this.listener = _.extend({}, Backbone.Events);
            this.callback = jasmine.createSpy('callback');
            this.changeCallback = anyAttributeChange(this.listener, this.model, ['age', 'job'], this.callback);
        });

        it('ignores change events if a target attribute has not changed', function() {
            this.model.set('name', 'Bob');

            expect(this.callback).not.toHaveBeenCalled();
        });

        it('calls the callback when a target attribute changes', function() {
            this.model.set('age', 26);

            expect(this.callback.calls.count()).toBe(1);
            expect(this.callback.calls.first().object).toBe(this.listener);

            expect(this.callback.calls.first().args[0]).toBe(this.model);
        });

        it('only calls the callback once if multiple target attributes are changed concurrently', function() {
            this.model.set({
                age: 26,
                job: 'developer'
            });

            expect(this.callback.calls.count()).toBe(1);
            expect(this.callback.calls.first().object).toBe(this.listener);
            expect(this.callback.calls.first().args[0]).toBe(this.model);
        });

        it('returns the callback used to listen to the model so it can be removed', function() {
            this.listener.stopListening(this.model, 'change', this.changeCallback);
            this.model.set('age', 26);

            expect(this.callback).not.toHaveBeenCalled();
        });
    });
});
