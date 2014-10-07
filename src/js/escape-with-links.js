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
        var regex = /\(?https?:\/\/[-A-Za-z0-9+&@#/%?=~_()|!:,.;']*[-A-Za-z0-9+&@#/%=~_()|]/ig;
        var regexSpaces = /\(?https?:\/\/[-A-Za-z0-9+&@#/%?=~_()|!:,.;'\s]*[-A-Za-z0-9+&@#/%=~_()|]/ig;

        if (_.isUndefined(target) || _.isNull(target)) {
            target = '_blank';
        }

        if (_.isUndefined(className) || _.isNull(className)) {
            className = 'autoLink';
        }

        var reg = catchSpaces === true ? regexSpaces : regex;

        if (!text) {
            return text;
        }

        return regexReplace(reg, String(text), function(url){

	        var wrapLink = false
	        // Check for links wrapped in brackets
	        if (url[0] === '(' && url[url.length -1] === ')') {
		        url = url.substring(1, url.length - 1)
		        wrapLink = true
	        }

            var escapedURL = _.escape(url);
	        var link = '<a class="'+className+'" target="'+target+'" href="'+escapedURL+'">'+escapedURL+'</a>'
	        if (wrapLink) {
		        link = '(' + link + ')'
	        }
            return link;
        }, _.escape);
    };
});