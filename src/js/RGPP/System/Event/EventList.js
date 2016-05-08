/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "EventList";
	/**
	 * Event List
	 * 
	 * @class EventList
	 * @author arcsin
	 * @constructor
	 * @param spec
	 * @param spec.col
	 * @param spec.row
	 */
	var constructor = function(spec) {
		var that = {};
		var mCol = spec.col;
		var mRow = spec.row;
		var mEventList = RGPP.System.List();

		var NOTHING = -1;

		// Interface
		that.NOTHING = NOTHING;
		that.eventDialogOpenXY = eventDialogOpenXY;
		that.addEvent = addEvent;
		that.addEventXY = addEventXY;
		that.removeEvent = removeEvent;
		that.removeEventXY = removeEventXY;
		that.searchEventXY = searchEventXY;
		that.searchEventArrayListIndex = searchEventArrayListIndex;
		that.searchMinEventID = searchMinEventID;
		that.getEvents = getEvents;
		that.resetParam = resetParam;
		that.finalize = finalize;
		that.createListUL = createListUL;
		that.size = getSize;

		function eventDialogOpenXY(categoryID, mapID, x, y) {
			var eventArrayIndex = searchEventArrayListIndex(x, y);

			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			scriptUtil.outputMsgToConsole("Event array index = " + eventArrayIndex);

			if (eventArrayIndex === NOTHING) {
				alert("[EventList.js:Event Dialog OpenXY] no event!");
				return;
			}
			var event = mEventList.data(eventArrayIndex);

			RGPP.System.EventDialogList.getInstance().eventDialogOpen(categoryID, mapID, event);
		}

		function addEvent(event) {
			var x = event.getInitX();
			var y = event.getInitY();
			if (x >= 0 && x < mCol && y >= 0 && y < mRow) {
				mEventList.push(event);
				return event;
			}
			return null;
		}

		function addEventXY(categoryID, mapID, x, y) {
			if (x >= 0 && x < mCol && y >= 0 && y < mRow) {
				var eventID = searchMinEventID();
				var event = RGPP.System.EventBase({
					id: eventID,
					categoryID: categoryID,
					mapID: mapID,
					x: x,
					y: y,
					name: "Event " + eventID
				});
				mEventList.push(event);
				return event;
			}
			return null;
		}

		function removeEvent(categoryID, mapID, eventArrayIndex) {
			var event = mEventList.data(eventArrayIndex);

			RGPP.System.EventDialogList.getInstance().removeDialog(categoryID, mapID, event);
			// RGPP.System.ImageDataManager.getInstance().removeByEvent(event);
			var result = mEventList.remove(eventArrayIndex);
			return result;
		}

		function removeEventXY(categoryID, mapID, x, y) {
			if (x >= 0 && x < mCol && y >= 0 && y < mRow) {
				var eventArrayIndex = searchEventArrayListIndex(x, y);
				if (eventArrayIndex !== NOTHING) {
					return removeEvent(categoryID, mapID, eventArrayIndex);
				}
			}
			return false;
		}

		function searchEventXY(x, y) {
			if (x >= 0 && x < mCol && y >= 0 && y < mRow) {
				var index = searchEventArrayListIndex(x, y);
				if (index != NOTHING) {
					return mEventList.data(index);
				}
			}
			return null;
		}

		function searchEventArrayListIndex(x, y) {
			if (x >= 0 && x < mCol && y >= 0 && y < mRow) {
				var events = mEventList.datas();
				for (var i = 0; i < mEventList.size(); ++i) {
					if (x === events[i].getInitX() && y === events[i].getInitY()) {
						return i;
					}
				}
			}
			return NOTHING;
		}

		function searchMinEventID() {
			if (mEventList.isEmpty()) {
				return 0;
			}
			var j = 0;
			var events = mEventList.datas();
			while (true) {
				var existFlag = false;
				for (var i = 0; i < mEventList.size(); ++i) {
					if (events[i].id() === j) {
						existFlag = true;
						break;
					}
				}
				if (!existFlag) {
					return j;
				}
				++j;
			}
		}

		function getEvents() {
			return mEventList.datas();
		}

		function resetParam() {
			for (var i = 0; i < mEventList.size(); ++i) {
				mEventList.data(i).resetParam();
			}
		}

		function finalize() {
			mEventList.clear();
			RGPP.System.EventDialogList.getInstance().finalize();
		}

		function createListUL(categoryID, mapID) {
			var eventSize = getSize();
			var eventNames = [eventSize];
			var events = getEvents();
			for (var eventIndex = 0; eventIndex < eventSize; ++eventIndex) {
				eventNames[eventIndex] = events[eventIndex].getName();
			}

			var ulElement = $("<ul id = 'items_EventList' class = 'items'>");
			for (var i = 0; i < eventSize; ++i) {
				// item
				var eventID = events[i].id();
				var listItem = $("<li>");
				var anchor = $("<a href = '#EventList'>");
				anchor.attr("rel", "EventList_tab_" + i);
				anchor.attr("eventArrayIndex", i);
				anchor.html(eventID + " : " + eventNames[i]);

				$(anchor).click(function() {
					var eventArrayIndex = $(this).attr("eventArrayIndex");
					var events = getEvents();
					RGPP.System.EventDialogList.getInstance().eventDialogOpen(categoryID, mapID, events[eventArrayIndex]);
				});
				$(listItem).append(anchor);
				$(ulElement).append(listItem);
			}
			return ulElement;
		}

		function getSize() {
			return mEventList.size();
		}

		return that;

	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);