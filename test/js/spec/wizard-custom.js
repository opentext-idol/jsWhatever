/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/wizard-custom',
    'js-testing/backbone-mock-factory'
], function(Wizard, backboneMockFactory) {
    'use strict';

    var View1 = backboneMockFactory.getView(['render']);
    var View2 = backboneMockFactory.getView(['render']);

    describe('Custom Wizard', function() {
        beforeEach(function() {
            this.wizard = new Wizard({
                steps: [{
                    active: true,
                    'class': 'first',
                    constructor: View1,
                    label: 'First'
                }, {
                    'class': 'second',
                    constructor: View2,
                    label: 'Second'
                }],
                strings: {
                    last: 'Last',
                    next: 'Next',
                    prev: 'Prev'
                }
            });

            this.wizard.render();

            this.wizard.renderActiveStep();
        });

        it('should construct all the views when rendering', function() {
            expect(this.wizard.steps[0].view).toBeDefined();
            expect(this.wizard.steps[1].view).toBeDefined();
        });

        it('should get the current step', function() {
            expect(this.wizard.getCurrentStep()).toBe(this.wizard.steps[0]);
        });

        it('should get steps by index', function() {
            expect(this.wizard.getStep(1)).toBe(this.wizard.steps[1]);
        });

        it('should get steps by attribute', function() {
            expect(this.wizard.getStepByAttribute({label: 'Second'})).toBe(this.wizard.steps[1]);
        });

        describe('handle step change', function() {
            it('should render steps when changing to them', function() {
                expect(this.wizard.steps[0].view.render).toHaveBeenCalled();

                var renderOptions = {};

                this.wizard.handleStepChange({}, 0, 1, renderOptions);

                expect(this.wizard.steps[1].view.render).toHaveBeenCalledWith(renderOptions);
            });

            it('should only render steps once', function() {
                this.wizard.handleStepChange({}, 0, 1);
                this.wizard.handleStepChange({}, 1, 0);

                expect(this.wizard.steps[0].view.render).toHaveCallCount(1);
                expect(this.wizard.steps[1].view.render).toHaveCallCount(1);
            })
        });
    });
});
