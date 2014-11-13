define([
    'js-whatever/js/vent-constructor',
    'underscore'
], function(VentConstructor, _) {

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

            expect(this.router.navigate.calls[0].args[0]).toEqual('foo/bar');
            expect(this.router.navigate.calls[0].args[1].trigger).toBe(true);
        });

    });

});