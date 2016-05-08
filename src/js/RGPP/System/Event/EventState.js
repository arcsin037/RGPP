/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "EventState";

	/**
	 * EventState Object
	 * 
	 * @class EventState
	 * @author arcsin
	 * @constructor
	 * @param spec
	 * @param spec.id {Number} Event State ID
	 * @param spec.name {String} Event State Name
	 */
	var constructor = function(spec) {
		var that = {};
		var mID = spec.id;
		var mName = spec.name;

		var mScriptCategoryIDs = null;
		var mScriptDataIDs = null;
		var mScripts = null;
		var mScriptNames = null;
		var ScriptDB = RGPP.System.ScriptDataBase.getInstance();

		// 1 [] Each Script
		// 2 [[]] Each Script ID
		// 3 [[[]]] Each changeable value
		var mSaveChangeableInitValues = [];

		// Interface
		that.onLoadGame = onLoadGame;
		that.onLoadMap = onLoadMap;
		that.onStateTransition = onStateTransition;
		that.reaction = reaction;

		that.update = update;
		that.draw = draw;
		that.debugUpdate = debugUpdate;
		that.debugDraw = debugDraw;

		that.addScript = addScript;
		that.removeScript = removeScript;

		// setter
		that.setID = setID;
		that.setName = setName;
		that.setScriptID = setScriptID;
		that.setChangeableInitValue = setChangeableInitValue;

		// getter
		that.id = getID;
		that.name = getName;
		that.scriptID = getScriptID;
		that.scriptCategoryID = getScriptCategoryID;
		that.categoryIndex = getCategoryIndex;
		that.scriptIndex = getScriptIndex;
		that.scriptName = getScriptName;
		that.scriptNum = getScriptNum;
		that.changeableValueNum = getChangeableValueNum;
		that.changeableInitValue = getChangeableInitValue;

		// Changeable values operator
		that.loadChangeableValuesPerEvent = loadChangeableValuesPerEvent;
		that.loadChangeableValuesPerScript = loadChangeableValuesPerScript;

		// changeable value per event -> save value
		that.saveInitValuesFromChangeableValue = saveInitValuesFromChangeableValue;
		that.saveInitValuesFromChangeableValuePerScript = saveInitValuesFromChangeableValuePerScript;
		that.setInitValuesToChangeableValue = setInitValuesToChangeableValue;



		var initialize = function() {
			mScriptCategoryIDs = [1];
			mScriptCategoryIDs[0] = 0;

			mScriptDataIDs = [1];
			mScriptDataIDs[0] = 0;

			mScripts = [mScriptDataIDs.length];
			mScriptNames = [mScriptDataIDs.length];

			var scriptIDNum = mScriptDataIDs.length;
			for (var i = 0; i < scriptIDNum; i += 1) {
				mScripts[i] = ScriptDB.createObj(mScriptCategoryIDs[i], mScriptDataIDs[i]);
				mScriptNames[i] = "DefaultScript";
			}
			setInitValuesToChangeableValue();
		};

		function onLoadGame(event) {
			for (var i = 0; i < mScripts.length; i += 1) {
				mScripts[i].onLoadGame(event);
			}
		}

		function onLoadMap(event) {
			for (var i = 0; i < mScripts.length; i += 1) {
				mScripts[i].onLoadMap(event);
			}
		}

		function loadChangeableValuesPerEvent() {
			var scriptUtil = RGPP.System.ScriptUtil.getInstance();

			var retValues = [];
			for (var scriptIndex = 0; scriptIndex < mScripts.length; scriptIndex += 1) {
				var changeableValues = mScripts[scriptIndex].loadChangeableValuesPerEvent();
				retValues[scriptIndex] = [];
				for (var changeableValueIndex = 0; changeableValueIndex < changeableValues.length; changeableValueIndex += 1) {
					scriptUtil.outputMsgToConsole(changeableValues[changeableValueIndex].name() + ":" + changeableValues[changeableValueIndex].value());
					retValues[scriptIndex].push(changeableValues[changeableValueIndex]);
				}
			}
			return retValues;
		}


		function loadChangeableValuesPerScript(changeableValues) {
			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			var forCheckArray = [];
			for (var scriptIndex = 0; scriptIndex < mScripts.length; scriptIndex += 1) {
				var categoryID = mScriptCategoryIDs[scriptIndex];
				var scriptID = mScriptDataIDs[scriptIndex];
				var initValues = RGPP.System.ScriptDataBase.getInstance().changeableInitValues(categoryID, scriptID);
				if (forCheckArray[categoryID] === undefined) {
					forCheckArray[categoryID] = [];
				}
				if (forCheckArray[categoryID][scriptID] === undefined) {
					forCheckArray[categoryID][scriptID] = true;
					var tmpChangeableValues = mScripts[scriptIndex].loadChangeableValuesPerScript();
					for (var valueIndex = 0; valueIndex < tmpChangeableValues.length; valueIndex += 1) {
						var newName = tmpChangeableValues[valueIndex].baseName() + " " + "[(C:" + mScriptCategoryIDs[scriptIndex] + " D:" + mScriptDataIDs[scriptIndex] + ") \"" + getScriptName(scriptIndex) + "\"] ";
						tmpChangeableValues[valueIndex].setName(newName);
						tmpChangeableValues[valueIndex].initialize();
						if (initValues !== undefined) {
							scriptUtil.outputErrMsgToConsole("[EventState.js]: initValues[" + valueIndex + "] = " + initValues[valueIndex]);
							tmpChangeableValues[valueIndex].setValue(initValues[valueIndex]);
						}
						changeableValues.push(tmpChangeableValues[valueIndex]);
					}
				}
			}
		}


		function onStateTransition(event) {
			for (var i = 0; i < mScripts.length; i += 1) {
				mScripts[i].onStateTransition(event);
			}
		}

		function reaction(event) {
			for (var i = 0; i < mScripts.length; i += 1) {
				mScripts[i].reaction(event);
			}
		}

		function update(event) {
			for (var i = 0; i < mScripts.length; i += 1) {
				mScripts[i].update(event);
			}
		}

		function debugUpdate(event) {
			for (var i = 0; i < mScripts.length; i += 1) {
				mScripts[i].debugUpdate(event);
			}
		}

		function draw(ctx) {
			for (var i = 0; i < mScripts.length; i += 1) {
				ctx.save();
				mScripts[i].draw(ctx);
				ctx.restore();
			}
		}

		function debugDraw(ctx) {
			for (var i = 0; i < mScripts.length; i += 1) {
				ctx.save();
				mScripts[i].debugDraw(ctx);
				ctx.restore();
			}
		}


		function addScript() {
			mScriptDataIDs.push(0);
			var categoryIDLength = mScriptCategoryIDs.length;
			var dataIDLength = mScriptDataIDs.length;
			var scriptData = ScriptDB.createObj(mScriptCategoryIDs[categoryIDLength - 1], mScriptDataIDs[dataIDLength - 1]);
			mScripts.push(scriptData);
			setInitValuesToChangeableValue();
		}

		function removeScript() {
			if (mScriptDataIDs.length > 1) {
				mScriptDataIDs.pop();
				mScripts.pop();
			}
		}

		function getID() {
			return mID;
		}

		function getName() {
			return mName;
		}

		function setID(id) {
			mID = id;
		}

		function setName(name) {
			mName = name;
		}

		function setScriptID(index, categoryID, dataID) {
			var scriptName = ScriptDB.searchNameFromID(categoryID, dataID);

			if (categoryID !== mScriptCategoryIDs[index] ||
				dataID !== mScriptDataIDs[index] ||
				scriptName !== mScriptNames[index]) {
				mScriptCategoryIDs[index] = categoryID;
				mScriptDataIDs[index] = dataID;
				scriptUtil.outputMsgToConsole("categoryID = " + categoryID + " dataID = " + dataID);
				mScriptNames[index] = scriptName;

				mScripts[index] = ScriptDB.createObj(mScriptCategoryIDs[index], mScriptDataIDs[index]);
			}
			setInitValuesToChangeableValue();
		}

		function getScriptID(index) {
			return mScriptDataIDs[index];
		}


		function getScriptCategoryID(index) {
			return mScriptCategoryIDs[index];
		}

		function getScriptName(index) {
			var scriptCategoryID = mScriptCategoryIDs[index];
			var scriptDataID = mScriptDataIDs[index];
			return ScriptDB.searchNameFromID(scriptCategoryID, scriptDataID);
		}

		function getScriptIndex(index) {
			var scriptCategoryID = mScriptCategoryIDs[index];
			var scriptDataID = mScriptDataIDs[index];
			return ScriptDB.searchDataIndexFromID(scriptCategoryID, scriptDataID);
		}

		function getCategoryIndex(index) {
			var scriptCategoryID = mScriptCategoryIDs[index];
			return ScriptDB.searchCategoryIndexFromID(scriptCategoryID);
		}


		function getScriptNum() {
			return mScriptDataIDs.length;
		}

		// setter
		function setChangeableInitValue(scriptIndex, valueIndex, value) {
			if (!mSaveChangeableInitValues[scriptIndex]) {
				mSaveChangeableInitValues[scriptIndex] = [];
			}
			var categoryID = mScriptCategoryIDs[scriptIndex];
			if (!mSaveChangeableInitValues[scriptIndex][categoryID]) {
				mSaveChangeableInitValues[scriptIndex][categoryID] = [];
			}
			var scriptID = mScriptDataIDs[scriptIndex];
			if (!mSaveChangeableInitValues[scriptIndex][categoryID][scriptID]) {
				mSaveChangeableInitValues[scriptIndex][categoryID][scriptID] = [];
			}
			mSaveChangeableInitValues[scriptIndex][categoryID][scriptID][valueIndex] = value;
		}

		// getter
		function getChangeableInitValue(scriptIndex, valueIndex) {
			var categoryID = mScriptCategoryIDs[scriptIndex];
			var scriptID = mScriptDataIDs[scriptIndex];
			return mSaveChangeableInitValues[scriptIndex][categoryID][scriptID][valueIndex];
		}

		function getChangeableValueNum(scriptIndex) {
			var categoryID = mScriptCategoryIDs[scriptIndex];
			var scriptID = mScriptDataIDs[scriptIndex];

			if (mSaveChangeableInitValues[scriptIndex] !== undefined) {
				if (mSaveChangeableInitValues[scriptIndex][categoryID] !== undefined) {
					if (mSaveChangeableInitValues[scriptIndex][categoryID][scriptID] !== undefined) {
						return mSaveChangeableInitValues[scriptIndex][categoryID][scriptID].length;
					}
				}
			}

			return 0;
		}

		// changeable value per event -> save value
		function saveInitValuesFromChangeableValue() {
			var scriptNum = getScriptNum();
			for (var scriptIndex = 0; scriptIndex < scriptNum; scriptIndex += 1) {
				var changeableValues = mScripts[scriptIndex].loadChangeableValuesPerEvent();
				var changeableValueSize = changeableValues.length;
				for (var cIndex = 0; cIndex < changeableValueSize; cIndex += 1) {
					var value = changeableValues[cIndex].value();
					setChangeableInitValue(scriptIndex, cIndex, value);
				}
			}
		}

		// changeable value per script -> save value
		function saveInitValuesFromChangeableValuePerScript() {
			scriptUtil.outputMsgToConsole("saveInitValuesFromChangeableValuePerScript!");
			var scriptNum = getScriptNum();
			for (var scriptIndex = 0; scriptIndex < scriptNum; scriptIndex += 1) {
				var categoryID = mScriptCategoryIDs[scriptIndex];
				var scriptID = mScriptDataIDs[scriptIndex];
				var changeableValues = mScripts[scriptIndex].loadChangeableValuesPerScript();
				var changeableValueSize = changeableValues.length;
				for (var valueIndex = 0; valueIndex < changeableValueSize; valueIndex += 1) {
					var value = changeableValues[valueIndex].value();
					RGPP.System.ScriptDataBase.getInstance().setChangeableInitValue(categoryID, scriptID, valueIndex, value);
				}
			}
		}


		// save value -> changeable value per event
		function setInitValuesToChangeableValue() {
			for (var scriptIndex = 0; scriptIndex < mScripts.length; scriptIndex += 1) {
				var categoryID = mScriptCategoryIDs[scriptIndex];
				if (mSaveChangeableInitValues && mSaveChangeableInitValues[scriptIndex] && mSaveChangeableInitValues[scriptIndex][categoryID]) {
					var changeableValues = mScripts[scriptIndex].loadChangeableValuesPerEvent();
					var scriptID = mScriptDataIDs[scriptIndex];
					if (mSaveChangeableInitValues[scriptIndex][categoryID][scriptID]) {
						for (var valueIndex = 0; valueIndex < changeableValues.length; valueIndex += 1) {
							var initValue = mSaveChangeableInitValues[scriptIndex][categoryID][scriptID][valueIndex];
							changeableValues[valueIndex].setValue(initValue);
						}
					}
				}
			}
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