// normal
(function(global) {
	/* global RGPP */
	"use strict";
    var objName = "CommandSimpleInvoker";
    var constructor = function(spec) {
        var that = {};
        
		that.invoke = function(command) {
			command.invoke();
		};
        return that;
    };

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});
    
})((this || 0).self || global);
