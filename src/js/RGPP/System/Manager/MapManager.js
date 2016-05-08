/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "MapManager";

	/**
	 * Map Manager
	 * @class Template
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		// Getter
		that.chipWidth = getChipWidth;
		that.chipHeight = getChipHeight;

		// Map Chip Operator
		that.inRangeMapTagFromPixelCoord = inRangeMapTagFromPixelCoord;
		that.setMapChipArray = setMapChipArray;
		that.changeMap = changeMap;

		// Private variable
		var NOTHING = -1;

		/** 
		 * Return Map Tag
		 * @method inRangeMapTagFromPixelCoord
		 * @param x {Number} Map Coordinate (Pixel)
		 * @param y {Number} Map Coordinate (Pixel)
		 * @param width {Number} Map Coordinate (Pixel)
		 * @param hegiht {Number} Map Coordinate (Pixel)
		 */
		function inRangeMapTagFromPixelCoord(ax, ay, width, height) {
			var chipWidth = getChipWidth();
			var chipHeight = getChipHeight();
			var chipLeftX = Math.floor(ax / chipWidth);
			var chipTopY = Math.floor(ay / chipHeight);
			var tagWidth = Math.floor(width / chipWidth);
			var tagHeight = Math.floor(height / chipHeight);
			var mapTags = [tagHeight];
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel !== null) {
				for (var y = 0; y < tagHeight; y += 1) {
					mapTags[y] = [tagWidth];
					for (var x = 0; x < tagWidth; x += 1) {
						mapTags[y][x] = currentMapPanel.getTagData(chipLeftX + x, chipTopY + y);
					}
				}
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputMsgToConsole(mapTags);
				return mapTags;
			}
			return null;
		}

		function setMapChipArray(layerNo, x, y, chipSetCategoryIDArray, chipSetIDArray, chipSetNoArray) {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			currentMapPanel.setMapChipArraySpecificLayer(layerNo, x, y, chipSetCategoryIDArray, chipSetIDArray, chipSetNoArray);
		}

		function getChipWidth() {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel !== null) {
				return currentMapPanel.chipWidth();
			}
			return null;
		}

		function getChipHeight() {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel !== null) {
				return currentMapPanel.chipHeight();
			}
			return null;
		}

		function changeMap(categoryID, mapID) {
			RGPP.System.ListTabMapPanel.getInstance().changeMap(categoryID, mapID);
		}

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});


})((this || 0).self || global);