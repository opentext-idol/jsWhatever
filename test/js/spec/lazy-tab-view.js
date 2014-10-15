define([
    'js-utils/js/lazy-tab-view',
    'js-testing/backbone-mock-factory',
    'backbone'
], function(LazyTabView, backboneMockFactory, Backbone) {

    var FirstView = backboneMockFactory.getView(['render', 'getSelectedRoute', 'tabActivation']);
    var SecondView = backboneMockFactory.getView(['render']);

    var showTab = function(tabView, attr) {
        tabView.showTab({}, {
            newPanel: {
                attr: function() { return attr; }
            }
        });
    };

    describe('Lazy Tab View', function() {
        beforeEach(function() {
            $.fn.tabs = jasmine.createSpy('tabs');

            this.oldFragment = Backbone.history.fragment;

            Backbone.history.fragment = '';

            this.tabView = new LazyTabView({
                appPrefix: 'app',
                routePrefix: 'testView',
                router: jasmine.createSpyObj('router', ['on']),
                vent: jasmine.createSpyObj('vent', ['navigate']),
                tabs: [{
                    href: 'first',
                    view: new FirstView()
                }, {
                    href: 'second',
                    view: new SecondView()
                }]
            });

            showTab(this.tabView, 'first');
        });

        afterEach(function() {
            FirstView.reset();
            SecondView.reset();
            Backbone.history.fragment = this.oldFragment;
        });

        describe('getSelectedRoute', function() {
            it('should get the selected route correctly when the view implements getSelectedRoute', function() {
                var route = this.tabView.getSelectedRoute('first');

                expect(route).toBe('testView/first');
                expect(this.tabView.tabs[0].view.getSelectedRoute).toHaveBeenCalled();
            });

            it('should get the selected route correctly when the view does not implement getSelectedRoute', function() {
                var route = this.tabView.getSelectedRoute('second');

                expect(route).toBe('testView/second');
            })
        });

        describe('showTab', function() {
            it('should call tabActivation on the view if it exists', function() {
                expect(this.tabView.tabs[0].view.tabActivation).toHaveBeenCalled();
            });

            it('should render the view if necessary', function() {
                expect(this.tabView.tabs[0].view.render).toHaveBeenCalled();
            });

            it('should render the view once', function() {
                showTab(this.tabView, 'second');
                showTab(this.tabView, 'first');
                expect(this.tabView.tabs[0].view.render).toHaveCallCount(1);
            });

            it('should track the rendered state of the view', function() {
                expect(this.tabView.tabs[0].hasRendered).toBe(true);
                expect(this.tabView.tabs[1].hasRendered).toBeUndefined();
            });
        });
    });

});