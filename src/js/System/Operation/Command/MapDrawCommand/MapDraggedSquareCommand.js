(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "MapDraggedSquareCommand";

	var constructor = function(receiver) {
		var that = {};
		var mReceiver = receiver;
		var mUndoParamBuffer = RGPP.System.Stack();
		var mRedoParamBuffer = RGPP.System.Stack();

		that.invoke = function() {
			mReceiver.draggedSquare();
			mRedoParamBuffer.clear();
		};

		that.undo = function() {
			if (mUndoParamBuffer.isEmpty()) {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputErrMsgToConsole("undo param stack is empty");
				return;
			}

		};

		that.redo = function() {
			if (mRedoParamBuffer.isEmpty()) {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputErrMsgToConsole("redo param stack is empty");
				return;
			}
		};

		return that;
	};
	
	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);