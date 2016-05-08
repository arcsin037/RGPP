/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "MapPanelList";

	/**
	 * Map Panel List
	 * @class MapPanelList
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var scriptUtil = RGPP.System.ScriptUtil.getInstance();
		var mMapPanelList = RGPP.System.List();
		var EVENT_LAYER_NUM = 3;
		var mCurrentIndex = 0;
		var mDrawModeIndex = 0;
		var mCurrentLayerIndex = EVENT_LAYER_NUM;
		var mSaveMapData = [];
		var SAVE_NAME = "Map Data";

		var mListName = "Map Edit Panel";

		var ATTR_NUM = 6;

		var NAME_INDEX = 0;
		var MAP_COL_INDEX = 1;
		var MAP_ROW_INDEX = 2;
		var CHIP_WIDTH_INDEX = 3;
		var CHIP_HEIGHT_INDEX = 4;
		var DESCRIPTION_INDEX = 5;

		var mGridModeFlag = false;

		// DB		
		var that = RGPP.System.DataBase({
			dbName: "MapDB",
			attrSize: ATTR_NUM
		});

		// Interface
		that.createObj = createObj;
		that.createAllMapPanel = createAllMapPanel;
		that.resetStateTransitionFlagOutOfMap = resetStateTransitionFlagOutOfMap;
		that.push = push;
		that.insert = insert;
		that.remove = remove;
		that.currentMapPanel = currentMapPanel;
		that.setCurrentMapPanel = setCurrentMapPanel;
		that.isEventLayer = isEventLayer;
		that.panel = panel;
		that.mapPanelCanvases = mapPanelCanvases;
		that.mapPanelNames = mapPanelNames;
		that.updateAll = updateAll;
		that.updateDrawMode = updateDrawMode;
		that.updateMapLayer = updateMapLayer;
		that.currentEventNameList = currentEventNameList;
		that.size = size;
		that.title = title;
		that.content = content;
		that.listName = listName;
		that.undo = undo;
		that.redo = redo;
		that.searchMapIndexFromID = searchMapIndexFromID;
		that.loadAllMap = loadAllMap;
		that.saveAllMap = saveAllMap;
		that.saveCurrentMapPanel = saveCurrentMapPanel;
		that.updateWithJsMapData = updateWithJsMapData;
		that.gridMode = getGridModeFlag;
		that.toggleGridMode = toggleGridMode;
		that.chipWidth = getChipWidth;
		that.chipHeight = getChipHeight;

		// Private Method Implementation
		function initDB() {
			var attrStringArray = [ATTR_NUM];
			attrStringArray[NAME_INDEX] = "Map Name";
			attrStringArray[MAP_ROW_INDEX] = "Row";
			attrStringArray[MAP_COL_INDEX] = "Column";
			attrStringArray[CHIP_WIDTH_INDEX] = "Chip Width";
			attrStringArray[CHIP_HEIGHT_INDEX] = "Chip Height";
			attrStringArray[DESCRIPTION_INDEX] = "Description";

			that.setAttrString(attrStringArray);

			var defaultAttrValueArray = [ATTR_NUM];
			defaultAttrValueArray[NAME_INDEX] = "Map";
			defaultAttrValueArray[MAP_COL_INDEX] = 20;
			defaultAttrValueArray[MAP_ROW_INDEX] = 15;
			defaultAttrValueArray[CHIP_WIDTH_INDEX] = 32;
			defaultAttrValueArray[CHIP_HEIGHT_INDEX] = 32;
			defaultAttrValueArray[DESCRIPTION_INDEX] = "Description";

			that.setDefaultAttrValue(defaultAttrValueArray);

			var correctedAttrValueArray = [ATTR_NUM];

			correctedAttrValueArray[NAME_INDEX] = "Map";
			correctedAttrValueArray[MAP_COL_INDEX] = 1;
			correctedAttrValueArray[MAP_ROW_INDEX] = 1;
			correctedAttrValueArray[CHIP_WIDTH_INDEX] = 32;
			correctedAttrValueArray[CHIP_HEIGHT_INDEX] = 32;
			correctedAttrValueArray[DESCRIPTION_INDEX] = "Description";
			that.setCorrectedAttrValue(correctedAttrValueArray);
			that.load();

		}

		function createObj(arg) {
			var attrArray = [ATTR_NUM];
			attrArray[NAME_INDEX] = arg.mapName;
			attrArray[MAP_ROW_INDEX] = arg.row;
			attrArray[MAP_COL_INDEX] = arg.col;
			attrArray[CHIP_WIDTH_INDEX] = arg.chipWidth;
			attrArray[CHIP_HEIGHT_INDEX] = arg.chipHeight;
			attrArray[DESCRIPTION_INDEX] = arg.description;

			var mapPanel = createMapPanel({
				categoryID: arg.categoryIndex,
				mapName: arg.mapName,
				row: arg.row,
				col: arg.col,
				chipWidth: arg.chipWidth,
				chipHeight: arg.chipHeight,
			});
			that.addData(arg.categoryIndex, attrArray);
			return mapPanel;
		}

		function createAllMapPanel() {
			finalize();
			var categorySize = that.categorySize();
			for (var categoryID = 0; categoryID < categorySize; categoryID += 1) {
				var mapDataSize = that.dataSize(categoryID);
				for (var mapDataID = 0; mapDataID < mapDataSize; mapDataID += 1) {
					var mapName = that.attrValue(categoryID, mapDataID, NAME_INDEX);
					var mapRow = that.attrValue(categoryID, mapDataID, MAP_ROW_INDEX);
					var mapCol = that.attrValue(categoryID, mapDataID, MAP_COL_INDEX);
					var chipWidth = that.attrValue(categoryID, mapDataID, CHIP_WIDTH_INDEX);
					var chipHeight = that.attrValue(categoryID, mapDataID, CHIP_HEIGHT_INDEX);
					createMapPanel({
						categoryID: categoryID,
						mapID: mapDataID,
						mapName: mapName,
						row: mapRow,
						col: mapCol,
						chipWidth: chipWidth,
						chipHeight: chipHeight,
					});
				}
			}
			loadAllMap();
			scriptUtil.outputMsgToConsole("create all map panel!");
		}

		function createMapPanel(arg, index) {
			var mapID = undefined;
			if (arg.mapID === undefined) {
				mapID = that.searchMinDataID(arg.categoryID);
			}
			else {
				mapID = arg.mapID;
			}
			var newMapPanel = RGPP.System.MapPanel({
				categoryID: arg.categoryID,
				mapID: mapID,
				name: arg.mapName,
				row: arg.row,
				col: arg.col,
				chipWidth: arg.chipWidth,
				chipHeight: arg.chipHeight,
			});
			if (index === undefined) {
				mMapPanelList.push(newMapPanel);
			}
			else {
				mMapPanelList.insert(newMapPanel, index);
			}
			return newMapPanel;
		}

		function push(mapPanel) {
			return mMapPanelList.push(mapPanel);
		}

		function insert(mapPanel, index) {
			return mMapPanelList.insert(index, mapPanel);
		}

		function remove(index) {
			return mMapPanelList.remove(index);
		}

		function currentMapPanel() {
			if (mMapPanelList.data(mCurrentIndex) === null) {
				scriptUtil.outputErrMsgToConsole("[MapPanelList.js] null : currentIndex = " + mCurrentIndex);
			}
			return mMapPanelList.data(mCurrentIndex);
		}

		function setCurrentMapPanel(index) {
			var isFiniteNumber = RGPP.isFiniteNumber(index);
			if (isFiniteNumber) {
				mCurrentIndex = index;
			}
			else {
				mCurrentIndex = -1;
			}
		}

		function isEventLayer() {
			return (mCurrentLayerIndex === EVENT_LAYER_NUM);
		}

		function panel(index) {
			return mMapPanelList.data(index);
		}

		function mapPanelCanvases() {
			var n = mMapPanelList.size();
			var array = [];
			for (var i = 0; i < n; i += 1) {
				array[i] = mMapPanelList.data(i).canvas();
			}
			return array;
		}

		function mapPanelNames() {
			var n = mMapPanelList.size();
			var array = [];
			for (var i = 0; i < n; i += 1) {
				array[i] = mMapPanelList.data(i).mapName();
			}
			return array;
		}

		function updateAll() {
			for (var mapPanelIndex = 0; mapPanelIndex < mMapPanelList.size(); mapPanelIndex += 1) {
				mMapPanelList.data(mapPanelIndex).setDrawModeByComboBox(mDrawModeIndex);
				mMapPanelList.data(mapPanelIndex).setCurrentLayer(mCurrentLayerIndex);
			}
			RGPP.System.EventDialogList.getInstance().updateDialog();
		}

		function updateWithJsMapData(dataArray, mapData) {
			that.updateWithArray(dataArray);

			finalize();
			var categorySize = that.categorySize();
			for (var categoryID = 0; categoryID < categorySize; categoryID += 1) {
				var mapDataSize = that.dataSize(categoryID);
				for (var mapDataID = 0; mapDataID < mapDataSize; mapDataID += 1) {
					var mapName = that.attrValue(categoryID, mapDataID, NAME_INDEX);
					var mapRow = that.attrValue(categoryID, mapDataID, MAP_ROW_INDEX);
					var mapCol = that.attrValue(categoryID, mapDataID, MAP_COL_INDEX);
					var chipWidth = that.attrValue(categoryID, mapDataID, CHIP_WIDTH_INDEX);
					var chipHeight = that.attrValue(categoryID, mapDataID, CHIP_HEIGHT_INDEX);
					var panel = createMapPanel({
						categoryID: categoryID,
						mapName: mapName,
						row: mapRow,
						col: mapCol,
						chipWidth: chipWidth,
						chipHeight: chipHeight,
					});
					panel.updateWithJsMapData(mapData[mapDataID]);
				}
			}
			updateAll();
		}

		function updateDrawMode(selectedIndex) {
			mDrawModeIndex = selectedIndex;
			for (var mapPanelIndex = 0; mapPanelIndex < mMapPanelList.size(); mapPanelIndex += 1) {
				mMapPanelList.data(mapPanelIndex).setDrawModeByComboBox(mDrawModeIndex);
			}
		}

		function updateMapLayer(selectedIndex) {
			mCurrentLayerIndex = selectedIndex;
			for (var mapPanelIndex = 0; mapPanelIndex < mMapPanelList.size(); mapPanelIndex += 1) {
				mMapPanelList.data(mapPanelIndex).setCurrentLayer(mCurrentLayerIndex);
			}
		}

		function currentEventNameList() {
			return mMapPanelList.data(mCurrentIndex).createListUL();
		}

		function size() {
			return mMapPanelList.size();
		}

		function title(index) {
			return mMapPanelList.data(index).mapName();
		}

		function content(index) {
			return mMapPanelList.data(index).canvas();
		}

		function listName() {
			return mListName;
		}

		function undo() {
			mMapPanelList.data(mCurrentIndex).undo();
		}

		function redo() {
			mMapPanelList.data(mCurrentIndex).redo();
		}

		function resetStateTransitionFlagOutOfMap() {
			var currentMapPanelID = mMapPanelList.data(mCurrentIndex).id();
			for (var mapPanelIndex = 0; mapPanelIndex < mMapPanelList.size(); mapPanelIndex += 1) {
				mMapPanelList.data(mapPanelIndex).resetStateTransitionFlagOutOfMap(currentMapPanelID);
			}
		}

		function loadAllMap() {
			loadMapData();
			var dataSize = mMapPanelList.size();
			for (var mapPanelIndex = 0; mapPanelIndex < dataSize; mapPanelIndex += 1) {
				mMapPanelList.data(mapPanelIndex).updateWithJsMapData(mSaveMapData[mapPanelIndex]);
				mMapPanelList.data(mapPanelIndex).paintComponent();
			}
			scriptUtil.outputMsgToConsole("load map!");
			return mSaveMapData;
		}

		function saveCurrentMapPanel() {
			RGPP.System.EventObjManager.getInstance().saveChangeableValues();
			mSaveMapData[mCurrentIndex] = mMapPanelList.data(mCurrentIndex).getMapData();
			saveMapData();
			scriptUtil.outputMsgToConsole("save current map!");
		}

		function saveAllMap() {
			RGPP.System.EventObjManager.getInstance().saveChangeableValues();
			var dataSize = mMapPanelList.size();
			for (var mapPanelIndex = 0; mapPanelIndex < dataSize; mapPanelIndex += 1) {
				mSaveMapData[mapPanelIndex] = mMapPanelList.data(mapPanelIndex).getMapData();
			}
			saveMapData();
			scriptUtil.outputMsgToConsole("save map!");
		}

		function searchMapIndexFromID(categoryID, mapID) {
			if (mMapPanelList.isEmpty()) {
				return 0;
			}
			for (var i = 0; i < mMapPanelList.size(); i += 1) {
				var map = mMapPanelList.data(i);
				if (map.categoryID() === categoryID && map.id() === mapID) {
					return i;
				}
			}
			return mMapPanelList.size() - 1;
		}

		// destructor
		function finalize() {
			removeSaveData();
			for (var mapPanelIndex = 0; mapPanelIndex < mMapPanelList.size(); mapPanelIndex += 1) {
				mMapPanelList.data(mapPanelIndex).finalize();
			}
			mMapPanelList.clear();
		}

		var saveMapData = function() {
			if (!window.localStorage) {
				scriptUtil.outputErrMsgToConsole("local storage does not exists.");
				return;
			}
			var storage = localStorage;
			storage.setItem(SAVE_NAME, JSON.stringify(mSaveMapData));
		};

		var loadMapData = function() {
			if (!window.localStorage) {
				scriptUtil.outputErrMsgToConsole("local storage does not exists.");
				return;
			}
			var storage = localStorage;
			mSaveMapData = JSON.parse(storage.getItem(SAVE_NAME));

			if (mSaveMapData === null) {
				scriptUtil.outputErrMsgToConsole("Save Map Data is " + mSaveMapData);
				mSaveMapData = [];
			}
		};

		var removeSaveData = function() {
			var mapDataSize = that.allDataSize();
			var mapPanelSize = mMapPanelList.size();
			mSaveMapData.length = mapDataSize;
			for (var mapPanelIndex = mapDataSize; mapPanelIndex < mapPanelSize; mapPanelIndex += 1) {
				mSaveMapData[mapPanelIndex] = undefined;
				saveMapData();
			}
			for (var i = 0; i < mSaveMapData.length; ++i) {
				if (mSaveMapData[i] !== null) {
					return;
				}
			}
			mSaveMapData = [];
			saveMapData();
		};

		function getGridModeFlag() {
			return mGridModeFlag;
		}

		function toggleGridMode() {
			mGridModeFlag = !mGridModeFlag;
			var currentMapPanel = mMapPanelList.data(mCurrentIndex);

			if (currentMapPanel !== null) {
				currentMapPanel.paintComponent();
				currentMapPanel.drawEditSystemRect();
			}

			var currentPalettePanel = RGPP.System.PalettePanelList.getInstance().currentPalettePanel();

			if (currentPalettePanel !== null) {
				currentPalettePanel.paintComponent();
			}
			return mGridModeFlag;
		}

		function getChipWidth(categoryID, mapDataID) {
			var chipWidth = that.attrValue(categoryID, mapDataID, CHIP_WIDTH_INDEX);
			return chipWidth;
		}

		function getChipHeight(categoryID, mapDataID) {
			var chipHeight = that.attrValue(categoryID, mapDataID, CHIP_HEIGHT_INDEX);
			return chipHeight;
		}

		// Initialize DB
		initDB();

		// create all map panel
		createAllMapPanel();

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);