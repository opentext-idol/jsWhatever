define(['underscore'],function(){
    return function(val){
        return _.isArray(val) ? val :
            val ? [val] : [];
    };
});