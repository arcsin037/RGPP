(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "CommandInvoker";

	var constructor = function() {
		var that = {};

		var mUndoBuffer = null;
		var mRedoBuffer = null;

		that.initialize = initialize;
		that.invoke = invoke;
		that.undo = undo;
		that.redo = redo;

		var scriptUtil = RGPP.System.ScriptUtil.getInstance();

		function initialize() {
			mUndoBuffer = RGPP.System.Stack();
			mRedoBuffer = RGPP.System.Stack();
		}

		function invoke(command) {
			command.invoke();
			mRedoBuffer.clear();
			mUndoBuffer.push(command);
		}


		function undo() {
			scriptUtil.outputMsgToConsole("undo (in command Invoker)");
			if (mUndoBuffer.isEmpty()) {
				scriptUtil.outputErrMsgToConsole("undo buffer is empty");
				return;
			}
			var command = mUndoBuffer.pop();
			scriptUtil.outputMsgToConsole("undo command = " + command);
			command.undo();
			mRedoBuffer.push(command);
		}


		function redo() {
			scriptUtil.outputMsgToConsole("redo (in command Invoker)");
			if (mRedoBuffer.isEmpty()) {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputErrMsgToConsole("redo buffer is empty");
				return;
			}
			var command = mRedoBuffer.pop();
			scriptUtil.outputMsgToConsole("redo command = " + command);
			command.redo();
			mUndoBuffer.push(command);
		}

		initialize();
		return that;
	};
    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);