define([
    'underscore'
], function() {
    _.mixin({
        endsWith: function(string, suffices) {
            if(_.isString(string) && (_.isArray(suffices) || _.isString(suffices))){
                var length = string.length;

                if(!_.isArray(suffices)) {
                    suffices = [suffices];
                }

                return _.some(suffices, function(suffix) {
                    return string.indexOf(suffix, length - suffix.length) !== -1;
                });
            }

            return false;
        }
    });
});
