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
    'underscore',
    'js-whatever/js/autoload-methods',
    'js-testing/backbone-mock-factory'
], function(_, autoloadMethods, backboneMock) {
    'use strict';

    var Test = backboneMock.getModel(['fetch']);
    var AutoloadTest = backboneMock.getModel();

    _.extend(Test.prototype, autoloadMethods, {
        eventName: 'change'
    });

    _.extend(AutoloadTest.prototype, autoloadMethods, {
        autoload: true,
        eventName: 'change'
    });

    AutoloadTest.prototype.fetch = jasmine.createSpy('fetch').and.callFake(function(options) {
        options.success();
    });

    describe('Autoload Methods', function() {
        beforeEach(function() {
            this.testModel = new Test();
        });

        it('should set loaded to true when a change event is fired', function() {
            expect(this.testModel.loaded).toBeFalsy();

            this.testModel.trigger('change');

            expect(this.testModel.loaded).toBeTruthy();
        });

        describe('onLoad', function() {
            it('should call the provided callback when loaded is true', function() {
                this.testModel.loaded = true;

                var callback = jasmine.createSpy('onLoad callback');
                this.testModel.onLoad(callback);

                expect(callback).toHaveBeenCalledWith(this.testModel);
            });

            it('should call the callback once after the model has loaded', function() {
                var callback = jasmine.createSpy('onLoad callback');
                this.testModel.onLoad(callback);

                expect(callback).not.toHaveBeenCalled();

                this.testModel.trigger('change');

                expect(callback).toHaveBeenCalledWith(this.testModel);

                this.testModel.trigger('change');

                expect(callback).toHaveCallCount(1);
            });
        });

        describe('when autoload is true', function() {
            beforeEach(function() {
                this.autoLoading = new AutoloadTest();
            });

            it('should fetch when initialised', function() {
                expect(this.autoLoading.fetch).toHaveBeenCalled();
            });

            it('should set loaded to true after fetching', function() {
                expect(this.autoLoading.loaded).toBeTruthy();
            });
        });
    });
});
