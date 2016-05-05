/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "EventMoveInfoList";

	/**
	 * Event Move Infomation List
	 * @class EventMoveInfoList
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = RGPP.System.List();

		that.setMoveInfo = setMoveInfo;

		var EventMoveInfo = function(spec) {
			var that = {};

			var mInitMapCategoryID = spec.eventBase.getInitMapCategoryID();
			var mInitMapDataID = spec.eventBase.getInitMapDataID();
			var mEventID = spec.eventBase.id();

			var mCurrentMapCategoryID = mInitMapCategoryID;
			var mCurrentMapDataID = mInitMapDataID;
			var mCurrentX = spec.eventBase.getInitX();
			var mCurrentY = spec.eventBase.getInitY();


			// Setter
			that.setCurrentPos = setCurrentPos;

			// Getter
			that.initMapCategoryID = getInitMapCategoryID;
			that.initMapDataID = getInitMapDataID;
			that.eventID = getEventID;

			that.currentMapCategoryID = getCurrentMapCategoryID;
			that.currentMapDataID = getCurrentMapDataID;
			that.getCurrentX = getCurrentX;
			that.getCurrentY = getCurrentY;
			that.isSameEventBase = isSameEventBase;

			function isSameEventBase(eventBase) {
				if (mInitMapCategoryID === eventBase.getInitMapCategoryID()) {
					if (mInitMapDataID === eventBase.getInitMapDataID()) {
						if (mEventID === eventBase.id()) {
							return true;
						}
					}
				}
				return false;
			}


			function setCurrentPos(arg) {
				mCurrentMapCategoryID = arg.mapCategoryID;
				mCurrentMapDataID = arg.mapDataID;
				mCurrentX = arg.currentX;
				mCurrentY = arg.currentY;
			}

			function getCurrentMapCategoryID() {
				return mCurrentMapCategoryID;
			}

			function getCurrentMapDataID() {
				return mCurrentMapDataID;
			}

			function getCurrentX() {
				return mCurrentX;
			}

			function getCurrentY() {
				return mCurrentY;
			}

			function getInitMapCategoryID() {
				return mInitMapCategoryID;
			}

			function getInitMapDataID() {
				return mInitMapDataID;
			}

			function getEventID() {
				return mEventID;
			}

			return that;

		};

		function setMoveInfo(arg) {
			var eventBase = arg.eventBase;

			var eventInfos = that.datas();
			for (var eventInfoIndex = 0; eventInfoIndex < eventInfos.length; ++eventInfoIndex) {
				var eventInfo = eventInfos[eventInfoIndex];
				if (eventInfo.isSameEventBase(eventBase)) {
					eventInfo.setCurrentPos(arg);
					return;
				}
			}

			var newEventInfo = EventMoveInfo({
				eventBase: eventBase
			});

			newEventInfo.setCurrentPos(arg);

			that.push(newEventInfo);
		}

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});


})((this || 0).self || global);