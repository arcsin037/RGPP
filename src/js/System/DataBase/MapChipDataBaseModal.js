/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "MapChipDataBaseModal";
	/**
	 * Map Chip Data Base Modal
	 * @class MapChipDataBaseModal
	 * @author arcsin
	 * @constructor
	 */

	var constructor = function(spec) {
		var system = RGPP.System;
		var mDB = system.MapChipDataBase.getInstance();
		var that = system.DBModal({
			dbName: "Map",
			db: mDB,
			updateFunc: spec.updateFunc,
			type: ["other", "other", "spinner", "spinner", "other"],
		});
		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);