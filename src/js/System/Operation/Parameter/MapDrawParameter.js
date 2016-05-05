/**
 * Drawing Parameter. For Using undo and redo.
 * 
 * @namespace RGPP.System
 * @class MapDrawParameter
 * @author arcsin
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "MapDrawParameter";

	var constructor = function(spec) {
		var that = {};
		// Position of Map X.
		var mX = spec.x;
		// Position of Map Y. 
		var mY = spec.y;
		// Chip set Category ID array.
		var mChipSetCategoryIDArray = spec.chipSetCategoryIDs;

		// Chip set ID array.
		var mChipSetIDArray = spec.chipSetDataIDs;
		// changing Map Number Array. 
		var mChipSetNoArray = spec.chipSetNos;

		that.getX = getX;
		that.getY = getY;
		that.chipSetCategoryIDArray = chipSetCategoryIDArray;
		that.chipSetDataIDArray = chipSetDataIDArray;
		that.chipSetNoArray = chipSetNoArray;

		function getX() {
			return mX;
		}

		function getY() {
			return mY;
		}

		function chipSetCategoryIDArray() {
			return mChipSetCategoryIDArray;
		}

		function chipSetDataIDArray() {
			return mChipSetIDArray;
		}

		function chipSetNoArray() {
			return mChipSetNoArray;
		}

		return that;
	};

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);