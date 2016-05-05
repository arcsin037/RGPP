/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "MapChipDataBase";

	/**
	 * Mapchip Data Base
	 * @class MapChipDataBase
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var ATTR_NUM = 5;

		var NAME_INDEX = 0;
		var PATH_INDEX = 1;
		var CHIP_WIDTH_INDEX = 2;
		var CHIP_HEIGHT_INDEX = 3;

		var DESCRIPTION_INDEX = 4;

		var SAVE_NAME = "MapChip";

		var mSaveTagData = [];

		var that = RGPP.System.DataBase({
			dbName: "MapChipDB",
			attrSize: ATTR_NUM
		});

		that.saveTagData = saveTagData;
		that.loadTagData = loadTagData;
		that.getTagData = getTagData;
		that.setTagData = setTagData;
		that.setTagDataArray = setTagDataArray;
		that.nameIndex = nameIndex;
		that.pathIndex = pathIndex;
		that.chipWidthIndex = chipWidthIndex;
		that.chipHeightIndex = chipHeightIndex;
		that.updateWithJsMapChipData = updateWithJsMapChipData;

		var initialize = function() {
			var attrStringArray = [ATTR_NUM];
			attrStringArray[NAME_INDEX] = "Map Chip Name";
			attrStringArray[PATH_INDEX] = "Map Chip Path";
			attrStringArray[CHIP_WIDTH_INDEX] = "Map Chip Width";
			attrStringArray[CHIP_HEIGHT_INDEX] = "Map Chip Height";
			attrStringArray[DESCRIPTION_INDEX] = "Description";

			that.setAttrString(attrStringArray);

			var defaultAttrValueArray = [ATTR_NUM];
			defaultAttrValueArray[NAME_INDEX] = "Map Chip";
			defaultAttrValueArray[PATH_INDEX] = "Path";
			defaultAttrValueArray[CHIP_WIDTH_INDEX] = 32;
			defaultAttrValueArray[CHIP_HEIGHT_INDEX] = 32;
			defaultAttrValueArray[DESCRIPTION_INDEX] = "Description";

			that.setDefaultAttrValue(defaultAttrValueArray);

			var correctedAttrValueArray = [ATTR_NUM];

			correctedAttrValueArray[NAME_INDEX] = "Map Chip";
			correctedAttrValueArray[PATH_INDEX] = "Path";
			correctedAttrValueArray[CHIP_WIDTH_INDEX] = 32;
			correctedAttrValueArray[CHIP_HEIGHT_INDEX] = 32;
			correctedAttrValueArray[DESCRIPTION_INDEX] = "Description";
			that.setCorrectedAttrValue(correctedAttrValueArray);

			that.load();
			loadTagData();
		};

		function updateWithJsMapChipData(dataArray, mapChipTagData) {
			that.updateWithArray(dataArray);

			var tagDataArray = [];
			var allDataSize = that.allDataSize();
			for (var mapChipDataIndex = 0; mapChipDataIndex < allDataSize; mapChipDataIndex += 1) {
				var categoryID = that.searchCategoryIDFromIndex(mapChipDataIndex);
				var dataID = that.searchDataIDFromIndex(mapChipDataIndex);
				if (mapChipTagData[categoryID] === undefined) {
					tagDataArray = [];
				}
				else {
					if (mapChipTagData[categoryID][dataID] === undefined) {
						tagDataArray = [];
					}
					else {
						tagDataArray = mapChipTagData[categoryID][dataID];
					}

				}
				setTagDataArray(categoryID, dataID, tagDataArray);
			}
		}


		function saveTagData() {
			if (!window.localStorage) {
				alert("local storage does not exists.");
				return;
			}
			var storage = localStorage;
			storage.setItem(SAVE_NAME, JSON.stringify(mSaveTagData));
		}

		function loadTagData() {
			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			if (!window.localStorage) {
				scriptUtil.outputErrMsgToConsole("local storage does not exists.");
				return;
			}
			var storage = localStorage;
			mSaveTagData = JSON.parse(storage.getItem(SAVE_NAME));

			scriptUtil.outputMsgToConsole(mSaveTagData);

			if (mSaveTagData === null) {
				scriptUtil.outputErrMsgToConsole("Tag Save Data is " + mSaveTagData);
				mSaveTagData = [];
			}

			return mSaveTagData;
		}

		function getTagData(categoryID, dataID, chipSetNo) {
			if (mSaveTagData[categoryID] === undefined) {
				mSaveTagData[categoryID] = [];
			}
			if (mSaveTagData[categoryID][dataID] === undefined) {
				mSaveTagData[categoryID][dataID] = [];
			}
			if (mSaveTagData[categoryID][dataID][chipSetNo] === undefined || mSaveTagData[categoryID][dataID][chipSetNo] === null) {
				mSaveTagData[categoryID][dataID][chipSetNo] = 0;
			}
			return mSaveTagData[categoryID][dataID][chipSetNo];
		}

		function setTagData(categoryID, dataID, chipSetNo, tagData) {
			if (mSaveTagData[categoryID] === undefined) {
				mSaveTagData[categoryID] = [];
			}
			if (mSaveTagData[categoryID][dataID] === undefined) {
				mSaveTagData[categoryID][dataID] = [];
			}
			mSaveTagData[categoryID][dataID][chipSetNo] = tagData;
		}

		function setTagDataArray(categoryID, dataID, tagDataArray) {
			if (mSaveTagData[categoryID] === undefined) {
				mSaveTagData[categoryID] = [];
			}
			mSaveTagData[categoryID][dataID] = tagDataArray;
		}

		function nameIndex() {
			return NAME_INDEX;
		}

		function pathIndex() {
			return PATH_INDEX;
		}

		function chipWidthIndex() {
			return CHIP_WIDTH_INDEX;
		}

		function chipHeightIndex() {
			return CHIP_HEIGHT_INDEX;
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