define([
    'js-utils/js/regex-replace',
    'underscore'
], function(regexReplace){
	/**
	 * text - the text to escape
	 * catchSpaces - boolean, whether spaces should be treated as part of the link (true) or as the
	 * end of the link (false)
	 * target - the 'target' attribute for the <a> tag of any links found, e.g. '_blank'
	 * className - the class to put on the <a> tag of any links found
	 */
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