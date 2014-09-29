/**
 * Defines a function that allows i18n strings to contain placeholders of the form {n},
 * allowing arguments to be passed in and hide string concatenation
 */

define(['underscore'], function(_) {

    return function(i18n) {
        var processed = {};

        var regex = /\{(\d+)\}/g;

        _.each(i18n, function(value, key) {
            var matches = value.match(regex);

            if(matches === null) {
                processed[key] = value;
            }
            else {
                processed[key] = function() {
                    var userArgs = arguments;

                    var finalValue = value;

                    _.each(matches, function(match) {
                        var number = Number(match.replace(/[\{\}]/g, ''));
                        var innerRegex = new RegExp(match.replace('{', '\\{').replace('}', '\\}'), 'g');
                        finalValue = finalValue.replace(innerRegex, userArgs[number]);
                    });

                    return finalValue;
                };
            }
        });

        return processed;
    };

});

