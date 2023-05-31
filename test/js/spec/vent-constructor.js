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
    'underscore',
    'js-whatever/js/vent-constructor',
    'sinon'
], function(_, VentConstructor, sinon) {
    'use strict';

    describe('Vent constructor', function() {
        beforeEach(function() {
            this.clock = sinon.useFakeTimers();

            this.router = jasmine.createSpyObj('router', ['navigate']);
            this.vent = new VentConstructor(this.router);
        });

        afterEach(function() {
            this.clock.restore();
        });

        it('should throttle resize events', function() {
            var trigger = spyOn(this.vent, 'trigger');

            _.times(10, function() {
                this.vent.fireResize();
                this.clock.tick(100);
            }, this);

            expect(trigger).toHaveCallCount(5);
        });

        it('should call router.navigate with trigger: true', function() {
            this.vent.navigate('foo/bar');

            var args = this.router.navigate.calls.argsFor(0);
            expect(args[0]).toEqual('foo/bar');
            expect(args[1].trigger).toBe(true);
        });
    });
});
