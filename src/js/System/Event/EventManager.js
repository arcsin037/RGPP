/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "EventManager";

	/**
	 * Event Manager
	 * @class EventManager
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};
		var mEventLayerCommandInvoker = null;

		var mEventReceiver = null;
		var mSelectEventCommand = null;
		var mCopyEventCommand = null;
		var mOperateEventCommand = null;
		var mDeleteEventCommand = null;
		var mCutEventCommand = null;
		var mPasteEventCommand = null;


		that.undoEvent = undoEvent;
		that.redoEvent = redoEvent;
		that.operateEvent = operateEvent;
		that.deleteEvent = deleteEvent;
		that.cutEvent = cutEvent;
		that.copyEvent = copyEvent;
		that.pasteEvent = pasteEvent;

		function initialize() {
			// Registration Command
			mEventLayerCommandInvoker = RGPP.System.CommandInvoker();
			mEventReceiver = RGPP.System.EventReceiver();
			mOperateEventCommand = RGPP.System.OperateEvent(mEventReceiver);
			mDeleteEventCommand = RGPP.System.DeleteEvent(mEventReceiver);
			mSelectEventCommand = RGPP.System.SelectEvent(mEventReceiver);
			mCutEventCommand = RGPP.System.CutEvent(mEventReceiver);
			mPasteEventCommand = RGPP.System.PasteEvent(mEventReceiver);
			mCopyEventCommand = RGPP.System.CopyEvent(mEventReceiver);
		}


		function undoEvent() {
			mEventLayerCommandInvoker.undo();
		}


		function redoEvent() {
			mEventLayerCommandInvoker.redo();
		}


		function operateEvent() {
			mEventLayerCommandInvoker.invoke(mOperateEventCommand);
		}


		function deleteEvent() {
			mEventLayerCommandInvoker.invoke(mDeleteEventCommand);
		}


		function cutEvent() {
			mEventLayerCommandInvoker.invoke(mCutEventCommand);
		}


		function copyEvent() {
			RGPP.System.CommandSimpleInvoker.getInstance().invoke(mCopyEventCommand);
		}


		function pasteEvent() {
			mEventLayerCommandInvoker.invoke(mPasteEventCommand);
		}

		initialize();

		return that;
	};
	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
