define([], function(){
    return function ipPad(ip){
        // pads all the digits of an ip address to 3 digits so lexicographic sort works
        return !ip ? ip : String(ip).replace(/\d+/g, function(num){
            return '000'.slice(num.length) + num;
        });
    }
});
