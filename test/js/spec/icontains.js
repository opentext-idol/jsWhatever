define([
    'js-whatever/js/icontains',
    'underscore'
], function () {

    describe('Utility: `jQuery.expr[":"].icontains`', function () {
        beforeEach(function () {
            this.$parent = $('<div>');
            this.child0 = $('<p>demo</p>').get(0);
            this.child1 = $('<p>duMMy</p>').get(0);
            this.$parent.append(this.child0);
            this.$parent.append(this.child1);
        });

        afterEach(function () {
            this.$parent.remove();
        });

        _.each(['de', 'demo', 'DEMO', 'mo', 'DeMo'], function (content) {
            it('should find a node from content: "' + content + '"', function () {
                var search = this.$parent.find(':icontains("'+content+'")');
                expect(search.length).toBe(1);
                expect(search.get(0)).toBe(this.child0);
            });
        });

        _.each(['du', 'umm', 'Umm', 'dummy', 'my'], function (content) {
            it('should find a node from content: "' + content + '"', function () {
                var search = this.$parent.find(':icontains("'+content+'")');
                expect(search.length).toBe(1);
                expect(search.get(0)).toBe(this.child1);
            });
        });

        _.each(['d', 'm', 'D', 'M'], function (content) {
            it('should find nodes from content: "' + content + '"', function () {
                var search = this.$parent.find(':icontains("'+content+'")');
                expect(search.length).toBe(2);
                expect(search.get(0)).toBe(this.child0);
                expect(search.get(1)).toBe(this.child1);
            });
        });

        _.each(['de!', 'demo!', 'my!', ' ', '!'], function (content) {
            it('should not find any nodes from content: "' + content + '"', function () {
                var search = this.$parent.find(':icontains("'+content+'")');
                expect(search.length).toBe(0);
            });
        });
    });
});