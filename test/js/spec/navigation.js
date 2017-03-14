/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/navigation'
], function(Navigation) {
    'use strict';

    var router = jasmine.createSpyObj('router', ['on']);

    var TestNavigation = Navigation.extend({

        event: 'route:test',
        router: router,

        getTemplateParameters: function() {
            return {
                appName: 'Test App',
                brandRoute: 'app/test',
                subheading: 'Best Thing Ever',
                navLeft: [{
                    href: 'first',
                    icon: 'icon-meh',
                    label: 'First',
                    pageName: 'first'
                }, {
                    href: 'second',
                    icon: 'icon-fighter-jet',
                    label: 'Second',
                    pageName: 'second'
                }],
                navRight: [{
                    icon: 'icon-bug',
                    label: 'Menu',
                    menuId: 'menu',
                    children: [{
                        href: 'first-child',
                        icon: 'icon-fighter-jet',
                        label: 'First Child',
                        pageName: 'first-child'
                    }, {
                        href: 'second-child',
                        icon: 'icon-beer',
                        label: 'Second Child',
                        pageName: 'second-child'
                    }]
                }]
            }
        }

    });

    describe('Navigation', function() {
        beforeEach(function() {
            this.pages = jasmine.createSpyObj('pages', ['navigateToPage']);

            this.navigation = new TestNavigation({
                pages: this.pages
            });

            this.navigation.render();
        });

        describe('navigate', function() {
            it('should respond to navigation correctly', function() {
                this.navigation.navigate('first');

                expect(this.navigation.$('li[data-pagename="first"]')).toHaveClass('active');
                expect(this.navigation.$('li[data-pagename="second"]')).not.toHaveClass('active');
            });

            it('should respond to multiple navigations correctly', function() {
                this.navigation.navigate('first');

                expect(this.navigation.$('li[data-pagename="first"]')).toHaveClass('active');

                this.navigation.navigate('second');

                expect(this.navigation.$('li[data-pagename="first"]')).not.toHaveClass('active');
                expect(this.navigation.$('li[data-pagename="second"]')).toHaveClass('active');
            });

            it('should handle menu navigation correctly', function() {
                this.navigation.navigate('first-child');

                expect(this.navigation.$('li[data-pagename="first"]')).not.toHaveClass('active');
                expect(this.navigation.$('li[data-pagename="first-child"]')).toHaveClass('active');
                expect(this.navigation.$('li[data-menu-id="menu"]')).toHaveClass('active');
            });
        });

        describe('render', function() {
            beforeEach(function() {
                spyOn(this.navigation, 'navigate');
            });

            it('should correctly add click listeners', function() {
                this.navigation.$('li[data-pagename="first"] > a').click();

                expect(this.navigation.navigate).toHaveBeenCalled();
                expect(this.pages.navigateToPage).toHaveBeenCalled();
            });

            it('should not handle middle clicks on the links', function() {
                this.navigation.$('li[data-pagename="first"] > a').click({which: 2});

                expect(this.navigation.navigate).not.toHaveBeenCalled();
                expect(this.pages.navigateToPage).not.toHaveBeenCalled();
            })
        });
    });
});
