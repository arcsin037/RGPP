/**
 * Delete Event Command
 * 
 * @namespace RGPP.System
 * @class DeleteEvent
 * @author arcsin
 */
 
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "DeleteEvent";

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
			mEventReceiver.deleteEvent();
			var param = mEventReceiver.operateEventParameter();
			if (param !== null) {
				mUndoParamBuffer.push(param);
			}
		}

		function undo() {
			if (mUndoParamBuffer.isEmpty()) {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputMsgToConsole("[DeleteEvent.js:undo()] undo stack is empty");
				return;
			}
			var param = mUndoParamBuffer.pop();
			mEventReceiver.recreateEvent(param);
			mRedoParamBuffer.push(param);
		}

		function redo() {
			if (mRedoParamBuffer.isEmpty()) {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputMsgToConsole("[DeleteEvent.js:redo()] redo stack is empty");
				return;
			}
			var param = mRedoParamBuffer.pop();
			mEventReceiver.deleteEventWithParam(param);
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