/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "ScreenInfo";

	/**
	 * Screen infomation
	 * @class ScreenInfo 
	 * @author arcsin
	 */
	var constructor = function() {
		var that = {};

		/**
		 * Dot / inch of a screen
		 * @property mDpi
		 * @type {Number}
		 * @private
		 */
		var mDpi = 96.0;

		that.ptToPixel = ptToPixel;

		/**
		 * Convert pt to pixel
		 * @method ptToPixel
		 * @param pt {Number} Point of word size
		 * @return {Number} pixel value converted by pt
		 */
		function ptToPixel(pt) {
			var dpi = mDpi;
			var pixel = Math.round(pt * dpi / 72.0);
			return pixel;
		}

		/**
		 * Calculate dot / inch (DPI)
		 * @method calcDPI
		 * @private
		 */
		var calcDPI = function() {
			var dpi = mDpi;
			var div = document.createElement('div');
			div.setAttribute('style', 'height:1in;left:-100%;top:-100%;position:absolute;width:1in;');
			document.body.appendChild(div);
			dpi = div.offsetHeight;
			document.body.removeChild(div);
			div = null;
			mDpi = dpi;
		};

		// initialize dpi
		calcDPI();

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
