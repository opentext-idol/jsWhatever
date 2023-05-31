/*
 * Copyright 2013-2017 Open Text.
 *
 * Licensed under the MIT License (the "License"); you may not use this file
 * except in compliance with the License.
 *
 * The only warranties for products and services of Open Text and its affiliates
 * and licensors ("Open Text") are as may be set forth in the express warranty
 * statements accompanying such products and services. Nothing herein should be
 * construed as constituting an additional warranty. Open Text shall not be
 * liable for technical or editorial errors or omissions contained herein. The
 * information contained herein is subject to change without notice.
 */

/**
 * @module js-whatever/js/hms-duration-format
 */
define(function() {
    'use strict';

    /**
     * @alias module:js-whatever/js/hms-duration-format
     * @desc Formats a duration as a string comprising of days, hours, minutes and seconds
     * @param {number} duration The duration to format, in seconds
     * @param {DurationFormatStrings} strings Formatting strings to use
     * @returns {string} The duration as a formatted string
     * @example
     * hmsDurationFormat(150); // returns '2 mins, 30s'
     * hmsDurationFormat(1246000); //returns '14 days, 10 hours, 6 mins, 40s'
     */
    function hmsDurationFormat(duration, strings) {
        var oneDay = strings ? ' ' + strings['duration.day'] : ' day';
        var days = strings ? ' ' + strings['duration.days'] : ' days';
        var oneHour = strings ? ' ' + strings['duration.short.hour'] : ' hour';
        var hours = strings ? ' ' + strings['duration.short.hours'] : ' hours';
        var oneMinute = strings ? ' ' + strings['duration.short.minute'] : ' min';
        var minutes = strings ? ' ' + strings['duration.short.minutes'] : ' mins';
        var seconds = strings ? strings['duration.short.seconds'] : 's';

        if(duration === 0) {
            return '0' + seconds;
        }

        if(!isFinite(duration)) {
            return duration === Infinity ? '\u221e' : duration === -Infinity ? '-\u221e' : String(duration);
        }

        var result = '';

        var dayCount = Math.floor(duration / (60 * 60 * 24));
        duration = duration - (dayCount * 60 * 60 * 24);

        if(dayCount > 0) {
            result = result + dayCount + ((dayCount === 1) ? oneDay : days);
            if(duration > 0) {
                result = result + ', ';
            }
        }

        var hourCount = Math.floor(duration / (60 * 60));
        duration = duration - (hourCount * 60 * 60);

        if(hourCount > 0) {
            result = result + hourCount + ((hourCount === 1) ? oneHour : hours);
            if(duration > 0) {
                result = result + ', ';
            }
        }

        var minCount = Math.floor(duration / 60);
        duration = duration - minCount * 60;

        if(minCount > 0) {
            result = result + minCount + ((minCount === 1) ? oneMinute : minutes);
            if(duration > 0) {
                result = result + ', ';
            }
        }

        if(duration > 0) {
            result = result + duration + seconds;
        }

        return result;
    }

    return hmsDurationFormat;
});
