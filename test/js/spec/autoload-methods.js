define([
    'js-utils/js/autoload-methods',
    'js-testing/backbone-mock-factory'
], function(autoloadMethods, backboneMock) {

    var Test = backboneMock.getModel(['fetch']);
    var AutoloadTest = backboneMock.getModel();

    _.extend(Test.prototype, autoloadMethods, {
        eventName: 'change'
    });

    _.extend(AutoloadTest.prototype, autoloadMethods, {
        autoload: true,
        eventName: 'change'
    });

    AutoloadTest.prototype.fetch = jasmine.createSpy('fetch').andCallFake(function(options) {
        options.success();
    });

    describe('Autoload Methods', function() {
        beforeEach(function () {
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