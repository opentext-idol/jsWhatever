/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'underscore',
    'js-whatever/js/colour-manager'
], function(_, ColourManager) {
    'use strict';

    var numberPredefined = 11;

    function getKey() {
        return _.uniqueId();
    }

    describe('Utility: ColourManager', function() {
        beforeEach(function() {
            this.colourManager = new ColourManager();

            jasmine.addMatchers({
                toContainADuplicate: function() {
                    return {
                        compare: function(actual) {
                            var values = _.values(actual);

                            return {
                                pass: _.unique(values).length !== values.length
                            }
                        }
                    }
                },
                toBeAHexColour: function() {
                    return {
                        compare: function(actual) {
                            return {
                                pass: /^#[0-9a-f]{6}$/.exec(actual)
                            }
                        }
                    }
                }
            });
        });

        describe('colour mapping', function() {
            beforeEach(function() {
                this.colours = {};

                var key;
                for(var ii = 0; ii < numberPredefined; ii++) {
                    key = getKey();
                    this.colours[key] = this.colourManager.getColour(key);
                }
            });

            it('should return LOTS of colours', function() {
                for(var ii = 0; ii < 100; ii++) {
                    expect(this.colourManager.getColour(getKey())).toBeAHexColour();
                }
            });

            it('should return unique hex colours for at least ' + numberPredefined + ' keys', function() {
                _.each(this.colours, function(colour) {
                    expect(colour).toBeAHexColour();
                });

                expect(this.colours).not.toContainADuplicate();
            });

            it('should return the same hex colour when given the same key', function() {
                _.each(this.colours, function(colour, key) {
                    expect(colour).toEqual(this.colourManager.getColour(key));
                }, this)
            });

            it('should allow deletion of a key and reassigning of the associated colour', function() {
                var originalKey = _.keys(this.colours)[2];
                var newKey = getKey();
                var colour = this.colours[originalKey];

                this.colourManager.deleteColour(originalKey);
                expect(this.colourManager.getColour(newKey)).toEqual(colour);
                expect(this.colourManager.getColour(newKey)).toEqual(colour);
            });
        });

        describe('reset function', function() {
            it('should reset the colour map', function() {
                var ii, key;
                var colours = [];

                for(ii = 0; ii < numberPredefined; ii++) {
                    key = getKey();
                    colours.push({
                        key: key,
                        colour: this.colourManager.getColour(key)
                    });
                }

                this.colourManager.reset();

                for(ii = 0; ii < numberPredefined; ii++) {
                    // colours should be assigned first-come-first-serve on keys; so if you ask for keys in a different order
                    // you should get back the colours in the same order
                    expect(this.colourManager.getColour(colours[numberPredefined - 1 - ii].key)).toEqual(colours[ii].colour);
                }
            });
        });

        describe('change saturation function', function() {
            var originalColour = '#70E09E';

            it('should have a function which changes the saturation of a colour by a given fraction', function() {
                var finalColour = this.colourManager.changeSaturation(originalColour, 0.5);
                expect(finalColour).toEqual('#a8e0be');
            });

            it('should not increase the saturation above 100%', function() {
                var finalColour = this.colourManager.changeSaturation(originalColour, 100);
                expect(finalColour).toEqual('#00e05b');
            });
        });
    });
});
