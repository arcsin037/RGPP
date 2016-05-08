/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "EventObjManager";

	/**
	 * Event Object Manager
	 * @class EventObjManager
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		// Create
		that.createEventObj = createEventObj;

		// Load
		that.loadInitEventObj = loadInitEventObj;
		that.loadCurrentEventObj = loadCurrentEventObj;

		// Load process
		that.onLoad = onLoad;

		// Update
		that.updateEventObj = updateEventObj;
		that.updateEventObjDebug = updateEventObjDebug;
		that.updateGameObj = updateGameObj;

		// Draw
		that.drawEventObj = drawEventObj;
		that.drawEventObjDebug = drawEventObjDebug;

		// Sort
		that.sortGameObj = sortGameObj;
		// Organize
		that.organizeEventObj = organizeEventObj;

		// Get
		that.getEvents = getEvents;

		// Clear
		that.clear = clear;

		// Operate Event
		that.removeEventObjXY = removeEventObjXY;

		// Game obj
		that.gameObjs = getGameObjects;

		// Save
		that.saveChangeableValues = saveChangeableValues;
		that.saveChangeableValuesPerScript = saveChangeableValuesPerScript;

		// Load
		that.loadChangeableValuesPerScript = loadChangeableValuesPerScript;

		// Private variable
		var NOTHING = -1;
		var mEventObjs = RGPP.System.List();
		var mGameObjects = [];
		var mValidEventObj = [];

		// Create Event Instance
		function createEventObj(arg) {
			var eventObj = RGPP.System.EventObj(arg);
			mEventObjs.push(eventObj);
		}

		function loadInitEventObj() {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			var eventArray = currentMapPanel.getEvents();
			for (var eventIndex = 0; eventIndex < eventArray.length; ++eventIndex) {
				var eventBase = eventArray[eventIndex];
				createEventObj({
					eventBase: eventBase
				});
			}
		}

		function loadCurrentEventObj() {
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			var currentMapPanel = mapPanelList.currentMapPanel();
			var currentMapCategoryID = currentMapPanel.categoryID();
			var currentMapDataID = currentMapPanel.id();

			var eventBaseArray = currentMapPanel.getEvents();
			var eventMoveInfos = RGPP.System.EventMoveInfoList.getInstance().datas();

			var existsAnotherMapIndecies = [];
			var eventMoveInfo;
			var eventBase;

			for (var moveInfoIndex = 0; moveInfoIndex < eventMoveInfos.length; moveInfoIndex += 1) {
				eventMoveInfo = eventMoveInfos[moveInfoIndex];
				if (currentMapCategoryID === eventMoveInfo.currentMapCategoryID() &&
					currentMapDataID === eventMoveInfo.currentMapDataID()) {
					// Exists in current map
					var initMapCategoryID = eventMoveInfo.initMapCategoryID();
					var initMapDataID = eventMoveInfo.initMapDataID();

					if (currentMapCategoryID !== initMapCategoryID ||
						currentMapDataID !== initMapDataID) {
						// Initial Map is not Current Map
						var mapIndex = mapPanelList.searchMapIndexFromID(initMapCategoryID, initMapDataID);
						var mapPanel = mapPanelList.panel(mapIndex);
						var eventBases = mapPanel.getEvents();

						for (var eventBaseIndex = 0; eventBaseIndex < eventBases.length; eventBaseIndex += 1) {
							if (eventMoveInfo.eventID() === eventBases[eventBaseIndex].id()) {
								createEventObj({
									eventBase: eventBases[eventBaseIndex],
									currentMapCategoryID: eventMoveInfo.currentMapCategoryID(),
									currentMapDataID: eventMoveInfo.currentMapDataID(),
									currentEventX: eventMoveInfo.getCurrentX(),
									currentEventY: eventMoveInfo.getCurrentY(),
								});
							}
						}

					}
				}
				else {
					// Exists in another map
					existsAnotherMapIndecies.push(moveInfoIndex);
				}
			}

			for (var eventBaseIndex = 0; eventBaseIndex < eventBaseArray.length; eventBaseIndex += 1) {
				eventBase = eventBaseArray[eventBaseIndex];
				var existAnotherMap = false;
				for (var existAnotherMapIndex = 0; existAnotherMapIndex < existsAnotherMapIndecies.length; ++existAnotherMapIndex) {
					var eventInfoIndex = existsAnotherMapIndecies[existAnotherMapIndex];
					eventMoveInfo = eventMoveInfos[eventInfoIndex];
					if (eventMoveInfo.isSameEventBase(eventBase)) {
						// Save Event with existing current map event
						existAnotherMap = true;
						break;
					}
				}
				if (!existAnotherMap) {
					createEventObj({
						eventBase: eventBase
					});
				}
			}
		}

		function onLoad() {
			for (var i = 0; i < mEventObjs.size(); i += 1) {
				mEventObjs.data(i).onLoadGame();
				mEventObjs.data(i).onLoadMap();
			}
		}

		function updateEventObj() {
			var validEventObj = mValidEventObj;
			for (var i = 0; i < validEventObj.length; ++i) {
				//update default instance
				validEventObj[i].update();
			}
		}


		function updateEventObjDebug() {
			var validEventObj = mValidEventObj;
			for (var i = 0; i < validEventObj.length; ++i) {
				//update instance(debug)
				validEventObj[i].debugUpdate();
			}
		}

		function updateGameObj() {
			// Collection
			mGameObjects = [];
			var validEventObj = mValidEventObj;
			for (var eventObjIndex = 0; eventObjIndex < validEventObj.length; eventObjIndex += 1) {
				var event = validEventObj[eventObjIndex].event();
				var gameObjKeys = event.gameObjKeys();
				for (var keyIndex = 0; keyIndex < gameObjKeys.length; keyIndex += 1) {
					var keyName = gameObjKeys[keyIndex];
					if (mGameObjects[keyName] === undefined) {
						mGameObjects[keyName] = [];
					}
					var gameObjs = event.gameObjs(keyName);
					for (var gameObjIndex = 0; gameObjIndex < gameObjs.length; gameObjIndex += 1) {
						mGameObjects[keyName].push(gameObjs[gameObjIndex]);
					}
				}
			}

			for (var key in mGameObjects) {
				var size = mGameObjects[key].length;
				for (var i = 0; i < size; ++i) {
					// default update
					mGameObjects[key][i].update();
				}
			}
		}

		function sortGameObj() {
			for (var key in mGameObjects) {
				var sortFunc = function(a, b) {
					return mGameObjects[key][0].sortFunction(a, b);
				};
				mGameObjects[key].sort(sortFunc);
			}
		}

		function drawEventObj(ctx) {
			for (var key in mGameObjects) {
				for (var i = 0; i < mGameObjects[key].length; i += 1) {
					mGameObjects[key][i].draw(ctx);
				}
			}
			var validEventObj = mValidEventObj;
			for (var i = 0; i < validEventObj.length; ++i) {
				//update default instance
				validEventObj[i].draw(ctx);
			}
		}

		function drawEventObjDebug(ctx) {
			for (var key in mGameObjects) {
				for (var i = 0; i < mGameObjects[key].length; i += 1) {
					mGameObjects[key][i].debugDraw(ctx);
				}
			}
			var validEventObj = mValidEventObj;
			for (var i = 0; i < validEventObj.length; ++i) {
				//update default instance
				validEventObj[i].debugDraw(ctx);
			}
		}

		function organizeEventObj() {
			mValidEventObj = [];
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			// var idm = RGPP.System.ImageDataManager.getInstance();
			var currentMapPanel = mapPanelList.currentMapPanel();
			if (currentMapPanel !== null) {
				var removeCount = 0;
				var eventObjs = mEventObjs.datas();
				var events = getEvents();
				var eventSize = events.length;

				for (var i = 0; i < eventSize; ++i) {
					var index = i - removeCount;
					var event = events[i];
					if (currentMapPanel.categoryID() === event.currentMapCategoryID() &&
						currentMapPanel.id() === event.currentMapDataID()) {
						mValidEventObj.push(eventObjs[i]);
					}
					else {
						// idm.removeByEvent(event);
						mEventObjs.remove(index);
						var scriptUtil = RGPP.System.ScriptUtil.getInstance();
						scriptUtil.outputMsgToConsole("remove : " + index);
						++removeCount;
					}
				}
			}
		}


		function removeEventObjXY(mapCategoryID, mapID, x, y) {
			var instanceIndex = searchEventObjIndexByXY(mapCategoryID, mapID, x, y);
			if (instanceIndex !== NOTHING) {
				mEventObjs.remove(instanceIndex);
			}
		}

		var searchEventObjIndexByXY = function(mapCategoryID, mapDataID, x, y) {
			var events = getEvents();
			for (var i = 0; i < events.length; ++i) {
				if (x === events[i].initX() &&
					y === events[i].initY() &&
					events[i].initMapCategoryID() === mapCategoryID &&
					events[i].initMapDataID() === mapDataID) {
					return i;
				}
			}
			return NOTHING;
		};

		function getEvents() {
			var events = [];
			var eventObjs = mEventObjs.datas();
			for (var i = 0; i < eventObjs.length; ++i) {
				events[i] = eventObjs[i].event();
			}
			return events;
		}

		function getGameObjects(name) {
			if (mGameObjects[name] === undefined) {
				return [];
			}
			return mGameObjects[name];
		}


		function clear() {
			mEventObjs.clear();
		}

		// save changeable valer per event
		var saveChangeableValuesPerEvent = function() {
			var eventObjs = mEventObjs.datas();
			var eventObjNum = eventObjs.length;
			for (var spriteIndex = 0; spriteIndex < eventObjNum; ++spriteIndex) {
				eventObjs[spriteIndex].saveChangeableValuesPerEvent();
			}
		};

		// save changeable value per script
		function saveChangeableValuesPerScript() {
			var eventObjs = mEventObjs.datas();
			var eventObjNum = eventObjs.length;
			for (var spriteIndex = 0; spriteIndex < eventObjNum; ++spriteIndex) {
				eventObjs[spriteIndex].saveChangeableValuesPerScript();
			}
		}

		function saveChangeableValues() {
			saveChangeableValuesPerEvent();
			saveChangeableValuesPerScript();
		}


		function loadChangeableValuesPerScript() {
			// Changeable value per Script
			var eventObjs = mEventObjs.datas();

			var changeableValues = [];

			var eventObjNum = eventObjs.length;
			// load changeable value per script from event sprite
			for (var spriteIndex = 0; spriteIndex < eventObjNum; spriteIndex += 1) {
				eventObjs[spriteIndex].loadChangeableValuesPerScript(changeableValues);
			}

			return changeableValues;
		}

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});


})((this || 0).self || global);