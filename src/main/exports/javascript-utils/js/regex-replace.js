define(function(){
    // Version of 'string'.replace(regex, function(){}) which will apply noFn to the parts of the string that
    // don't match and yesFn to the parts which do match
    return function regexReplace(regex, text, yesFn, noFn){
        if (!regex.global || !yesFn || !noFn) {
            throw new Error('regex must be global, yesFn and noFn must be defined');
        }

        if (!text) {
            return text;
        }

        var match, lastIndex = 0, output = '';

        while(match = regex.exec(text)) {
            var offset = regex.lastIndex - match[0].length;
            if (lastIndex < offset) {
                output += noFn(text.substring(lastIndex, offset));
            }
            output += yesFn.apply(this, match);
            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            output += noFn(text.substring(lastIndex));
        }

        return output;
    };
});