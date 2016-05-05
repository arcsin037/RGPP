(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "EventReceiver";

	var constructor = function() {
		var that = {};
		var mEventParameter = null;

		var mCopyEvent = null;

		that.eventDoubleClicked = eventDoubleClicked;
		that.deleteEvent = deleteEvent;
		that.deleteEventWithParam = deleteEventWithParam;
		that.recreateEvent = recreateEvent;
		that.operateEventParameter = operateEventParameter;
		that.copyEvent = copyEvent;
		that.cutEvent = cutEvent;
		that.pasteEvent = pasteEvent;

		var scriptUtil = RGPP.System.ScriptUtil.getInstance();

		function eventDoubleClicked() {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();

			var x = currentMapPanel.selectedX();
			var y = currentMapPanel.selectedY();
			var event = currentMapPanel.searchEventXY(x, y);

			if (event === null) {
				event = currentMapPanel.addEventXY(x, y);
				mEventParameter = RGPP.System.OperateEventParameter(event);
				if (event === null) {
					scriptUtil.outputErrMsgToConsole("Add event fail!");
					return;
				}
				scriptUtil.outputMsgToConsole("x = " + event.getInitX() + " y = " + event.getInitY());
			}
			else {
				scriptUtil.outputMsgToConsole("Event != null");
				scriptUtil.outputMsgToConsole("x = " + event.getInitX() + " y = " + event.getInitY());
			}

			currentMapPanel.eventDialogOpenXY(x, y);
		}

		function deleteEvent() {
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			var currentMapPanel = mapPanelList.currentMapPanel();
			var x = currentMapPanel.selectedX();
			var y = currentMapPanel.selectedY();

			var event = currentMapPanel.searchEventXY(x, y);
			if (event === null) {
				scriptUtil.outputErrMsgToConsole("[EventReceiver.js:deleteEvent] there is no event (" + x + ", " + y + ")");
				mEventParameter = null;
				return;
			}

			mEventParameter = RGPP.System.OperateEventParameter(event);

			var result = currentMapPanel.removeEventXY(x, y);
			scriptUtil.outputMsgToConsole("[EventReceiver.js:deleteEvent] delete event result :result = " + result);

			mapPanelList.updateAll();

			var eom = RGPP.System.EventObjManager.getInstance();
			eom.onLoad();

		}

		function deleteEventWithParam(param) {
			var x = param.getX();
			var y = param.getY();
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			var currentMapPanel = mapPanelList.currentMapPanel();

			var result = currentMapPanel.removeEventXY(x, y);
			scriptUtil.outputMsgToConsole("[EventReceiver.js:deleteEventWithParam] delete event result :result = " + result);
			mapPanelList.updateAll();
		}

		function recreateEvent(param) {

			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			var currentMapPanel = mapPanelList.currentMapPanel();
			var event = param.getEvent();

			if (event !== null) {
				currentMapPanel.addEvent(event);
				var x = event.getInitX();
				var y = event.getInitY();
				currentMapPanel.eventDialogOpenXY(x, y);
			}
			else {
				scriptUtil.outputErrMsgToConsole("param.getEvent() is null");
			}
			mapPanelList.updateAll();

			var eom = RGPP.System.EventObjManager.getInstance();
			eom.onLoad();

		}

		function operateEventParameter() {
			if (mEventParameter === null) {
				return null;
			}
			var ret = mEventParameter;
			mEventParameter = null;
			return ret;
		}

		function copyEvent() {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			var x = currentMapPanel.selectedX();
			var y = currentMapPanel.selectedY();
			var event = currentMapPanel.searchEventXY(x, y);
			if (event !== null) {
				mCopyEvent = event;
			}
		}

		function cutEvent() {
			copyEvent();
			deleteEvent();
		}

		function pasteEvent() {
			if (mCopyEvent === null) {
				scriptUtil.outputErrMsgToConsole("copy event is null");
				return;
			}
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			var currentMapPanel = mapPanelList.currentMapPanel();
			var minEventID = currentMapPanel.searchMinEventID();
			var copyEvent = mCopyEvent.copyObj(minEventID);

			var mapCategoryID = currentMapPanel.categoryID();
			var mapID = currentMapPanel.id();
			var x = currentMapPanel.selectedX();
			var y = currentMapPanel.selectedY();
			copyEvent.setInitialPos(mapCategoryID, mapID, x, y);
			scriptUtil.outputMsgToConsole("copyEvent = (mapID, x, y) : (" + copyEvent.getInitMapDataID() + ", " + copyEvent.getInitX() + ", " + copyEvent.getInitY() + ")");
			scriptUtil.outputMsgToConsole("mCopyEvent = (mapID, x, y) : (" + mCopyEvent.getInitMapDataID() + ", " + mCopyEvent.getInitX() + ", " + mCopyEvent.getInitY() + ")");
			copyEvent.resetParam();

			currentMapPanel.addEvent(copyEvent);
			mEventParameter = RGPP.System.OperateEventParameter(copyEvent);

			mapPanelList.updateAll();

			var eom = RGPP.System.EventObjManager.getInstance();
			eom.onLoad();

		}


		return that;
	};



    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);
