/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";

	var objName = "EventOperator";

	/**
	 * Event Operator
	 * @class EventOperator
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var that = {};

		// Reaction
		that.reactionInRange = reactionInRange;
		that.reactionByStateKey = reactionByStateKey;
		that.reactionByEventID = reactionByEventID;

		// Search
		that.searchEventObjsByStateKey = searchEventObjsByStateKey;

		// In Range
		that.inRangeEvents = inRangeEvents;
		that.isSpriteOnMouse = isSpriteOnMouse;

		function searchEventObjsByStateKey(stateKey) {
			var eom = RGPP.System.EventObjManager.getInstance();
			var resultEventObjs = [];
			var events = eom.getEvents();
			for (var eventIndex = 0; eventIndex < events.length; ++eventIndex) {
				if (events[eventIndex].currentStateKey() === stateKey) {
					resultEventObjs.push(events[eventIndex]);
				}
			}
			return resultEventObjs;
		}

		function reactionInRange(currentEvent, x, y, width, height) {
			var eom = RGPP.System.EventObjManager.getInstance();
			var events = eom.getEvents();
			for (var eventIndex = 0; eventIndex < events.length; ++eventIndex) {
				if (isSameEventObj(currentEvent, eventIndex)) {
					continue;
				}

				var event = events[eventIndex];
				var sprites = event.gameObjs("Sprite");
				if (sprites.length > 0) {
					var spr = sprites[RGPP.MW.RPG.CHARA_CHIP_OBJ_ID];
					var inRangeFlag = spr.inRange(x, y, width, height);
					if (inRangeFlag) {
						events[eventIndex].reaction();
					}
				}
			}
		}

		function reactionByStateKey(stateKey) {
			var eom = RGPP.System.EventObjManager.getInstance();
			var events = eom.getEvents();
			for (var eventIndex = 0; eventIndex < events.length; ++eventIndex) {
				var event = events[eventIndex];
				if (event.currentStateKey() === stateKey) {
					event.reaction();
				}
			}
		}

		function reactionByEventID(eventID) {
			var eom = RGPP.System.EventObjManager.getInstance();
			var events = eom.getEvents();

			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			var mapCategoryID = currentMapPanel.categoryID();
			var mapDataID = currentMapPanel.id();
			for (var eventIndex = 0; eventIndex < events.length; ++eventIndex) {
				var event = events[eventIndex];

				if (event.id() === eventID && event.initMapCategoryID() === mapCategoryID && event.initMapDataID() === mapDataID) {
					event.reaction();
				}
			}
		}

		/** 
		 * Return Range Events
		 * 
		 * @method inRangeEvents 
		 * @param currentEvent {Object} Event Object
		 * @param x {Number} Map Coordinate (Pixel)
		 * @param y {Number} Map Coordinate (Pixel)
		 * @param width {Number} Map Coordinate (Pixel)
		 * @param hegiht {Number} Map Coordinate (Pixel)
		 * @return {Object} event objects in range 
		 */
		function inRangeEvents(currentEvent, x, y, width, height) {
			var inRangeEvents = [];
			var eom = RGPP.System.EventObjManager.getInstance();
			var events = eom.getEvents();

			for (var eventIndex = 0; eventIndex < events.length; eventIndex += 1) {
				if (isSameEventObj(currentEvent, eventIndex)) {
					continue;
				}

				var event = events[eventIndex];
				var sprites = event.gameObjs("Sprite");
				if (sprites.length > 0) {
					var spr = sprites[RGPP.MW.RPG.CHARA_CHIP_OBJ_ID];
					var inRangeFlag = spr.inRange(x, y, width, height);
					if (inRangeFlag) {
						inRangeEvents.push(event);
					}
				}
			}
			return inRangeEvents;
		}

		function isSpriteOnMouse(sprite, width, height) {
			var spriteX = sprite.centerX() - width / 2;
			var spriteY = sprite.centerY() - height / 2;

			var cs = RGPP.System.CoordinateSystem.getInstance();
			var cm = RGPP.System.ControlManager.getInstance();

			var mouseMapX = cs.convertScreenToMapX(cm.getMouseX());
			var mouseMapY = cs.convertScreenToMapY(cm.getMouseY());

			if (spriteX < mouseMapX && mouseMapX < spriteX + width && spriteY < mouseMapY && mouseMapY < spriteY + height) {
				return true;
			}
			return false;
		}

		var isSameEventObj = function(currentEventObj, anotherEventIndex) {
			var eom = RGPP.System.EventObjManager.getInstance();
			var events = eom.getEvents();
			var anotherEvent = events[anotherEventIndex];
			if (currentEventObj === anotherEvent) {
				return true;
			}
			return false;
		};

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
