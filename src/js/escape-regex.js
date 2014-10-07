define(function(){
    return function escapeRegex(str){
        return str.replace(/([\\^$*+\-?.(){}[\]|])/g, '\\$1');
    };
});