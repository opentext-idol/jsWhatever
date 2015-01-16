define([
    'js-whatever/js/filtering-collection',
    'backbone'
], function(FilteringCollection, Backbone) {

    describe('Filtering collection', function() {
        beforeEach(function() {
            this.collection = new Backbone.Collection([
                {id: 'Jim', age: 14},
                {id: 'Penny', age: 17}
            ]);

            var modelFilter = function(model, filters) {
                return model.get('age') >= filters.minAge;
            };

            this.filteringCollection = new FilteringCollection([], {
                attributes: ['id', 'age'],
                collection: this.collection,
                filters: {minAge: 15},
                modelFilter: modelFilter
            });
        });

        it('should add existing models which match the filter on initialisation', function() {
            expect(this.filteringCollection.length).toBe(1);
            expect(this.filteringCollection.get('Penny').get('age')).toBe(17);
        });

        it('should add a model added to the tracked collection which matches the filter', function() {
            this.collection.add({id: 'Lucy', age: 18});

            expect(this.filteringCollection.length).toBe(2);
            expect(this.filteringCollection.get('Penny').get('age')).toBe(17);
            expect(this.filteringCollection.get('Lucy').get('age')).toBe(18);
        });

        it('should not add a model added to the tracked collection which does not match the filter', function() {
            this.collection.add({id: 'Bobby', age: 9});

            expect(this.filteringCollection.length).toBe(1);
            expect(this.filteringCollection.get('Penny').get('age')).toBe(17);
        });

        it('should not add model attributes which are not in the attributes list', function() {
            this.collection.add({id: 'Danny', age: 21, favouriteColour: 'red'});

            expect(this.filteringCollection.get('Danny').has('favouriteColour')).toBe(false);
        });

        it('should remove a model removed from the tracked collection if it matches the filter', function() {
            this.collection.remove('Penny');

            expect(this.filteringCollection.length).toBe(0);
        });

        it('should do nothing when a model is removed from the tracked collection which does not match the filter', function() {
            this.collection.remove('Jim');

            expect(this.filteringCollection.length).toBe(1);
            expect(this.filteringCollection.get('Penny').get('age')).toBe(17);
        });

        it('should match changes in the tracked model in the tracking model if the model still matches the filter', function() {
            this.collection.get('Penny').set({age: 18, newAttribute: 'newValue'});

            expect(this.filteringCollection.length).toBe(1);
            expect(this.filteringCollection.get('Penny').get('age')).toBe(18);
            expect(this.filteringCollection.get('Penny').has('newAttribute')).toBe(false);
        });

        it('should add a model whose attributes have changed such that it now matches the filter', function() {
            this.collection.get('Jim').set({age: 15});

            expect(this.filteringCollection.length).toBe(2);
            expect(this.filteringCollection.get('Penny').get('age')).toBe(17);
            expect(this.filteringCollection.get('Jim').get('age')).toBe(15);
        });

        it('should remove a model whose attributes have changed such that it no longer matches the filter', function() {
            this.collection.get('Penny').set({age: 7});

            expect(this.filteringCollection.isEmpty()).toBeTruthy();
        });

        it('should re-filter when the filter() method is called', function() {
            this.filteringCollection.filter({minAge: 12});

            expect(this.filteringCollection.length).toBe(2);
            expect(this.filteringCollection.get('Penny').get('age')).toBe(17);
            expect(this.filteringCollection.get('Jim').get('age')).toBe(14);
        });
    });

});