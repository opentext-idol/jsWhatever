define(function(){
    return function(s, strings) {
        var oneDay = strings ? ' ' + strings['duration.day'] : ' day';
        var days = strings ? ' ' + strings['duration.days'] : ' days';
        var oneHour = strings ? ' ' + strings['duration.short.hour'] : ' hour';
        var hours = strings ? ' ' + strings['duration.short.hours'] : ' hours';
        var oneMin = strings ? ' ' + strings['duration.short.minute'] : ' min';
        var mins = strings ? ' ' + strings['duration.short.minutes'] : ' mins';
        var secs = strings ?  strings['duration.short.seconds'] : 's';
        
        if (s == 0) return '0' + secs;

        if (!isFinite(s)) {
            return s === Infinity ? '\u221e' : s === -Infinity  ? '-\u221e' : String(s);
        }

        var result = '';

        var dayCount = Math.floor(s / (60*60*24));
        s = s - (dayCount * 60*60*24);

        if (dayCount > 0) {
            result = result + dayCount + ((dayCount == 1) ? oneDay : days);
            if (s > 0) {
                result = result +', ';
            }
        }

        var hourCount = Math.floor(s / (60*60));
        s = s -(hourCount * 60*60);

        if (hourCount > 0) {
            result = result + hourCount + ((hourCount == 1) ? oneHour : hours);
            if (s > 0) {
                result = result +', ';
            }
        }

        var minCount = Math.floor(s / 60);
        s = s - minCount * 60;

        if (minCount > 0) {
            result = result + minCount + ((minCount == 1) ? oneMin: mins);
            if (s > 0) {
                result = result +', ';
            }
        }

        if (s > 0) {
            result = result + s + secs;
        }

        return result;
    };
});
