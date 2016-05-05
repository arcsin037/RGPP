/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "CutEvent";
	/**
	 * Cut Event Command
	 *
	 * @class CutEvent
	 * @author arcsin
     * @constructor
	 */
	var constructor = function(receiver) {
		var that = {};

		var mEventReceiver = receiver;
		var mUndoParamBuffer = RGPP.System.Stack();
		var mRedoParamBuffer = RGPP.System.Stack();

		that.invoke = invoke;
		that.undo = undo;
		that.redo = redo;

		function invoke() {
			mRedoParamBuffer.clear();
			mEventReceiver.cutEvent();
			var param = mEventReceiver.operateEventParameter();
			if (param !== null) {
				mUndoParamBuffer.push(param);
			}
		}

		function undo() {
			if (mUndoParamBuffer.isEmpty()) {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputErrMsgToConsole("undo param stack is empty");
				return;
			}
			var param = mUndoParamBuffer.pop();
			mEventReceiver.recreateEvent(param);
			mRedoParamBuffer.push(param);
		}

		function redo() {
			if (mRedoParamBuffer.isEmpty()) {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputErrMsgToConsole("redo param stack is empty");

				return;
			}
			var param = mRedoParamBuffer.pop();
			mEventReceiver.deleteEvent(param);
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