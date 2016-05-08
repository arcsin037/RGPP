/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "CoordinateSystem";

	/**
	 * Coordinate System operator
	 * @class Coordinate System operator 
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var that = {};

		var mScrollX = 0;
		var mScrollY = 0;

		that.setScrollXY = setScrollXY;
		that.getScrollX = getScrollX;
		that.getScrollY = getScrollY;

		that.convertMapToScreenX = convertMapToScreenX;
		that.convertMapToScreenY = convertMapToScreenY;
		that.convertScreenToMapX = convertScreenToMapX;
		that.convertScreenToMapY = convertScreenToMapY;

		function setScrollXY(x, y) {
			mScrollX = x;
			mScrollY = y;
		}

		function getScrollX() {
			return mScrollX;
		}

		function getScrollY() {
			return mScrollY;
		}

		function convertMapToScreenX(x) {
			return x + mScrollX;
		}

		function convertMapToScreenY(y) {
			return y + mScrollY;
		}

		function convertScreenToMapX(x) {
			return x - mScrollX;
		}

		function convertScreenToMapY(y) {
			return y - mScrollY;
		}

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);