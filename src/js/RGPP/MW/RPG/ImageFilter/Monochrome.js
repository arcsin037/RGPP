/**
 * Middle-ware module
 * @module MW
 * @namespace RGPP.MW
 */

(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "Monochrome";

	/**
	 * Monochrome
	 * @class Monochrome
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		spec = spec || {};
		var monochromeFilter = function(r, g, b, a) {
			return 0.299 * r + 0.587 * g + 0.114 * b;
		};

		spec.filterR = monochromeFilter;
		spec.filterG = monochromeFilter;
		spec.filterB = monochromeFilter;

		var that = RGPP.System.ImageFilter(spec);

		return that;
	};

	RGPP.MW.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
