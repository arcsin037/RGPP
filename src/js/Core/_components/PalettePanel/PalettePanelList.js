/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "PalettePanelList";

	/**
	 * Palette Panel List
	 * @class PalettePanelList
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = RGPP.System.List();
		var mCurrentIndex = 0;
		var mListName = "Palette";

		// Interface
		that.currentPalettePanel = currentPalettePanel;
		that.setCurrentPalettePanel = setCurrentPalettePanel;
		that.panel = panel;
		that.currentPanelCategoryID = currentPanelCategoryID;
		that.currentPanelDataID = currentPanelDataID;
		that.createPalettePanels = createPalettePanels;
		that.palettePanelNames = palettePanelNames;
		that.palettePanelCanvases = palettePanelCanvases;
		that.title = title;
		that.content = content;
		that.listName = listName;
		that.getPanelFromID = getPanelFromID;

		that.currentSelectedChipNo = currentSelectedChipNo;

		function currentPalettePanel() {
			return that.data(mCurrentIndex);
		}

		function setCurrentPalettePanel(index) {
			mCurrentIndex = index;
			RGPP.System.PaletteWindow.getInstance().setTagSpinnerValue();
		}


		function panel(index) {
			return that.data(index);
		}

		function getPanelFromID(categoryID, dataID) {
			var md = RGPP.System.MapChipDataBase.getInstance();
			var dataIndex = md.searchDataIndexFromID(categoryID, dataID);
			return that.data(dataIndex);
		}


		function currentPanelDataID() {
			var md = RGPP.System.MapChipDataBase.getInstance();
			var dataID = md.searchDataIDFromIndex(mCurrentIndex);
			return dataID;
		}

		function currentPanelCategoryID() {
			var md = RGPP.System.MapChipDataBase.getInstance();
			var categoryID = md.searchCategoryIDFromIndex(mCurrentIndex);
			return categoryID;
		}


		function createPalettePanels() {
			that.clear();
			var md = RGPP.System.MapChipDataBase.getInstance();
			var mapChipData = md.allData();
			var mapChipSize = mapChipData.length;
			var nameIndex = md.nameIndex();
			var pathIndex = md.pathIndex();
			var chipWidthIndex = md.chipWidthIndex();
			var chipHeightIndex = md.chipHeightIndex();

			for (var i = 0; i < mapChipSize; ++i) {
				var mapChipName = mapChipData[i].attrValue(nameIndex);
				var mapChipFileName = RGPP.Config.USER_IMAGE_DIRECTORY_PATH + mapChipData[i].attrValue(pathIndex);
				var categoryID = md.searchCategoryIDFromIndex(i);
				var dataID = md.searchDataIDFromIndex(i);
				var chipWidth = mapChipData[i].attrValue(chipWidthIndex);
				var chipHeight = mapChipData[i].attrValue(chipHeightIndex);

				createPalettePanel({
					categoryID: categoryID,
					dataID: dataID,
					paletteName: mapChipName,
					palettePathName: mapChipFileName,
					chipWidth: chipWidth,
					chipHeight: chipHeight,
				});

			}
		}

		var createPalettePanel = function(arg, index) {
			var palettePanel = RGPP.System.PalettePanel(arg);
			if (index === undefined) {
				that.push(palettePanel);
			}
			else {
				that.insert(index, palettePanel);
			}
		};

		function currentSelectedChipNo() {
			var currentPalettePanel = that.data(mCurrentIndex);
			if (currentPalettePanel === null) {
				return -1;
			}
			var currentSelectedMapChipNo = that.data(mCurrentIndex).selectedMapChipNo();
			return currentSelectedMapChipNo;
		}

		function palettePanelNames() {
			var n = that.size();
			var array = [n];
			for (var i = 0; i < n; ++i) {
				array[i] = that.data(i).paletteName();
			}
			return array;
		}


		function palettePanelCanvases() {
			var n = that.size();
			var array = [n];
			for (var i = 0; i < n; ++i) {
				array[i] = that.data(i).canvas();
			}
			return array;
		}

		function title(index) {
			return that.data(index).paletteName();
		}

		function content(index) {
			return that.data(index).canvas();
		}

		function listName() {
			return mListName;
		}

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);