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
    'backbone',
    'js-whatever/js/list-view',
    'js-testing/backbone-mock-factory'
], function(_, Backbone, ListView, mockFactory) {
    'use strict';

    var itemTemplate = _.template('<p id="item-<%=data.id%>" class="<%=className%>"><%-data.age%></p>');
    var itemTemplateOptions = {className: 'my-class'};

    describe('List view', function() {
        beforeEach(function() {
            this.collection = new Backbone.Collection([
                {id: 'Fred', age: 32},
                {id: 'George', age: 46}
            ], {comparator: 'age'});
        });

        it('should call the correct method on the correct ItemView on model change events when constructed with a collectionChangeEvents map', function() {
            var ItemView = mockFactory.getView(['changeAge']);

            var listView = new ListView({
                collection: this.collection,
                collectionChangeEvents: {age: 'changeAge'},
                ItemView: ItemView
            });

            listView.render();

            this.collection.get('Fred').set('age', 33);

            var fredView = ItemView.instances[0];
            expect(fredView.constructorArgs[0].model.id).toEqual('Fred');
            expect(fredView.changeAge).toHaveBeenCalled();

            expect(ItemView.instances[1].changeAge).not.toHaveBeenCalled();
        });

        it('should display the headerHtml before the ItemViews if specified', function() {
            var listView = new ListView({
                collection: this.collection,
                headerHtml: '<option>funky</option><option>monkey</option>',
                itemOptions: {
                    tagName: 'option',
                    template: _.template('<%=data.id%>')
                }
            });

            listView.render();

            var $options = listView.$('option');
            expect($options).toHaveLength(4);
            expect($options.eq(0)).toHaveText('funky');
            expect($options.eq(1)).toHaveText('monkey');
            expect($options.eq(2)).toHaveText('Fred');
            expect($options.eq(3)).toHaveText('George');

            this.collection.comparator = function(model) {
                return -model.get('age');
            };

            this.collection.sort();

            $options = listView.$('option');
            expect($options).toHaveLength(4);
            expect($options.eq(0)).toHaveText('funky');
            expect($options.eq(1)).toHaveText('monkey');
            expect($options.eq(2)).toHaveText('George');
            expect($options.eq(3)).toHaveText('Fred');
        });

        it('displays the footerHtml after the ItemViews if specified', function() {
            var listView = new ListView({
                collection: this.collection,
                footerHtml: '<option>Penultimate Option</option><option>THE ULTIMATE OPTION</option>',
                itemOptions: {
                    tagName: 'option',
                    template: _.template('<%=data.id%>')
                }
            });

            listView.render();

            var $options = listView.$('option');
            expect($options).toHaveLength(4);
            expect($options.eq(0)).toHaveText('Fred');
            expect($options.eq(1)).toHaveText('George');
            expect($options.eq(2)).toHaveText('Penultimate Option');
            expect($options.eq(3)).toHaveText('THE ULTIMATE OPTION');

            this.collection.add({id: 'Penny', age: 75});

            expect(listView.$('option').eq(2)).toHaveText('Penny');

            this.collection.get('Penny').set('age', 22);
            this.collection.sort();

            $options = listView.$('option');
            expect($options).toHaveLength(5);
            expect($options.eq(0)).toHaveText('Penny');
            expect($options.eq(1)).toHaveText('Fred');
            expect($options.eq(2)).toHaveText('George');
            expect($options.eq(3)).toHaveText('Penultimate Option');
            expect($options.eq(4)).toHaveText('THE ULTIMATE OPTION');
        });

        it('handles a collection remove event before rendering', function() {
            var list = new ListView({
                collection: this.collection,
                itemOptions: {
                    template: itemTemplate,
                    templateOptions: itemTemplateOptions
                }
            });

            this.collection.remove('Fred');
            list.render();

            expect(list.$('p')).toHaveLength(1);
        });

        it('handles a collection sort event before rendering', function() {
            this.collection.get('Fred').set('age', 50);

            var list = new ListView({
                collection: this.collection,
                itemOptions: {
                    template: itemTemplate,
                    templateOptions: itemTemplateOptions
                }
            });

            this.collection.sort();
            list.render();

            var $ps = list.$('p');
            expect($ps).toHaveLength(2);
            expect($ps.eq(0)).toHaveId('item-George');
            expect($ps.eq(1)).toHaveId('item-Fred');
        });

        it('handles a collection change event before rendering', function() {
            var list = new ListView({
                collection: this.collection,
                itemOptions: {
                    template: itemTemplate,
                    templateOptions: itemTemplateOptions
                }
            });

            this.collection.get('Fred').set('age', 33);
            list.render();

            expect(list.$('#item-Fred')).toHaveText('33');
        });

        describe('with default ItemView and no headerHtml', function() {
            beforeEach(function() {
                this.list = new ListView({
                    collection: this.collection,
                    itemOptions: {
                        template: itemTemplate,
                        templateOptions: itemTemplateOptions
                    }
                });

                this.list.render();
            });

            it('should populate itself with existing collection items on initialize and render', function() {
                var $ps = this.list.$('p');
                expect($ps).toHaveLength(2);
                expect($ps).toHaveClass('my-class');

                expect($ps.eq(0)).toHaveText('32');
                expect($ps.eq(0)).toHaveId('item-Fred');
                expect($ps.eq(1)).toHaveText('46');
                expect($ps.eq(1)).toHaveId('item-George');
            });

            it('should set a data-id attribute on each item', function() {
                expect(this.list.$el.children().eq(0)).toHaveAttr('data-id', 'Fred');
            });

            it('should respond to collection "add" events', function() {
                this.collection.add({id: 'Penny', age: 26});

                var $ps = this.list.$('p');
                expect($ps).toHaveLength(3);
                expect($ps).toHaveClass('my-class');

                expect($ps.eq(0)).toHaveText('26');
                expect($ps.eq(0)).toHaveId('item-Penny');

                this.collection.add({id: 'Polly', age: 65});

                expect(this.list.$('p').eq(3)).toHaveId('item-Polly');
            });

            it('should respond to collection "remove" events', function() {
                this.collection.remove(this.collection.get('Fred'));

                var $ps = this.list.$('p');
                expect($ps).toHaveLength(1);
                expect($ps).toHaveText('46');
                expect($ps).toHaveId('item-George');
            });

            it('should respond to collection "change" events', function() {
                this.collection.get('Fred').set('age', 33);

                var $ps = this.list.$('p');
                expect($ps).toHaveLength(2);

                var $p = $ps.filter('#item-Fred');
                expect($p).toHaveText('33');
            });

            it('should respond to collection "sort" events', function() {
                this.collection.get('Fred').set('age', 105);
                this.collection.sort();

                var $ps = this.list.$('p');
                expect($ps.eq(0)).toHaveId('item-George');
                expect($ps.eq(1)).toHaveId('item-Fred');
            });

            it('should respond to collection "reset" events', function() {
                this.collection.reset([{id: 'Adrian', age: 106}]);

                expect(this.list.$('p')).toHaveLength(1);
                expect(this.list.$('p')).toHaveId('item-Adrian');
            });
        });

        describe('with default ItemView and no headerHtml and a maxSize parameter', function() {
            beforeEach(function() {
                this.list = new ListView({
                    collection: this.collection,
                    maxSize: 1,
                    itemOptions: {
                        template: itemTemplate,
                        templateOptions: itemTemplateOptions
                    }
                });

                this.list.render();
            });

            it('should populate itself with existing collection items on initialize and render', function() {
                var $ps = this.list.$('p');
                expect($ps).toHaveLength(1);
                expect($ps).toHaveClass('my-class');

                expect($ps.eq(0)).toHaveText('32');
                expect($ps.eq(0)).toHaveId('item-Fred');
            });

            it('should set a data-id attribute on each item', function() {
                expect(this.list.$el.children().eq(0)).toHaveAttr('data-id', 'Fred');
            });

            it('should respond to collection "add" events', function() {
                this.collection.add({id: 'Penny', age: 26});

                var $ps = this.list.$('p');
                expect($ps).toHaveLength(1);
                expect($ps).toHaveClass('my-class');

                expect($ps.eq(0)).toHaveText('26');
                expect($ps.eq(0)).toHaveId('item-Penny');

                // this one goes at the end, so no DOM change
                this.collection.add({id: 'Polly', age: 65});

                var $ps2 = this.list.$('p');
                expect($ps2).toHaveLength(1);
                expect($ps2).toHaveClass('my-class');

                expect($ps2.eq(0)).toHaveText('26');
                expect($ps2.eq(0)).toHaveId('item-Penny');
            });

            it('should respond to collection "remove" events', function() {
                this.collection.remove(this.collection.get('Fred'));

                var $ps = this.list.$('p');
                expect($ps).toHaveLength(1);
                expect($ps).toHaveText('46');
                expect($ps).toHaveId('item-George');
            });

            it('should respond to collection "change" events', function() {
                this.collection.get('Fred').set('age', 33);

                var $ps = this.list.$('p');
                expect($ps).toHaveLength(1);

                var $p = $ps.filter('#item-Fred');
                expect($p).toHaveText('33');
            });

            it('should respond to collection "sort" events', function() {
                this.collection.get('Fred').set('age', 105);
                this.collection.sort();

                var $ps = this.list.$('p');
                expect($ps.eq(0)).toHaveId('item-George');
            });

            it('should respond to collection "reset" events', function() {
                this.collection.reset([{id: 'Adrian', age: 106}]);

                expect(this.list.$('p')).toHaveLength(1);
                expect(this.list.$('p')).toHaveId('item-Adrian');
            });
        });

        describe('with event proxying', function() {
            beforeEach(function() {
                this.ItemView = mockFactory.getView();

                this.listView = new ListView({
                    collection: this.collection,
                    ItemView: this.ItemView,
                    proxyEvents: ['my-event']
                });

                this.listView.render();

                var eventArguments = this.eventArguments = [];

                this.listView.on('item:my-event', function() {
                    eventArguments.push(_.toArray(arguments));
                });
            });

            it('should proxy ItemView events specified in the proxyEvents option', function() {
                this.ItemView.instances[1].trigger('my-event', 123, 'abc');

                expect(this.eventArguments.length).toBe(1);
                expect(this.eventArguments[0]).toEqual([123, 'abc']);
            });

            it('should stop proxying events when the ItemView is removed', function() {
                this.collection.remove(this.collection.at(0));
                this.ItemView.instances[0].trigger('my-event', 123);

                expect(this.eventArguments.length).toBe(0);

                this.ItemView.instances[1].trigger('my-event', 123);

                expect(this.eventArguments.length).toBe(1);
            });

            it('should stop proxying events when the ListView is removed', function() {
                this.listView.remove();

                this.ItemView.instances[0].trigger('my-event');
                this.ItemView.instances[1].trigger('my-event');

                expect(this.eventArguments.length).toBe(0);
            });
        });
    });
});
