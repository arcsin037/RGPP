/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "TaskListModal";
	/**
	 * Task List Modal
	 * @class TaskListModal
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var system = RGPP.System;
		var mDB = system.TaskList.getInstance();
		var that = system.DBModal({
			dbName: "Task",
			db: mDB,
			updateFunc: spec.updateFunc,
			type: ["checkBox", "date", "other"],
		});

		return that;
	};
	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
