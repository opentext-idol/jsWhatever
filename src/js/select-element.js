define([
    'jquery'
], function() {
    return function selectElement(selector) {
        var el = $(selector);

        if (!el.length) {
            return false;
        }

        // real browsers
        if (window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
            var range = document.createRange();
            range.selectNodeContents(el[0]);
            sel.addRange(range);
            return true;
        } else if (document.selection) { // IE < 9
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el[0]);
            textRange.select();
            return true;
        }

        return false;
    };
});


