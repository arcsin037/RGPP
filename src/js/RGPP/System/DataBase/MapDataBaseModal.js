/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "MapDataBaseModal";

	/**
	 * Map Data Base Modal
	 * @class MapDataBaseModal
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var system = RGPP.System;
		var mDB = system.MapPanelList.getInstance();
		var that = system.DBModal({
			dbName: "Map",
			db: mDB,
			updateFunc: spec.updateFunc,
			type: ["other", "spinner", "spinner", "spinner", "spinner", "other"],
			minValues: [0, 1, 1, 0]
		});

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);