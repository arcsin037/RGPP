/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "PaletteWindow";
	/**
	 * Window of Palette
	 * @class PaletteWindow
	 * @author arcsin
	 * @constructor
	 * @param spec {Object}
	 * @param spec.$element {jQuery} jQuery element to palette window
	 */
	var constructor = function(spec) {
		var that = {};

		// Interface
		that.openFunc = openFunc;
		that.closeFunc = closeFunc;





		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
