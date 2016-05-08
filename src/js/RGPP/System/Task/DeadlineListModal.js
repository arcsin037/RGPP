/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "DeadlineListModal";

	/**
	 * Dead Line List Modal
	 * @class DeadlineListModal
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var system = RGPP.System;
		var mDB = system.DeadlineList.getInstance();
		var that = system.DBModal({
			dbName: "Deadline",
			db: mDB,
			updateFunc: spec.updateFunc,
			type: ["date", "other"],
		});
		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
