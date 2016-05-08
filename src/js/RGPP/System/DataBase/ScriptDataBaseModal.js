/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "ScriptDataBaseModal";
	/**
	 * Script Data Base Modal
	 * @class ScriptDataBaseModal
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var system = RGPP.System;
		var mDB = system.ScriptDataBase.getInstance();
		var that = system.DBModal({
			dbName: "Script",
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
