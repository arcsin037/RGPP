/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "CopyEvent";
	/**
	 * Copy Event Command
	 * 
	 * @class CopyEvent
     * @author arcsin
     * @constructor
	 */
	var constructor = function(receiver) {
		var that = {};
		var mEventReceiver = receiver;

		that.invoke = invoke;
		that.undo = undo;
		that.redo = redo;

		function invoke() {
			mEventReceiver.copyEvent();
		}

		function undo() {}

		function redo() {}

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});
})((this || 0).self || global);