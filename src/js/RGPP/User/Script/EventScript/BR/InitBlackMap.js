(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "InitBlackMap";

	var BLACK_CHIP_SET = RGPP.System.ChipSet({
		name: "Black",
		chipSetCategoryID: 0,
		chipSetID: 0,
		chipSetNo: 0,
	});

	var constructor = function(spec, my) {
		var that;

		my = my || {};


		var LAYER_2 = 1;

		that = RGPP.System.Script();
		that.onLoadGame = initialize;
		that.onLoadMap = initialize;
		that.loadChangeableValuesPerScript = loadChangeableValuesPerScript;

		function initialize(event) {
			var mapManager = RGPP.System.MapManager.getInstance();


			var width = RGPP.System.MapPanelList.getInstance().currentMapPanel().column();
			var height = RGPP.System.MapPanelList.getInstance().currentMapPanel().row();
			var blackCategoryIDArray = [];
			var blackChipSetIDArray = [];
			var blackChipSetNoArray = [];
			for (var y = 0; y < height; y += 1) {
				blackCategoryIDArray[y] = [];
				blackChipSetIDArray[y] = [];
				blackChipSetNoArray[y] = [];
				for (var x = 0; x < width; x += 1) {
					blackCategoryIDArray[y][x] = BLACK_CHIP_SET.categoryID();
					blackChipSetIDArray[y][x] = BLACK_CHIP_SET.id();
					blackChipSetNoArray[y][x] = BLACK_CHIP_SET.no();
				}
			}

			mapManager.setMapChipArray(LAYER_2, 0, 0, blackCategoryIDArray, blackCategoryIDArray, blackCategoryIDArray);
		}

		function loadChangeableValuesPerScript() {
			var changeableValues = [];
			BLACK_CHIP_SET.loadChangeableValues(changeableValues);
			return changeableValues;
		}

		return that;
	};


	RGPP.User.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});
})((this || 0).self || global);
