/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "ReadOnlyDataBaseModal";

	/**
	 * Read Only Data Base Modal
	 * @class ReadOnlyDataBaseModal
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var system = RGPP.System;
		var mDB = system.ReadOnlyDataBase.getInstance();
		var that = system.DBModal({
			dbName: "Read Only",
			db: mDB,
			updateFunc: spec.updateFunc,
		});

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);