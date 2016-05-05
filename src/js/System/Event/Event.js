(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "Event";
	var constructor = function(spec) {
		var that = {};

		// private variable
		var mGameObjectIDArray = [];
		var mGameObjectArray = [];

		var mCurrentMapCategoryID = (spec.currentMapCategoryID !== undefined) ? spec.currentMapCategoryID : spec.eventBase.getInitMapCategoryID();
		var mCurrentMapDataID = (spec.currentMapDataID !== undefined) ? spec.currentMapDataID : spec.eventBase.getInitMapDataID();

		var mCurrentEventX = (spec.currentEventX !== undefined) ? spec.currentEventX : spec.eventBase.getInitX();
		var mCurrentEventY = (spec.currentEventY !== undefined) ? spec.currentEventY : spec.eventBase.getInitY();
		
		that.clearGameObj = clearGameObj;
		that.createGameObj = createGameObj;
		that.createImageObj = createImageObj;
		that.createSoundObj = createSoundObj;

		// Getter
		that.id = id;
		that.initMapCategoryID = initMapCategoryID;
		that.initMapDataID = initMapDataID;
		that.initX = initX;
		that.initY = initY;
		that.currentMapCategoryID = currentMapCategoryID;
		that.currentMapDataID = currentMapDataID;
		that.currentX = getX;
		that.currentY = getY;
		that.currentStateKey = currentStateKey;

		that.gameObjs = gameObjs;
		that.gameObjKeys = gameObjKeys;

		// Setter
		that.setPosition = setPosition;
		
		that.reaction = reaction;

		function reaction() {
			spec.eventBase.reaction(that);
		}


		function createGameObj(gameObjID, namespace, name) {
			if (mGameObjectArray[name] === undefined) {
				mGameObjectArray[name] = [];
			}
			
			if (mGameObjectIDArray[name] === undefined) {
				mGameObjectIDArray[name] = [];
			}

			var scriptName = correctScriptName(namespace, name);

			var executeProgramString = "return new " + scriptName + "();";

			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			scriptUtil.outputMsgToConsole(executeProgramString);

			var gameObj = (new Function(executeProgramString))();

			if (mGameObjectIDArray[name][gameObjID] === undefined) {
				mGameObjectArray[name].push(gameObj);
				var size = mGameObjectArray[name].length;
				mGameObjectIDArray[name][gameObjID] = size - 1;
			}
			else {
				var index = mGameObjectIDArray[name][gameObjID];
				mGameObjectArray[name][index] = gameObj;
			}
			return gameObj;
		}
		
		function createImageObj(gameObjID, arg) {
			var name = "ImageObj";
			if (mGameObjectArray[name] === undefined) {
				mGameObjectArray[name] = [];
			}
			
			if (mGameObjectIDArray[name] === undefined) {
				mGameObjectIDArray[name] = [];
			}

			var imageDataManager = RGPP.System.ImageDataManager.getInstance();

			var gameObj = imageDataManager.createObj(arg);
			if (mGameObjectIDArray[name][gameObjID] === undefined) {
				mGameObjectArray[name].push(gameObj);
				var size = mGameObjectArray[name].length;
				mGameObjectIDArray[name][gameObjID] = size - 1;
			}
			else {
				var index = mGameObjectIDArray[name][gameObjID];
				mGameObjectArray[name][index] = gameObj;
			}
			return gameObj;

		}
		
		function createSoundObj(gameObjID, arg) {
			
		}

		var correctScriptName = function(namespace, scriptName) {
			var retName = RGPP.GlobalNS + "." + namespace + "." + scriptName;
			return retName;
		};

		function currentStateKey() {
			return spec.eventBase.currentStateKey();
		}

		function setPosition(mapCategoryID, mapDataID, x, y) {
			RGPP.System.EventMoveInfoList.getInstance().setMoveInfo({
				eventBase: spec.eventBase,
				mapCategoryID: mapCategoryID,
				mapDataID: mapDataID,
				currentX: x,
				currentY: y,
			});

			mCurrentMapCategoryID = mapCategoryID;
			mCurrentMapDataID = mapDataID;
			mCurrentEventX = x;
			mCurrentEventY = y;
		}

		function getX() {
			return mCurrentEventX;
		}

		function getY() {
			return mCurrentEventY;
		}

		function id() {
			return spec.eventBase.id();
		}

		function initMapCategoryID() {
			return spec.eventBase.getInitMapCategoryID();
		}

		function initMapDataID() {
			return spec.eventBase.getInitMapDataID();
		}

		function currentMapCategoryID() {
			return mCurrentMapCategoryID;
		}

		function currentMapDataID() {
			return mCurrentMapDataID;
		}

		function initX() {
			return spec.eventBase.getInitX();
		}

		function initY() {
			return spec.eventBase.getInitY();
		}

		function clearGameObj() {
			mGameObjectIDArray = [];
			mGameObjectArray = [];
		}
		
		function gameObjs(name) {
			if (mGameObjectArray[name] === undefined) {
				return [];
			}
			return mGameObjectArray[name];
		}

		function gameObjKeys() {
			var keys = [];
			for (var key in mGameObjectArray) {
				keys.push(key);
			}
			return keys;
		}


		return that;
	};

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);