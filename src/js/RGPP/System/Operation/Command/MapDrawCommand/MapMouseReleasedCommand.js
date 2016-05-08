(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "MapMouseReleasedCommand";

	var constructor = function(receiver) {
		var that = {};
		var mReceiver = receiver;
		var mUndoParamStack = RGPP.System.Stack();
		var mRedoParamStack = RGPP.System.Stack();

		that.invoke = function() {
			mRedoParamStack.clear();
			var paramList = mReceiver.mapDrawParameterList();
			if (!paramList.isEmpty()) {
				mUndoParamStack.push(paramList);
			}
			else {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputErrMsgToConsole("paramlist is empty");

			}
		};

		that.undo = function() {
			if (mUndoParamStack.isEmpty()) {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputErrMsgToConsole("undo param stack is empty");

				return;
			}
			var paramList = mUndoParamStack.pop();
			mReceiver.undo(paramList);
			paramList = mReceiver.mapDrawParameterList();
			mRedoParamStack.push(paramList);

		};

		that.redo = function() {
			if (mRedoParamStack.isEmpty()) {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputErrMsgToConsole("redo param stack is empty");

				return;
			}
			var paramList = mRedoParamStack.pop();
			mReceiver.redo(paramList);
			paramList = mReceiver.mapDrawParameterList();
			mUndoParamStack.push(paramList);

		};

		return that;
	};

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);