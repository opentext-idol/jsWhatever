/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'backbone',
    'js-whatever/js/footer',
    'store',
    'bootstrap',
    'jasmine-jquery'
], function (Backbone, Footer, store) {

    describe('Footer', function () {
        var $parent = $('<div/>');

        var MockComponent = Backbone.View.extend({
            initialize: function(options) {
                this.elId = options.elId;
            },

            render: function() {
                this.$el.html('<div id="' + this.elId +'" class="component"></div>')
            }
        });

        beforeEach(function () {
            this.mockVent = _.extend({
                fireResize: jasmine.createSpy('fireResize'),
                navigate: jasmine.createSpy('navigate')
            }, Backbone.Events);

            this.footer = new Footer({
                $parent: $parent,
                tabData: [
                    {
                        key: 'RECENT_TASKS',
                        tab: new MockComponent({elId: 'RECENT_TASKS_TAB'}),
                        view: new MockComponent({elId: 'RECENT_TASKS_VIEW'})
                    },
                    {
                        key: 'ALERTS',
                        tab: new MockComponent({elId: 'ALERTS_TAB'}),
                        view: new MockComponent({elId: 'ALERTS_VIEW'})
                    }
                ],
                vent: this.mockVent
            });

            this.footer.render();
            this.$toggle = this.footer.$('.toggle-footer');

            // Required for tabs to function correctly.
            $('body').append(this.footer.el);
        });

        afterEach(function () {
            this.footer.$el.detach();
            store.clear();
        });

        it('should render tab data', function() {
            expect(this.footer.$('.tab-content #RECENT_TASKS')).toHaveLength(1);
            expect(this.footer.$('.tab-content #RECENT_TASKS #RECENT_TASKS_VIEW')).toHaveLength(1);
            expect(this.footer.$('.tab-content #ALERTS')).toHaveLength(1);
            expect(this.footer.$('.tab-content #ALERTS #ALERTS_VIEW')).toHaveLength(1);

            expect(this.footer.$('.toolbar a[href="#RECENT_TASKS"]')).toHaveLength(1);
            expect(this.footer.$('.toolbar a[href="#RECENT_TASKS"] #RECENT_TASKS_TAB')).toHaveLength(1);
            expect(this.footer.$('.toolbar a[href="#ALERTS"]')).toHaveLength(1);
            expect(this.footer.$('.toolbar a[href="#ALERTS"] #ALERTS_TAB')).toHaveLength(1);
        });

        it('should correctly toggle the footer and update the store on clicking the toggle button or tabs', function() {
            expect($parent).not.toHaveClass('show-footer');
            expect(store.get(this.footer.expanded)).toBeFalsy();

            this.$toggle.click();

            expect($parent).toHaveClass('show-footer');
            expect(store.get(this.footer.expanded)).toBeTruthy();

            this.footer.$('#RECENT_TASKS_TAB').click();

            expect($parent).not.toHaveClass('show-footer');
            expect(store.get(this.footer.expanded)).toBeFalsy();

            this.footer.$('#ALERTS_TAB').click();

            expect($parent).toHaveClass('show-footer');
            expect(store.get(this.footer.expanded)).toBeTruthy();

            this.footer.$('#RECENT_TASKS_TAB').click();

            expect($parent).toHaveClass('show-footer');
            expect(store.get(this.footer.expanded)).toBeTruthy();

            this.$toggle.click();

            expect($parent).not.toHaveClass('show-footer');
            expect(store.get(this.footer.expanded)).toBeFalsy();
        });

        it('should load the state from the store', function() {
            store.set(this.footer.expanded, true);
            this.footer.render();

            expect($parent).toHaveClass('show-footer');
            expect(this.footer.$('#ALERTS')).not.toHaveClass('active');
            expect(this.footer.$('#RECENT_TASKS')).toHaveClass('active');

            store.set(this.footer.index, 1);
            this.footer.render();

            expect($parent).toHaveClass('show-footer');
            expect(this.footer.$('#ALERTS')).toHaveClass('active');
            expect(this.footer.$('#RECENT_TASKS')).not.toHaveClass('active');
        });

        it('should fire a resize event' ,function() {
            expect(this.mockVent.fireResize.calls.count()).toEqual(1);

            this.$toggle.click();

            expect(this.mockVent.fireResize.calls.count()).toEqual(2);
        });
    });

});
