/*
 * Copyright 2013-2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-whatever/js/list-view',
    'backbone'
], function(ListView, Backbone) {

    var itemTemplate = _.template('<p id="item-<%=data.id%>" class="<%=className%>"><%-data.age%></p>');
    var itemTemplateOptions = {className: 'my-class'};

    describe('List view', function() {
        beforeEach(function() {
            this.collection = new Backbone.Collection([
                {id: 'Fred', age: 32},
                {id: 'George', age: 46}
            ]);
        });

        describe('with an itemFilter', function() {
            beforeEach(function() {
                var filters = this.filters = {
                    maxAge: 40
                };

                this.list = new ListView({
                    collection: this.collection,
                    itemTemplate: itemTemplate,
                    itemTemplateOptions: itemTemplateOptions,
                    itemFilter: function(model) {
                        return model.get('age') < filters.maxAge;
                    }
                });

                this.list.render();
            });

            it('should use the itemFilter function to restrict which models are rendered', function() {
                var $ps = this.list.$('p');
                expect($ps).toHaveLength(1);
                expect($ps).toHaveId('item-Fred');

                this.collection.add({id: 'Sally', age: 18});
                this.collection.add({id: 'Henrietta', age: 68});

                $ps = this.list.$('p');
                expect($ps).toHaveLength(2);
                expect($ps.filter('#item-Sally')).toHaveLength(1);
                expect($ps.filter('#item-Henrietta')).toHaveLength(0);
            });

            it('should re-filter items when filter() is called', function() {
                this.collection.add({id: 'Sally', age: 18});
                this.collection.add({id: 'Henrietta', age: 68});

                this.filters.maxAge = 20;
                this.list.filter();

                var $ps = this.list.$('p');
                expect($ps).toHaveLength(1);
                expect($ps.filter('#item-Sally')).toHaveLength(1);
                expect($ps.filter('#item-Fred')).toHaveLength(0);

                this.filters.maxAge = 1000;
                this.list.filter();

                $ps = this.list.$('p');
                expect($ps).toHaveLength(4);
            });
        });

        describe('with no itemFilter', function() {
            beforeEach(function() {
                this.list = new ListView({
                    collection: this.collection,
                    itemTemplate: itemTemplate,
                    itemTemplateOptions: itemTemplateOptions
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

            it('should respond to collection "add" events', function() {
                this.collection.add({id: 'Penny', age: 26});

                var $ps = this.list.$('p');
                expect($ps).toHaveLength(3);
                expect($ps).toHaveClass('my-class');

                expect($ps.eq(2)).toHaveText('26');
                expect($ps.eq(2)).toHaveId('item-Penny');
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
                var george = this.collection.models[1];
                this.collection.models[1] = this.collection.models[0];
                this.collection.models[0] = george;
                this.collection.trigger('sort');

                var $ps = this.list.$('p');
                expect($ps.eq(0)).toHaveId('item-George');
                expect($ps.eq(1)).toHaveId('item-Fred');
            });

            it('should respond to collection "reset" events', function() {
                this.collection.reset({id: 'Adrian', age: 106});

                expect(this.list.$('p')).toHaveLength(1);
                expect(this.list.$('p')).toHaveId('item-Adrian');
            });
        });
    });

});
