/**
 * Select Event Command
 * 
 * @namespace RGPP.System
 * @class SelectEvent
 * @author arcsin
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "SelectEvent";

	/**
	 * constructor of SelectEvent
	 *
	 * @method constructor
	 * @param receiver Receiver object
	 * @constructor
	 */
	var constructor = function(receiver) {
		var that = {};

		var mEventReceiver = receiver;

		that.invoke = invoke;
		that.undo = undo;
		that.redo = redo;


		function invoke() {
			mEventReceiver.eventClicked();
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