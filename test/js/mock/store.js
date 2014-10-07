define(function(){

    var storage = {};

    return {

        get: function(key){
            return storage[key];
        },

        set: function(key, value){
            storage[key] = value;
        },

        remove: function(key){
            delete storage[key];
        },

        clear: function() {
            storage = {};
        }

    }
});
