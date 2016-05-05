/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";

	var objName = "ScriptDataBase";

	/**
	 * Script Data Base
	 * @class ScriptDataBase
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var scriptUtil = RGPP.System.ScriptUtil.getInstance();
		var ATTR_NUM = 2;

		var NAME_INDEX = 0;
		var DESCRIPTION_INDEX = 1;

		var SAVE_CHANGEABLE_VALUE_NAME = "Script Changeable Value";
		var mTmpSaveChangeableValueData = [];

		var that = RGPP.System.DataBase({
			dbName: "ScriptDB",
			attrSize: ATTR_NUM
		});

		// Interface
		that.createObj = createObj;
		that.nameIndex = nameIndex;
		that.descriptionIndex = descriptionIndex;
		that.searchNameFromID = searchNameFromID;

		// get init values of chngeable values per Script from each Event
		that.allChangeableInitValuesFromEachEvent = getAllChangeableInitValuesFromEachEvent;

		// save all changeable init values
		that.saveAllChangeableInitValues = saveAllChangeableInitValues;

		// setter
		that.setChangeableInitValue = setChangeableInitValue;

		// getter
		that.changeableInitValues = getChangeableInitValues;

		function initialize() {
			var attrStringArray = [ATTR_NUM];
			attrStringArray[NAME_INDEX] = "Script Name ";
			attrStringArray[DESCRIPTION_INDEX] = "Description";

			that.setAttrString(attrStringArray);

			var defaultAttrValueArray = [ATTR_NUM];
			defaultAttrValueArray[NAME_INDEX] = "Script";
			defaultAttrValueArray[DESCRIPTION_INDEX] = "Description";

			that.setDefaultAttrValue(defaultAttrValueArray);

			var correctedAttrValueArray = [ATTR_NUM];

			correctedAttrValueArray[NAME_INDEX] = "Script";
			correctedAttrValueArray[DESCRIPTION_INDEX] = "Description";
			that.setCorrectedAttrValue(correctedAttrValueArray);
			that.load();

			loadAllChangeableInitValues();
		}

		function createObj(categoryID, dataID) {
			var categoryIndex = that.searchCategoryIndexFromID(categoryID);
			if (categoryIndex < 0) {
				scriptUtil.outputErrMsgToConsole("Can not create script instance : categoryID = " + categoryID + "categoryIndex = " + categoryIndex);
				return new RGPP.System.DefatulScript();
			}

			var dataIndex = that.searchDataIndexFromID(categoryID, dataID);
			if (dataIndex >= that.dataSize(categoryIndex) || dataIndex < 0) {
				scriptUtil.outputErrMsgToConsole("Can not create script instance : over flow ---> categoryID = " + categoryID + "dataID = " + dataID);
				return new RGPP.System.DefatulScript();
			}

			var scriptName = that.attrValue(categoryIndex, dataIndex, NAME_INDEX);
			if (scriptName === undefined) {
				scriptUtil.outputErrMsgToConsole("script name is undefined (no data)");
				return;
			}

			scriptName = correctScriptName(scriptName);
			var executeProgramString = "return new " + scriptName + "();";
			try {
				return (new Function(executeProgramString))();
			}
			catch (e) {
				scriptUtil.outputErrMsgToConsole("Can not create script instance : excecuteProgram String = " + executeProgramString);
				return new RGPP.System.DefatulScript();
			}

		}

		function nameIndex() {
			return NAME_INDEX;
		}

		function descriptionIndex() {
			return DESCRIPTION_INDEX;
		}

		var correctScriptName = function(scriptName) {
			var regExp = /\/([A-Za-z0-9_]+)/g;
			var array = regExp.exec(scriptName);

			if (array != null) {
				scriptName = array[array.length - 1];
			}

			scriptName = RGPP.GlobalNS + "." + RGPP.UserNS + "." + scriptName;
			return scriptName;
		};

		function searchNameFromID(categoryID, databaseID) {
			var categoryIndex = that.searchCategoryIndexFromID(categoryID);
			if (categoryIndex < 0) {
				scriptUtil.outputErrMsgToConsole("Can not create script instance : over flow ---> categoryID = " + categoryID);
				return "No Script Name";
			}
			var databaseIndex = that.searchDataIndexFromID(categoryID, databaseID);
			if (databaseIndex >= that.dataSize(categoryIndex) || databaseIndex < 0) {
				scriptUtil.outputErrMsgToConsole("Can not create script instance : over flow ---> databaseID = " + databaseID);
				return "No Script Name";
			}

			var scriptName = that.attrValue(categoryIndex, databaseIndex, NAME_INDEX);
			return scriptName;
		}

		function saveAllChangeableInitValues() {
			scriptUtil.outputMsgToConsole("[ScriptDataBase.js] save all changeable init values");
			if (!window.localStorage) {
				scriptUtil.outputErrMsgToConsole("local storage does not exists.");
				return;
			}
			var storage = localStorage;
			mTmpSaveChangeableValueData = getAllChangeableInitValuesFromEachEvent();
			storage.setItem(SAVE_CHANGEABLE_VALUE_NAME, JSON.stringify(mTmpSaveChangeableValueData));
			scriptUtil.outputMsgToConsole("save ChangeableValueData = " + mTmpSaveChangeableValueData);
		}

		function loadAllChangeableInitValues() {
			if (!window.localStorage) {
				alert("local storage does not exists.");
				return;
			}
			var storage = localStorage;
			mTmpSaveChangeableValueData = JSON.parse(storage.getItem(SAVE_CHANGEABLE_VALUE_NAME));

			if (mTmpSaveChangeableValueData === null) {
				mTmpSaveChangeableValueData = [];
				scriptUtil.outputErrMsgToConsole("Temporary Save Changeable Value Data is null");
			}
		}

		function getAllChangeableInitValuesFromEachEvent() {
			var categorySize = that.categorySize();
			var retData = [categorySize];
			for (var categoryIndex = 0; categoryIndex < categorySize; categoryIndex += 1) {
				var dataSize = that.dataSize(categoryIndex);
				var categoryID = that.categoryID(categoryIndex);
				retData[categoryID] = [];
				for (var dataIndex = 0; dataIndex < dataSize; dataIndex += 1) {
					var scriptName = that.attrValue(categoryIndex, dataIndex, NAME_INDEX);
					if (scriptName === undefined) {
						scriptUtil.outputErrMsgToConsole("script name is undefined");
						return;
					}

					scriptName = correctScriptName(scriptName);

					var executeProgramString = "return new " + scriptName + "();";
					scriptUtil.outputMsgToConsole(executeProgramString);
					var scriptObj = new Function(executeProgramString)();
					var changeableValues = scriptObj.loadChangeableValuesPerScript();
					var changeableValueLength = changeableValues.length;
					var allIndex = that.searchAllIndexFromIndexSet(categoryIndex, dataIndex);
					var scriptID = that.searchDataIDFromIndex(allIndex);
					retData[categoryID][scriptID] = [];

					var value;
					for (var valueIndex = 0; valueIndex < changeableValueLength; valueIndex += 1) {
						changeableValues[valueIndex].initialize();
						if (mTmpSaveChangeableValueData[categoryID] !== undefined) {
							if (mTmpSaveChangeableValueData[categoryID][scriptID] !== undefined) {
								value = mTmpSaveChangeableValueData[categoryID][scriptID][valueIndex];
								changeableValues[valueIndex].setValue(value);
							}
							else {
								value = changeableValues[valueIndex].value();
							}
						}
						else {
							value = changeableValues[valueIndex].value();
						}

						retData[categoryID][scriptID][valueIndex] = value;

						scriptUtil.outputMsgToConsole("values[" + categoryID + "][" + scriptID + "][" + valueIndex + "] = " + value);
					}
				}
			}
			scriptUtil.outputMsgToConsole(retData);
			return retData;
		}

		function getChangeableInitValues(categoryID, scriptID) {
			if (mTmpSaveChangeableValueData[categoryID] !== undefined) {
				return mTmpSaveChangeableValueData[categoryID][scriptID];
			}
			return [];
		}

		function setChangeableInitValue(categoryID, scriptID, valueIndex, value) {
			if (mTmpSaveChangeableValueData[categoryID] === undefined) {
				mTmpSaveChangeableValueData[categoryID] = [];
			}
			if (mTmpSaveChangeableValueData[categoryID][scriptID] === undefined) {
				mTmpSaveChangeableValueData[categoryID][scriptID] = [];
			}
			mTmpSaveChangeableValueData[categoryID][scriptID][valueIndex] = value;
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