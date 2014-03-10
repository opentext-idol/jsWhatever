define([], function(){

    var spinnerClasses = 'icon-spinner icon-spin';

    return {
        enableSpinner: function($element, classesToRemove){
            $element.removeClass(classesToRemove).addClass(spinnerClasses);
        },

        disableSpinner: function($element, classesToAdd){
            $element.removeClass(spinnerClasses).addClass(classesToAdd);
        }
    };
});