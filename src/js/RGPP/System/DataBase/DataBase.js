/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "DataBase";

	/**
	 * Data Base
	 * @class DataBase
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var scriptUtil = RGPP.System.ScriptUtil.getInstance();
		var mCategoryList = RGPP.System.List();

		var DATABASE_NAME = spec.dbName;

		var mAttrSize = spec.attrSize;

		var mAttrStringArray = null;
		var mDefaultAttrValueArray = null;
		var mCorrectedAttrValueArray = null;

		var that = {};
		that.save = save;
		that.load = load;

		that.addCategory = addCategory;
		that.addData = addData;
		that.removeCategory = removeCategory;

		that.updateData = updateData;
		that.updateWithArray = updateWithArray;
		that.data = getData;
		that.attrValue = attrValue;

		that.categories = getCategories;
		that.categorySize = getCategorySize;

		that.dataSize = getDataSize;

		that.attrSize = getAttrSize;
		that.setAttrString = setAttrString;
		that.attrStringArray = attrStringArray;
		that.setDefaultAttrValue = setDefaultAttrValue;
		that.defaultAttrValueArray = defaultAttrValueArray;
		that.setCorrectedAttrValue = setCorrectedAttrValue;
		that.show = show;

		that.searchDataFromID = searchDataFromID;
		that.searchDataIDFromIndex = searchDataIDFromIndex;
		that.searchDataIndexFromID = searchDataIndexFromID;
		that.searchCategoryIndexFromID = searchCategoryIndexFromID;
		that.searchCategoryIDFromIndex = searchCategoryIDFromIndex;
		that.searchAllIndexFromIndexSet = searchAllIndexFromIndexSet;
		that.searchAllIndexFromIDSet = searchAllIndexFromIDSet;
		that.searchMinDataID = searchMinDataID;

		that.allDataSize = allDataSize;
		that.categoryID = getCategoryID;
		that.categoryName = getCategoryName;
		that.setCategoryName = setCategoryName;
		that.dbName = getDBName;
		that.allData = allData;
		that.setData = setData;

		var Data = function(spec) {
			var that = {};

			var mID = spec.id;
			var attrSize = spec.attrValues.length;
			var mAttr = [];

			for (var attrIndex = 0; attrIndex < attrSize; attrIndex += 1) {
				mAttr[attrIndex] = spec.attrValues[attrIndex];
			}

			that.id = function() {
				return mID;
			};

			that.setID = function(id) {
				mID = id;
			};

			that.attrValue = function(attrIndex) {
				return mAttr[attrIndex];
			};

			that.setAttrValue = function(attrIndex, value) {
				mAttr[attrIndex] = value;
			};

			return that;
		};

		var Category = function(spec) {
			var that = RGPP.System.List();
			var mID = spec.id;
			var mCategoryName = spec.name;

			// setter 
			that.setID = setID;
			that.setName = setName;

			// getter
			that.id = getID;
			that.name = getCategoryName;
			that.attrValue = attrValue;

			that.addData = addData;
			that.searchDataIndexFromID = searchDataIndexFromID;
			that.searchNewDataID = searchNewDataID;

			function getID() {
				return mID;
			}

			function setID(id) {
				mID = id;
			}

			function getCategoryName() {
				return mCategoryName;
			}

			function setName(name) {
				mCategoryName = name;
			}

			function attrValue(dataIndex, attrIndex) {
				var data = that.data(dataIndex);
				if (data !== null) {
					return data.attrValue(attrIndex);
				}

				scriptUtil.outputErrMsgToConsole("[Category:attrValue] data " + dataIndex + " is null!");
				return null;
			}

			function addData(attrArray) {
				var newID = searchNewDataID();
				var correctedAttrValues = correctAttrValues(newID, attrArray);
				var data = Data({
					id: newID,
					attrValues: correctedAttrValues
				});
				that.push(data);
			}

			function searchNewDataID() {
				if (that.isEmpty()) {
					return 0;
				}
				var newID = 0;
				var scanID = 0;
				var DBDatas = that.datas();
				while (true) {
					var existFlag = false;
					for (var listIndex = 0; listIndex < that.size(); listIndex += 1) {
						if (DBDatas[listIndex].id() === scanID) {
							existFlag = true;
							break;
						}
					}
					if (!existFlag) {
						newID = scanID;
						break;
					}
					++scanID;
				}
				return newID;
			}

			function searchDataIndexFromID(dataID) {
				var dataNum = that.size();
				var datas = that.datas();
				for (var i = 0; i < dataNum; i += 1) {
					if (datas[i].id() === dataID) {
						return i;
					}
				}
				scriptUtil.outputErrMsgToConsole("[Category:SearchIndexFromID] No Element! ID " + dataID);
				return -1;
			}


			return that;
		};

		// Base Method
		function updateWithArray(dataArray) {
			mCategoryList.clear();
			if (dataArray === undefined) {
				return;
			}
			updateData(dataArray);
		}

		function updateData(dataArray) {
			var categoryNum = dataArray.length;
			for (var categoryIndex = 0; categoryIndex < categoryNum; categoryIndex += 1) {
				addCategory(dataArray[categoryIndex]);
			}
		}

		function addCategory(categoryData) {
			var newID = searchNewCategoryID();
			var categoryName = categoryData.name;
			var newCategory = Category({
				id: newID,
				name: categoryName
			});
			var dataArray = categoryData.data;
			var dataSize = dataArray.length;
			for (var dataIndex = 0; dataIndex < dataSize; dataIndex += 1) {
				newCategory.addData(dataArray[dataIndex]);
			}
			mCategoryList.push(newCategory);
		}

		function addData(categoryIndex, data) {
			if (mCategoryList.data(categoryIndex) === null) {
				var inputData = [];
				inputData[0] = data;
				addCategory({
					name: "Category " + categoryIndex,
					data: inputData
				});
			}
			else {
				mCategoryList.data(categoryIndex).addData(data);
			}
		}

		function save() {
			if (!window.localStorage) {
				scriptUtil.outputErrMsgToConsole("local storage does not exists.");
				return;
			}
			var storage = localStorage;

			var javascriptData = {
				DBDataArray: []
			};

			var categoryArray = mCategoryList.datas();
			var categorySize = categoryArray.length;

			var jsonDataArray = [];

			for (var categoryIndex = 0; categoryIndex < categorySize; categoryIndex += 1) {
				var dataSize = categoryArray[categoryIndex].size();
				var categoryName = categoryArray[categoryIndex].name();
				jsonDataArray[categoryIndex] = {
					name: categoryName,
					data: []
				};
				for (var dataIndex = 0; dataIndex < dataSize; dataIndex += 1) {
					var data = categoryArray[categoryIndex].data(dataIndex);
					var attrJsonData = createAttrJsonFromData(data);
					jsonDataArray[categoryIndex].data[dataIndex] = attrJsonData;
				}
			}

			javascriptData.DBDataArray = jsonDataArray;

			var jsonData = JSON.stringify(javascriptData);
			storage.setItem(DATABASE_NAME, jsonData);
			scriptUtil.outputMsgToConsole("Save DB " + DATABASE_NAME + " completely");
		}

		// return jsonData String
		function load() {
			if (!window.localStorage) {
				scriptUtil.outputErrMsgToConsole("local storage does not exists.");
				return;
			}
			var storage = localStorage;
			var jsonData = storage.getItem(DATABASE_NAME);
			var javascriptData = JSON.parse(jsonData);

			if (javascriptData === null) {
				scriptUtil.outputErrMsgToConsole("Can not find DB '" + DATABASE_NAME + "'");
				return "";
			}
			var dbDataArray = javascriptData.DBDataArray;
			updateWithArray(dbDataArray);
			scriptUtil.outputMsgToConsole("Load DB " + DATABASE_NAME + " completely");

			return javascriptData;
		}

		function show() {
			var DBDataNum = mCategoryList.size();
			var DBDatas = mCategoryList.datas();
			for (var i = 0; i < DBDataNum; i += 1) {
				scriptUtil.outputMsgToConsole("Image[" + i + "] ID = " + DBDatas[i].id() +
					" Name = " + DBDatas[i].name());
			}
		}

		function setData(categoryID, dataID, attrIndex, value) {
			var data = searchDataFromID(categoryID, dataID);
			data.setAttrValue(attrIndex, value);
		}

		function searchDataFromID(categoryID, dataID) {
			var categoryIndex = searchCategoryIndexFromID(categoryID);
			if (categoryIndex < 0) {
				scriptUtil.outputErrMsgToConsole("[DataBase:searchDataFromID] No Element! Category ID = " + categoryID);

				return null;
			}
			var dataIndex = searchDataIndexFromID(categoryID, dataID);
			if (dataIndex < 0) {
				scriptUtil.outputErrMsgToConsole("[DataBase:searchDataFromID] No Element! Category ID = " + categoryID + " Data ID " + dataID);
				return null;
			}

			return mCategoryList.data(categoryIndex).data(dataIndex);
		}

		function searchDataIDFromIndex(index) {
			var saveIndex = 0;
			var categorySize = mCategoryList.size();
			for (var categoryIndex = 0; categoryIndex < categorySize; categoryIndex += 1) {
				var categoryData = mCategoryList.data(categoryIndex);
				if (categoryData !== null) {
					var dataSize = categoryData.size();
					saveIndex += dataSize;
					if (index < saveIndex) {
						var dataIndex = index - saveIndex + dataSize;
						var dataObj = mCategoryList.data(categoryIndex).data(dataIndex);
						if (dataObj !== null) {
							return dataObj.id();
						}
					}
				}
			}
			return -1;
		}

		function searchDataIndexFromID(categoryID, dataID) {
			var categoryIndex = searchCategoryIndexFromID(categoryID);
			if (categoryIndex < 0) {
				return -1;
			}
			return mCategoryList.data(categoryIndex).searchDataIndexFromID(dataID);
		}

		function searchCategoryIndexFromID(categoryID) {
			var categorySize = mCategoryList.size();
			for (var i = 0; i < categorySize; i += 1) {
				if (mCategoryList.data(i).id() === categoryID) {
					return i;
				}
			}
			return -1;
		}

		function searchCategoryIDFromIndex(index) {
			var saveIndex = 0;
			var categorySize = mCategoryList.size();
			for (var categoryIndex = 0; categoryIndex < categorySize; categoryIndex += 1) {
				var categoryData = mCategoryList.data(categoryIndex);
				if (categoryData !== null) {
					var dataSize = mCategoryList.data(categoryIndex).size();
					saveIndex += dataSize;
					if (index < saveIndex) {
						return mCategoryList.data(categoryIndex).id();
					}
				}
			}
			return -1;
		}


		function searchAllIndexFromIndexSet(categoryIndex, dataIndex) {
			var saveIndex = 0;
			for (var i = 0; i < categoryIndex; i += 1) {
				var categoryData = mCategoryList.data(i);
				if (categoryData !== null) {
					var dataSize = mCategoryList.data(i).size();
					saveIndex += dataSize;
				}
			}
			return saveIndex + dataIndex;
		}

		function searchAllIndexFromIDSet(categoryID, dataID) {
			var categoryIndex = searchCategoryIndexFromID(categoryID);
			if (categoryIndex < 0) {
				return -1;
			}
			var dataIndex = mCategoryList.data(categoryIndex).searchDataIndexFromID(dataID);
			return searchAllIndexFromIndexSet(categoryIndex, dataIndex);
		}


		function attrValue(categoryIndex, dataIndex, attrIndex) {
			var category = mCategoryList.data(categoryIndex);
			if (category !== null) {
				return category.attrValue(dataIndex, attrIndex);
			}
			scriptUtil.outputErrMsgToConsole("[DataBase:attrValue] category " + categoryIndex + " is null!");
			return null;
		}

		function getCategories() {
			return mCategoryList.datas();
		}

		function getDataSize(categoryIndex) {
			return mCategoryList.data(categoryIndex).size();
		}

		function allData() {
			// 1D array
			var array = [];
			var saveIndex = 0;
			var categorySize = mCategoryList.size();
			for (var categoryIndex = 0; categoryIndex < categorySize; categoryIndex += 1) {
				var dataSize = mCategoryList.data(categoryIndex).size();
				for (var dataIndex = 0; dataIndex < dataSize; dataIndex += 1) {
					var arrayIndex = saveIndex + dataIndex;
					array[arrayIndex] = mCategoryList.data(categoryIndex).data(dataIndex);
				}
				saveIndex += dataSize;
			}
			return array;
		}

		function allDataSize() {
			var size = 0;
			var categorySize = mCategoryList.size();
			for (var categoryIndex = 0; categoryIndex < categorySize; categoryIndex += 1) {
				size += mCategoryList.data(categoryIndex).size();
			}
			return size;
		}

		function getCategorySize() {
			return mCategoryList.size();
		}

		function getData(index) {
			return mCategoryList.data(index);
		}

		function getAttrSize() {
			return mAttrSize;
		}

		function setAttrString(attrStringArray) {
			mAttrStringArray = [];
			for (var attrIndex = 0; attrIndex < mAttrSize; attrIndex += 1) {
				mAttrStringArray[attrIndex] = attrStringArray[attrIndex];
			}
		}

		function attrStringArray() {
			return mAttrStringArray;
		}

		function setDefaultAttrValue(defaultAttrValueArray) {
			mDefaultAttrValueArray = [];
			for (var attrIndex = 0; attrIndex < mAttrSize; attrIndex += 1) {
				mDefaultAttrValueArray[attrIndex] = defaultAttrValueArray[attrIndex];
			}
		}

		function defaultAttrValueArray() {
			return mDefaultAttrValueArray;
		}

		function setCorrectedAttrValue(correctedAttrValueArray) {
			mCorrectedAttrValueArray = [];
			for (var attrIndex = 0; attrIndex < mAttrSize; attrIndex += 1) {
				mCorrectedAttrValueArray[attrIndex] = correctedAttrValueArray[attrIndex];
			}
		}

		// Private method
		var correctAttrValues = function(databaseID, attrArray) {
			var correctedValues = [];
			for (var attrIndex = 0; attrIndex < mAttrSize; attrIndex += 1) {
				var correctedValue = null;
				if (mCorrectedAttrValueArray !== null) {
					correctedValue = mCorrectedAttrValueArray[attrIndex];
					if (RGPP.isFiniteNumber(correctedValue)) {
						correctedValues[attrIndex] = attrArray[attrIndex] || correctedValue;
						continue;
					}
				}
				if (typeof correctedValue === "string") {
					correctedValue = correctedValue + " " + databaseID;
				}

				if (typeof correctedValue === "boolean") {
					correctedValues[attrIndex] = attrArray[attrIndex];
				}
				else {
					correctedValues[attrIndex] = attrArray[attrIndex] || correctedValue;
				}
			}
			return correctedValues;
		};

		var searchNewCategoryID = function() {
			if (mCategoryList.isEmpty()) {
				return 0;
			}
			var newID = 0;
			var scanID = 0;
			var DBDatas = mCategoryList.datas();
			while (true) {
				var existFlag = false;
				for (var listIndex = 0; listIndex < mCategoryList.size(); listIndex += 1) {
					if (DBDatas[listIndex].id() === scanID) {
						existFlag = true;
						break;
					}
				}
				if (!existFlag) {
					newID = scanID;
					break;
				}
				++scanID;
			}
			return newID;
		};

		function searchMinDataID(categoryIndex) {
			if (mCategoryList.isEmpty()) {
				return 0;
			}
			return mCategoryList.data(categoryIndex).searchNewDataID();
		}


		var createAttrJsonFromData = function(data) {
			var attrSize = mAttrSize;
			var jsonDataArray = [];
			for (var attrIndex = 0; attrIndex < attrSize; attrIndex += 1) {
				jsonDataArray[attrIndex] = data.attrValue(attrIndex);
			}
			return jsonDataArray;
		};

		function getCategoryName(categoryIndex) {
			return mCategoryList.data(categoryIndex).name();
		}

		function setCategoryName(categoryIndex, newName) {
			mCategoryList.data(categoryIndex).setName(newName);
		}

		function getDBName() {
			return DATABASE_NAME;
		}

		function removeCategory(categoryIndex) {
			return mCategoryList.remove(categoryIndex);
		}

		function getCategoryID(categoryIndex) {
			return mCategoryList.data(categoryIndex).id();
		}

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
