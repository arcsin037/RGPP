(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "MapLayer";

	var constructor = function(spec) {
		var that = {};
		var mCol = spec.col;
		var mRow = spec.row;
		var mChipSetCategoryIDArray = [];
		var mChipSetDataIDArray = [];
		var mChipSetNoArray = [];
		var NOTHING = -1;
		var OUT_OF_BOUNDS = -2;

		// Interface
		that.setData = setData;
		that.chipSetID = chipSetDataID;
		that.chipSetNo = chipSetNo;
		that.chipSetCategoryID = chipSetCategoryID;
		
		that.getChipSetCategoryIDArray = getChipSetCategoryIDArray;
		that.getChipSetIDArray = getChipSetIDArray;
		that.getChipSetNoArray = getChipSetNoArray;

		// Implementation
		var initialize = function() {
			for (var y = 0; y < mRow; ++y) {
				mChipSetCategoryIDArray[y] = [];
				mChipSetDataIDArray[y] = [];
				mChipSetNoArray[y] = [];
				for (var x = 0; x < mCol; ++x) {
					mChipSetCategoryIDArray[y][x] = NOTHING;
					mChipSetDataIDArray[y][x] = NOTHING;
					mChipSetNoArray[y][x] = NOTHING;
				}
			}
		};

		function setData(x, y, chipSetCategoryID, chipSetDataID, chipSetNo) {
			if (x >= 0 && x < mCol && y >= 0 && y < mRow) {
				mChipSetCategoryIDArray[y][x] = chipSetCategoryID;
				mChipSetDataIDArray[y][x] = chipSetDataID;
				mChipSetNoArray[y][x] = chipSetNo;
			}
		}
		
		function chipSetCategoryID(x, y) {
			if (x < 0 || x >= mCol || y < 0 || y >= mRow) {
				return OUT_OF_BOUNDS;
			}
			return mChipSetCategoryIDArray[y][x];
		}

		function chipSetDataID(x, y) {
			if (x < 0 || x >= mCol || y < 0 || y >= mRow) {
				return OUT_OF_BOUNDS;
			}
			return mChipSetDataIDArray[y][x];
		}

		function chipSetNo(x, y) {
			if (x < 0 || x >= mCol || y < 0 || y >= mRow) {
				return OUT_OF_BOUNDS;
			}
			return mChipSetNoArray[y][x];
		}

		function getChipSetCategoryIDArray(x, y, pSpecifyRangeX, pSpecifyRangeY) {
			var absPaletteSpecifyRangeX = Math.abs(pSpecifyRangeX);
			var absPaletteSpecifyRangeY = Math.abs(pSpecifyRangeY);
			var ret = [absPaletteSpecifyRangeY];

			for (var i = 0; i < absPaletteSpecifyRangeY; ++i) {
				ret[i] = [absPaletteSpecifyRangeX];
				for (var j = 0; j < absPaletteSpecifyRangeX; ++j) {
					var dstX = j + x;
					var dstY = i + y;
					if (0 <= dstX && dstX < mCol && 0 <= dstY && dstY < mRow) {
						ret[i][j] = mChipSetCategoryIDArray[dstY][dstX];
					}
					else {
						ret[i][j] = OUT_OF_BOUNDS;
					}
				}
			}
			return ret;
		}

		function getChipSetIDArray(x, y, pSpecifyRangeX, pSpecifyRangeY) {
			var absPaletteSpecifyRangeX = Math.abs(pSpecifyRangeX);
			var absPaletteSpecifyRangeY = Math.abs(pSpecifyRangeY);
			var ret = [absPaletteSpecifyRangeY];

			for (var i = 0; i < absPaletteSpecifyRangeY; ++i) {
				ret[i] = [absPaletteSpecifyRangeX];
				for (var j = 0; j < absPaletteSpecifyRangeX; ++j) {
					var dstX = j + x;
					var dstY = i + y;
					if (0 <= dstX && dstX < mCol && 0 <= dstY && dstY < mRow) {
						ret[i][j] = mChipSetDataIDArray[dstY][dstX];
					}
					else {
						ret[i][j] = OUT_OF_BOUNDS;
					}
				}
			}
			return ret;
		}

		function getChipSetNoArray(x, y, pSpecifyRangeX, pSpecifyRangeY) {
			var absPaletteSpecifyRangeX = Math.abs(pSpecifyRangeX);
			var absPaletteSpecifyRangeY = Math.abs(pSpecifyRangeY);

			var ret = [absPaletteSpecifyRangeY];

			for (var i = 0; i < absPaletteSpecifyRangeY; ++i) {
				ret[i] = [absPaletteSpecifyRangeX];
				for (var j = 0; j < absPaletteSpecifyRangeX; ++j) {
					var dstX = j + x;
					var dstY = i + y;
					if (0 <= dstX && dstX < mCol && 0 <= dstY && dstY < mRow) {
						ret[i][j] = mChipSetNoArray[dstY][dstX];
					}
					else {
						ret[i][j] = OUT_OF_BOUNDS;
					}
				}
			}
			return ret;

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