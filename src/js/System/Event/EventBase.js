/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "EventBase";

	/**
	 *  Event
	 * @class EventBase
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var that = {};

		// Interface
		that.onLoadGame = onLoadGame;
		that.onLoadMap = onLoadMap;

		that.update = update;
		that.debugUpdate = debugUpdate;

		that.draw = draw;
		that.debugDraw = debugDraw;

		that.reaction = reaction;

		// Update
		that.updateStateWithArray = updateStateWithArray;
		that.updateStateWithInputField = updateStateWithInputField;
		that.updateCurrentStateScript = updateCurrentStateScript;

		// Operate state
		that.addCurrentStateScript = addCurrentStateScript;
		that.removeCurrentStateScript = removeCurrentStateScript;
		that.searchMinEventStateID = searchMinEventStateID;

		// Copy
		that.copyObj = copyObj;

		// Getter
		that.id = getID;
		that.getName = getName;

		that.getInitMapCategoryID = getInitMapCategoryID;
		that.getInitMapDataID = getInitMapDataID;
		that.getInitX = getInitX;
		that.getInitY = getInitY;

		that.scriptIDSet = getScriptIDSet;
		that.scriptName = getScriptName;
		that.scriptNum = getScriptNum;
		that.stateSize = getStateSize;
		that.currentStateIndex = currentStateIndex;
		that.currentStateKey = currentStateKey;
		that.currentScriptNum = currentScriptNum;
		that.currentScriptID = currentScriptID;
		that.currentScriptName = currentScriptName;
		that.stateName = stateName;
		that.stateID = stateID;
		that.stateTransitionFlag = stateTransitionFlag;
		that.currentScriptIndex = currentScriptIndex;
		that.currentScriptCategoryIndex = currentScriptCategoryIndex;
		that.resetStateTransitionFlag = resetStateTransitionFlag;
		that.changeableValueNum = getChangeableValueNum;
		that.changeableInitValue = getChangeableInitValue;

		// Setter
		that.setID = setID;
		that.setInitialPos = setInitialPos;
		that.setName = setName;
		that.setCurrentStateByKey = setCurrentStateByKey;
		that.setCurrentStateIndex = setCurrentStateIndex;
		that.resetParam = resetParam;

		// Changeable values operator
		that.loadChangeableValuesPerEvent = loadChangeableValuesPerEvent;
		that.loadChangeableValuesPerScript = loadChangeableValuesPerScript;
		that.saveInitValuesFromChangeableValue = saveInitValuesFromChangeableValue;
		that.saveInitValuesFromChangeableValuePerScript = saveInitValuesFromChangeableValuePerScript;

		var scriptUtil = RGPP.System.ScriptUtil.getInstance();

		var mID = spec.id;
		// Default
		var mInitMapCategoryID = spec.categoryID;
		var mInitMapDataID = spec.mapID;
		// Grid
		var mInitX = spec.x;
		var mInitY = spec.y;
		var mName = spec.name;

		var mEventStates = {};

		var mCurrentStateIndex = 0;
		var mStateKeys = [];
		mStateKeys[0] = 'normal';

		var mLoaded = false;
		var mStateTransitionFlag = true;

		var SCRIPT_CATEGORY_ID_INDEX = 0;
		var SCRIPT_DATA_ID_INDEX = 1;

		function initialize() {
			setInitialPos(spec.categoryID, spec.mapID, spec.x, spec.y);

			var currentKey = currentStateKey();
			mEventStates[currentKey] = RGPP.System.EventState({
				id: mCurrentStateIndex,
				name: currentKey
			});
		}

		function onLoadGame(event) {
			mStateTransitionFlag = true;
			if (!mLoaded) {
				for (var key in mEventStates) {
					mEventStates[key].onLoadGame(event);
				}
				mLoaded = true;
			}
		}

		function onLoadMap(event) {
			mStateTransitionFlag = true;
			for (var key in mEventStates) {
				mEventStates[key].onLoadMap(event);
			}
		}

		function loadChangeableValuesPerEvent() {
			var currentKey = currentStateKey();
			var retValues = mEventStates[currentKey].loadChangeableValuesPerEvent();
			return retValues;
		}

		function loadChangeableValuesPerScript(changeableValues) {
			var currentKey = currentStateKey();
			mEventStates[currentKey].loadChangeableValuesPerScript(changeableValues);
		}

		function reaction(event) {
			var currentKey = currentStateKey();
			if (mEventStates[currentKey] !== undefined) {
				mEventStates[currentKey].reaction(event);
			}
			else {
				scriptUtil.outputErrMsgToConsole("[Event.js:reaction] not defined status " + currentKey);
			}
		}

		function update(event) {
			var currentKey = currentStateKey();
			if (mEventStates[currentKey] === undefined) {
				scriptUtil.outputErrMsgToConsole("[Event.js:update] not defined status " + currentKey);
				return;
			}
			if (mStateTransitionFlag) {
				mEventStates[currentKey].onStateTransition(event);
				mStateTransitionFlag = false;
			}
			mEventStates[currentKey].update(event);
		}

		function debugUpdate(event) {
			var currentKey = currentStateKey();
			if (mEventStates[currentKey] === undefined) {
				scriptUtil.outputErrMsgToConsole("[Event.js:debugUpdate] not defined status " + currentKey);
				return;
			}
			mEventStates[currentKey].debugUpdate(event);
		}


		function draw(ctx) {
			var currentKey = currentStateKey();
			if (mEventStates[currentKey] === undefined) {
				scriptUtil.outputErrMsgToConsole("[Event.js:draw] not defined status " + currentKey);
				return;
			}
			mEventStates[currentKey].draw(ctx);
		}

		function debugDraw(ctx) {
			var currentKey = currentStateKey();
			if (mEventStates[currentKey] === undefined) {
				scriptUtil.outputErrMsgToConsole("[Event.js:debugDraw] not defined status " + currentKey);
				return;
			}
			mEventStates[currentKey].debugDraw(ctx);
		}

		function updateStateWithArray(stateArray, scriptArray, changeableValueArray) {
			deleteAllState();
			var stateNum = stateArray.length;
			for (var stateIndex = 0; stateIndex < stateNum; ++stateIndex) {
				var id = stateIndex;
				var key = stateArray[stateIndex];
				mStateKeys[id] = key;
				mEventStates[key] = RGPP.System.EventState({
					id: id,
					name: key
				});
				var scriptNum = scriptArray[stateIndex].length;
				for (var scriptIndex = 0; scriptIndex < scriptNum; ++scriptIndex) {
					mEventStates[key].setScriptID(
						scriptIndex,
						scriptArray[stateIndex][scriptIndex][SCRIPT_CATEGORY_ID_INDEX],
						scriptArray[stateIndex][scriptIndex][SCRIPT_DATA_ID_INDEX]);

					var changeableValueNum = changeableValueArray[stateIndex][scriptIndex].length;
					for (var cIndex = 0; cIndex < changeableValueNum; cIndex += 1) {
						var value = changeableValueArray[stateIndex][scriptIndex][cIndex];
						mEventStates[key].setChangeableInitValue(scriptIndex, cIndex, value);
					}
					mEventStates[key].setInitValuesToChangeableValue();
				}
			}
		}

		function updateStateWithInputField(stateNum, inputNameField) {
			scriptUtil.outputMsgToConsole("[Event.js:updateStateWithInputField] stateNum = " + stateNum);
			deleteAllState();

			for (var eventStateIndex = 0; eventStateIndex < stateNum; ++eventStateIndex) {
				var id = eventStateIndex;
				var key = $(inputNameField[eventStateIndex]).val();
				mStateKeys[id] = key;
				scriptUtil.outputMsgToConsole("[Event.js:updateStateWithInputField] key = " + key);
				if (mEventStates[key] === undefined) {
					mEventStates[key] = RGPP.System.EventState({
						id: id,
						name: key
					});
				}
				else {
					mEventStates[key].setID(id);
					mEventStates[key].setName(key);
				}
			}

			// Delete another key
			for (var key in mEventStates) {
				var breakFlag = false;
				for (var i = 0; i < mStateKeys.length; ++i) {
					if (key === mStateKeys[i]) {
						breakFlag = true;
						break;
					}
				}
				if (!breakFlag) {
					scriptUtil.outputMsgToConsole("delete key : " + key);
					delete mEventStates[key];
				}
			}


			mStateKeys.length = stateNum;
		}

		function updateCurrentStateScript(comboBox) {
			var currentKey = currentStateKey();
			scriptUtil.outputMsgToConsole("current state key = " + currentKey);
			var scriptNum = mEventStates[currentKey].scriptNum();
			for (var scriptIndex = 0; scriptIndex < scriptNum; ++scriptIndex) {
				var selectedIndex = comboBox[scriptIndex].selectedIndex();
				scriptUtil.outputMsgToConsole("scriptIndex = " + scriptIndex + " selectedIndex : " + selectedIndex);
				var scriptDB = RGPP.System.ScriptDataBase.getInstance();
				mEventStates[currentKey].setScriptID(
					scriptIndex,
					scriptDB.searchCategoryIDFromIndex(selectedIndex),
					scriptDB.searchDataIDFromIndex(selectedIndex));
			}
			mStateTransitionFlag = true;
		}

		function addCurrentStateScript() {
			var currentKey = currentStateKey();
			mEventStates[currentKey].addScript();
		}

		function removeCurrentStateScript() {
			var currentKey = currentStateKey();
			mEventStates[currentKey].removeScript();
		}

		function searchMinEventStateID() {
			if (getStateSize() === 0) {
				return 0;
			}
			var j = 0;
			while (true) {
				var existFlag = false;
				for (var i = 0; i < getStateSize(); ++i) {
					if (mEventStates[i].id() === j) {
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

		function getID() {
			return mID;
		}

		function getInitMapCategoryID() {
			return mInitMapCategoryID;
		}

		function getInitMapDataID() {
			return mInitMapDataID;
		}

		function getInitX() {
			return mInitX;
		}

		function getInitY() {
			return mInitY;
		}

		function getName() {
			return mName;
		}

		/*
		function imageName() {
			return mImageName;
		}
		*/

		function setID(id) {
			mID = id;
		}

		function setInitialPos(mapCategoryID, mapID, x, y) {
			mInitMapCategoryID = mapCategoryID;
			mInitMapDataID = mapID;
			mInitX = x;
			mInitY = y;
		}

		function resetParam() {
			mLoaded = false;
			mCurrentStateIndex = 0;
			mStateTransitionFlag = true;
			scriptUtil.outputMsgToConsole("resetParam!");
		}

		function setName(name) {
			mName = name;
		}

		function stateID(index) {
			var key = mStateKeys[index];
			scriptUtil.outputMsgToConsole("[Event.js:stateID()] key = " + key);
			return mEventStates[key].id();
		}

		function stateName(index) {
			var key = mStateKeys[index];
			scriptUtil.outputMsgToConsole("[Event.js:stateName()] key = " + key);
			return mEventStates[key].name();
		}

		function getStateSize() {
			return Object.keys(mEventStates).length;
		}

		function setCurrentStateIndex(stateIndex) {
			if (mCurrentStateIndex !== stateIndex) {
				mStateTransitionFlag = true;
				mCurrentStateIndex = stateIndex;
				scriptUtil.outputMsgToConsole("mCurrentStateIndex = " + mCurrentStateIndex);
			}
		}

		function setCurrentStateByKey(key) {
			var currentKey = currentStateKey();
			if (currentKey !== key) {
				var breakFlag = false;
				for (var index = 0; index < mStateKeys.length; ++index) {
					if (mStateKeys[index] === key) {

						mCurrentStateIndex = index;
						scriptUtil.outputMsgToConsole("mCurrentStateIndex = " + mCurrentStateIndex);
						mStateKeys[mCurrentStateIndex] = key;
						scriptUtil.outputMsgToConsole("set current state : index : " + index + " key : " + key);
						breakFlag = true;
						break;
					}
				}
				if (breakFlag) {
					mStateTransitionFlag = true;
				}
				else {
					scriptUtil.outputErrMsgToConsole("No state : " + key);
				}
			}
		}

		function getScriptNum(stateIndex) {
			var key = mStateKeys[stateIndex];
			return mEventStates[key].scriptNum();
		}

		function getScriptDataID(stateIndex, scriptIndex) {
			var key = mStateKeys[stateIndex];
			return mEventStates[key].scriptID(scriptIndex);
		}

		function getScriptCategoryID(stateIndex, scriptIndex) {
			var key = mStateKeys[stateIndex];
			return mEventStates[key].scriptCategoryID(scriptIndex);
		}

		function getScriptIDSet(stateIndex, scriptIndex) {
			var idSet = [2];
			var key = mStateKeys[stateIndex];

			idSet[SCRIPT_CATEGORY_ID_INDEX] = mEventStates[key].scriptCategoryID(scriptIndex);
			idSet[SCRIPT_DATA_ID_INDEX] = mEventStates[key].scriptID(scriptIndex);
			return idSet;
		}

		function getChangeableValueNum(stateIndex, scriptIndex) {
			var key = mStateKeys[stateIndex];
			return mEventStates[key].changeableValueNum(scriptIndex);
		}

		function getChangeableInitValue(stateIndex, scriptIndex, cIndex) {
			var key = mStateKeys[stateIndex];
			return mEventStates[key].changeableInitValue(scriptIndex, cIndex);
		}

		function getScriptName(currentKey, scriptIndex) {
			return mEventStates[currentKey].scriptName(scriptIndex);
		}

		function currentStateIndex() {
			scriptUtil.outputMsgToConsole("mCurrentStateIndex = " + mCurrentStateIndex);
			return mCurrentStateIndex;
		}

		function currentStateKey() {
			var currentKey = mStateKeys[mCurrentStateIndex];
			if (currentKey === undefined) {
				mCurrentStateIndex = 0;
				currentKey = mStateKeys[mCurrentStateIndex];
			}
			return currentKey;
		}

		function currentScriptNum() {
			var currentKey = currentStateKey();
			return mEventStates[currentKey].scriptNum();
		}

		function currentScriptID(index) {
			var currentKey = currentStateKey();

			return mEventStates[currentKey].scriptID(index);
		}

		function currentScriptName(index) {
			var currentKey = currentStateKey();
			return mEventStates[currentKey].scriptName(index);
		}

		function currentScriptCategoryIndex(index) {
			var currentKey = currentStateKey();
			return mEventStates[currentKey].categoryIndex(index);
		}

		function currentScriptIndex(index) {
			var currentKey = currentStateKey();
			return mEventStates[currentKey].scriptIndex(index);
		}

		function stateTransitionFlag() {
			return mStateTransitionFlag;
		}

		function deleteAllState() {
			for (var key in mEventStates) {
				delete mEventStates[key];
			}
		}

		function resetStateTransitionFlag() {
			mStateTransitionFlag = false;
		}

		function copyObj(eventID) {
			var copyEvent = RGPP.System.EventBase({
				id: eventID,
				categoryID: mInitMapCategoryID,
				mapID: mInitMapDataID,
				x: mInitX,
				y: mInitY,
				name: mName
			});
			// copyEvent.setImageName(mImageName);
			var stateArray = createStateArray();
			var scriptArray = createScriptArray();
			var initChangeableValueArray = createInitChangeableValueArray();
			copyEvent.updateStateWithArray(stateArray, scriptArray, initChangeableValueArray);
			return copyEvent;
		}

		function createStateArray() {
			var stateSize = getStateSize();
			var array = [stateSize];

			for (var i = 0; i < stateSize; ++i) {
				array[i] = mStateKeys[i];
			}

			return array;
		}

		function createScriptArray() {
			var stateSize = getStateSize();
			var array = [stateSize];
			for (var stateIndex = 0; stateIndex < stateSize; stateIndex += 1) {
				var scriptNum = getScriptNum(stateIndex);
				array[stateIndex] = [scriptNum];
				for (var scriptIndex = 0; scriptIndex < scriptNum; scriptIndex += 1) {
					var scriptCategoryID = getScriptCategoryID(stateIndex, scriptIndex);
					var scriptID = getScriptDataID(stateIndex, scriptIndex);
					array[stateIndex][scriptIndex] = [];
					array[stateIndex][scriptIndex][SCRIPT_CATEGORY_ID_INDEX] = scriptCategoryID;
					array[stateIndex][scriptIndex][SCRIPT_DATA_ID_INDEX] = scriptID;
				}
			}
			return array;
		}

		function createInitChangeableValueArray() {
			var stateSize = getStateSize();
			var array = [];
			for (var stateIndex = 0; stateIndex < stateSize; ++stateIndex) {
				var scriptNum = getScriptNum(stateIndex);
				array[stateIndex] = [];
				for (var scriptIndex = 0; scriptIndex < scriptNum; ++scriptIndex) {
					var changeableValueNum = getChangeableValueNum(stateIndex, scriptIndex);
					array[stateIndex][scriptIndex] = [];
					for (var cIndex = 0; cIndex < changeableValueNum; cIndex += 1) {
						var value = getChangeableInitValue(stateIndex, scriptIndex, cIndex);
						array[stateIndex][scriptIndex][cIndex] = value;
					}
				}
			}
			return array;
		}


		function saveInitValuesFromChangeableValue() {
			for (var key in mEventStates) {
				mEventStates[key].saveInitValuesFromChangeableValue();
			}
		}

		function saveInitValuesFromChangeableValuePerScript() {
			var currentKey = currentStateKey();
			mEventStates[currentKey].saveInitValuesFromChangeableValuePerScript();
		}


		initialize();
		return that;
	};


	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});
})((this || 0).self || global);