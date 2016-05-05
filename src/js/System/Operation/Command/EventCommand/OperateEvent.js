/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
/**
 * Operate Event Command
 * 
 * @namespace RGPP.System
 * @class OperateEvent
 * @author arcsin
 */
(function(global) {
	/* global RGPP */
	"use strict";

	var objName = "OperateEvent";

	/**
	 * constructor of OperateEvent
	 *
	 * @method constructor
	 * @param receiver Receiver object
	 * @constructor
	 */
	var constructor = function(receiver) {
		var that = {};

		var mEventReceiver = receiver;

		var system = RGPP.System;
		var scriptUtil = system.ScriptUtil.getInstance();

		var mUndoParamBuffer = system.Stack();
		var mRedoParamBuffer = system.Stack();

		that.invoke = invoke;
		that.undo = undo;
		that.redo = redo;

		function invoke() {
			mRedoParamBuffer.clear();
			mEventReceiver.eventDoubleClicked();
			var param = mEventReceiver.operateEventParameter();
			if (param !== null) {
				mUndoParamBuffer.push(param);
			}
		}

		function undo() {
			if (mUndoParamBuffer.isEmpty()) {
				scriptUtil.outputErrMsgToConsole("undo param stack is empty");
				return;
			}

			var param = mUndoParamBuffer.pop();
			mEventReceiver.deleteEventWithParam(param);
			mRedoParamBuffer.push(param);
		}

		function redo() {
			if (mRedoParamBuffer.isEmpty()) {
				scriptUtil.outputErrMsgToConsole("redo param stack is empty");
				return;
			}
			var param = mRedoParamBuffer.pop();
			mEventReceiver.recreateEvent(param);
			mUndoParamBuffer.push(param);

		}

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});
})((this || 0).self || global);