(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "EraserCommand";

	var constructor = function(receiver) {
		var that = {};
		var mReceiver = receiver;

		that.invoke = function() {
			mReceiver.eraser();
		};

		that.undo = function() {

		};

		that.redo = function() {

		};

		return that;
	};
    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);