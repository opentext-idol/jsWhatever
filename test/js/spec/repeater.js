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
    'js-whatever/js/repeater',
    'sinon'
], function(Repeater, sinon) {
    'use strict';

    describe('Repeater', function() {
        it('should not update if not started', function() {
            var clock = sinon.useFakeTimers();
            var counter = 0;

            new Repeater(function() {
                counter += 1;
            }, 500);

            expect(counter).toBe(0);
            clock.tick(500);
            expect(counter).toBe(0);
            clock.tick(500);
            expect(counter).toBe(0);

            clock.restore();
        });

        it('should update if started and at the correct intervals', function() {
            var clock = sinon.useFakeTimers();
            var counter = 0;

            new Repeater(function() {
                counter += 1;
            }, 500).start();

            expect(counter).toBe(0);
            clock.tick(499);
            expect(counter).toBe(0);
            clock.tick(1);
            expect(counter).toBe(1);
            clock.tick(499);
            expect(counter).toBe(1);
            clock.tick(1);
            expect(counter).toBe(2);

            clock.restore();
        });

        it('should stop when required', function() {
            var clock = sinon.useFakeTimers();
            var counter = 0;

            var model = new Repeater(function() {
                counter += 1;
            }, 500).start();

            expect(counter).toBe(0);
            clock.tick(500);
            expect(counter).toBe(1);
            clock.tick(500);
            expect(counter).toBe(2);

            model.stop();

            expect(counter).toBe(2);
            clock.tick(500);
            expect(counter).toBe(2);

            clock.restore();
        });

        it('should update without starting when requested', function() {
            var clock = sinon.useFakeTimers();
            var counter = 0;

            var model = new Repeater(function() {
                counter += 1;
            }, 500);

            expect(counter).toBe(0);
            clock.tick(500);
            expect(counter).toBe(0);

            model.update();

            expect(counter).toBe(1);
            clock.tick(500);
            expect(counter).toBe(1);

            clock.restore();
        });

        it('should update and continue repeating when requested', function() {
            var clock = sinon.useFakeTimers();
            var counter = 0;

            var model = new Repeater(function() {
                counter += 1;
            }, 500).start();

            expect(counter).toBe(0);
            clock.tick(500);
            expect(counter).toBe(1);
            clock.tick(250);
            expect(counter).toBe(1);

            model.update();

            expect(counter).toBe(2);
            clock.tick(250);
            expect(counter).toBe(2);
            clock.tick(250);
            expect(counter).toBe(3);
            clock.tick(500);
            expect(counter).toBe(4);

            clock.restore();
        });
    });
});
