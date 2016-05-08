(function(global) {
	"use strict";
	/* global RGPP */
	var objName = "MapDrawSquareCommand";

	var constructor = function(receiver) {
		var that = {};
		var mReceiver = receiver;
		var mUndoParamBuffer = RGPP.System.Stack();
		var mRedoParamBuffer = RGPP.System.Stack();

		that.invoke = function() {
			mReceiver.drawSquare();
			mRedoParamBuffer.clear();
			var paramList = mReceiver.mapDrawParameterList();
			if (!paramList.isEmpty()) {
				mUndoParamBuffer.push(paramList);
			}

		};

		that.undo = function() {
			if (mUndoParamBuffer.isEmpty()) {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputErrMsgToConsole("undo param stack is empty");
				return;
			}
			var paramList = mUndoParamBuffer.pop();
			mReceiver.undo(paramList);
			paramList = mReceiver.mapDrawParameterList();
			mRedoParamBuffer.push(paramList);

		};

		that.redo = function() {
			if (mRedoParamBuffer.isEmpty()) {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputErrMsgToConsole("redo param stack is empty");
				return;
			}
			var paramList = mRedoParamBuffer.pop();
			mReceiver.redo(paramList);
			paramList = mReceiver.mapDrawParameterList();
			mUndoParamBuffer.push(paramList);

		};

		return that;
	};
	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);