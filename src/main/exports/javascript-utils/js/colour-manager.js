define([
    'underscore', 'raphael'
], function() {

    // getColour maps user-defined keys to a (hopefully) unique colour.

    var predefinedColours = function() {
        return ['#edc240', '#afd8f8', '#cb4b4b', '#1f77b4', '#ff7f0e', '#2ca02c', '#8c564b',
            '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
    };

    var generateColour =  function() {
        return '#' + Math.floor(Math.random() * (0xFFFFFF - 0x100000) + 0x100000).toString(16);
    };

    var ColourManager = function() {
        this.colourList = [];
        this.colourMap = {};

        this.reset();
    };

    _.extend(ColourManager.prototype, {
        reset: function() {
            this.colourList = predefinedColours();
            this.colourMap = {};
        },

        getColour: function(key) {
            if (this.colourMap[key]) {
                return this.colourMap[key];
            }

            var newColour = _.find(this.colourList, function(colour) {
                return !_.contains(this.colourMap, colour);
            }, this);

            if (!newColour) {
                newColour = generateColour();
                this.colourList.push(newColour);
            }

            this.colourMap[key] = newColour;

            return newColour;
        },

        deleteColour: function(key) {
            delete this.colourMap[key];
        },

        changeSaturation: function (hexIn, fraction) {
            var rgb = Raphael.getRGB(hexIn);
            var hsb = Raphael.rgb2hsb(rgb.r, rgb.g, rgb.b);
            hsb.s = Math.min(1, hsb.s * fraction);
            return Raphael.hsb(hsb.h, hsb.s, hsb.b);
        }
    });

    return ColourManager;

});