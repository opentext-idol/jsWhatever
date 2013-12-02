define(function(){
    return function(singular, plural){
        return function(count) {
            if ((count%1) !== 0) {
                // prevents printing of fractional documents on flot axes
                return '';
            }
            return count + (count === 1 || count === -1 ? ' ' + singular : ' ' + plural);
        };
    };
});