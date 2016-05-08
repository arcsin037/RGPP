/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "SoundDataBaseModal";

	/**
	 * Sound Data Base Modal
	 * @class SoundDataBaseModal
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var system = RGPP.System;
		var mDB = system.SoundDataBase.getInstance();
		var that = system.DBModal({
			dbName: "Sound",
			db: mDB,
			updateFunc: spec.updateFunc,
			type: ["other", "other", "selectMenu"],
			elements: [
				[],
				[],
				["SE", "BGM"]
			]
		});

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);