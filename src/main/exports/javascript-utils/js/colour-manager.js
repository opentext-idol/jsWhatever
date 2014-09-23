define([
    'underscore', 'raphael'
], function() {

    var hex2Rgb = function(hex) {
        if(hex[0] === '#') {
            hex = hex.substring(1);
        }

        if(hex.length !== 6) {
            throw new Error('Invalid hex string supplied: ' + hex);
        }

        var rString = hex.substring(0,2);
        var gString = hex.substring(2,4);
        var bString = hex.substring(4,6);

        return {
            r: parseInt(rString, 16),
            g: parseInt(gString, 16),
            b: parseInt(bString, 16)
        }
    };

    var rgb2hsb = function(r, g, b) {
         r = r / 255;
         g = g / 255;
         b = b / 255;

        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);

        var c = (max - min);
        var s;

        if(max !== 0) {
            s = c / max;
        }
        else {
            s = 0;
        }

        var h;

        if(c === 0) {
            h = 0;
        }
        else if(max === r) {
            h = (g - b) / c;
        }
        else if(max === g) {
            h = 2 + (b - r) / c;
        }
        else {
            h = 4 + (r - g) / c;
        }

        // +360 to avoid changes when compared to Raphael
        h = ((h + 360) % 6) / 6;

        return {
            h: h,
            s: s,
            b: max
        }
    };

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
            var rgb = hex2Rgb(hexIn);
            var hsb = rgb2hsb(rgb.r, rgb.g, rgb.b);
            hsb.s = Math.min(1, hsb.s * fraction);
            return Raphael.hsb(hsb.h, hsb.s, hsb.b);
        }
    });

    return ColourManager;

});