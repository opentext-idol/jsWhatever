/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/list-view',
    'backbone',
    'js-testing/backbone-mock-factory'
], function(ListView, Backbone, mockFactory) {

    var itemTemplate = _.template('<p id="item-<%=data.id%>" class="<%=className%>"><%-data.age%></p>');
    var itemTemplateOptions = {className: 'my-class'};

    describe('List view', function() {
        beforeEach(function() {
            this.collection = new Backbone.Collection([
                {id: 'Fred', age: 32},
                {id: 'George', age: 46}
            ], {comparator: 'age'});
        });

        it('should call the correct method on the correctItemView on model change events when constructed with a collectionChangeEvents map', function() {
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

        describe('with default ItemView', function() {
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
                    eventArguments.push(arguments);
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
