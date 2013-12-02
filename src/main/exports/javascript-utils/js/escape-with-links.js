define([
    'js-utils/js/regex-replace',
    'underscore'
], function(regexReplace){
    return function escapeWithLinks(text, catchSpaces, target, className){
        var regex = /https?:\/\/\S+/g;
        var regexSpaces = /https?:\/\/[^\n\r]+/g;

        if (target == null) {
            target = '_blank';
        }

        if (className == null) {
            className = 'autoLink';
        }

        var reg = catchSpaces === true ? regexSpaces : regex;

        if (!text) {
            return text;
        }

        return regexReplace(reg, String(text), function(url){
            var escapedURL = _.escape(url);
            return '<a class="'+className+'" target="'+target+'" href="'+escapedURL+'">'+escapedURL+'</a>';
        }, _.escape);
    };
});