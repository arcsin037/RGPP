/**
 * Middle-ware module
 * @module MW
 * @namespace RGPP.MW
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "Sepia";
	/**
	 * Sepia filter
	 * 
	 * @class Sepia
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		spec = spec || {};

		var monochromeFilter = function(r, g, b, a) {
			return 0.299 * r + 0.587 * g + 0.114 * b;
		};

		spec.filterR = function(r, g, b, a) {
			return monochromeFilter(r, g, b, a) * 0.9;
		};

		spec.filterG = function(r, g, b, a) {
			return monochromeFilter(r, g, b, a) * 0.7;
		};

		spec.filterB = function(r, g, b, a) {
			return monochromeFilter(r, g, b, a) * 0.4;
		};

		var that = RGPP.System.ImageFilter(spec);

		return that;
	};
	RGPP.MW.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});
})((this || 0).self || global);
