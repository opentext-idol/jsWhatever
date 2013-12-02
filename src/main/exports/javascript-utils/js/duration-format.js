define(function(){
    return function(ms, strings, precision) {
        var oneDay = strings ? ' ' + strings['duration.day'] : ' day';
        var days = strings ? ' ' + strings['duration.days'] : ' days';
        var oneHour = strings ? ' ' + strings['duration.short.hour'] : ' hour';
        var hours = strings ? ' ' + strings['duration.short.hours'] : ' hours';
        var oneMin = strings ? ' ' + strings['duration.short.minute'] : ' min';
        var mins = strings ? ' ' + strings['duration.short.minutes'] : ' mins';
        var secs = strings ? strings['duration.short.seconds'] : 's';
        var millis = strings ? strings['duration.short.millisecs'] : 'ms';
        
        var round;

        if (precision == null) {
            precision = 1;
        }

        if (!isFinite(ms)) {
            return ms === Infinity ? '\u221e' : ms === -Infinity  ? '-\u221e' : String(ms);
        }

        var magnitude = Math.abs(ms);

        if (magnitude >= 86400e3) {
            round = ms / 86400e3;
            return Math.abs(round) === 1 ? round + oneDay : round.toFixed(precision) + days;
        }
        else if (magnitude >= 3600e3) {
            round = ms / 3600e3;
            return Math.abs(round) === 1 ? round + oneHour : round.toFixed(precision) + hours;
        }
        else if (magnitude >= 60e3) {
            round = ms / 60e3;
            return Math.abs(round) === 1 ? round + oneMin : round.toFixed(precision) + mins;
        }
        else if (magnitude >= 1e3) {
            return (ms / 1e3).toFixed(precision) + secs;
        }

        return Number(ms).toFixed(precision) + millis;
    };
});
