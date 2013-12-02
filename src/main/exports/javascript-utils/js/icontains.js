define([
    'jquery'   
], function(jQuery) {
	jQuery.expr[":"].icontains = jQuery.expr.createPseudo(function (arg) {                                                                                                                                                                
	    return function (elem) {                                                            
	        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;        
	    };
	});
});