/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "TaskList";
	/**
	 * TaskList
	 * 
     * @class TaskList
     * @author arcsin
     * @constructor
	 */
	var constructor = function() {
		var ATTR_NUM = 3;

		var DONE_INDEX = 0;
		var DATE_LINE_INDEX = 1;
		var DESCRIPTION_INDEX = 2;

		var that = RGPP.System.DataBase({
			dbName: "TaskListDB",
			attrSize: ATTR_NUM
		});

		// Interface
		that.createObj = createObj;
		that.doneIndex = doneIndex;
		that.dateIndex = dateIndex;
		that.descriptionIndex = descriptionIndex;

		function initialize() {
			var attrStringArray = [ATTR_NUM];
			attrStringArray[DONE_INDEX] = "Done";
			attrStringArray[DATE_LINE_INDEX] = "Date";
			attrStringArray[DESCRIPTION_INDEX] = "Task";

			that.setAttrString(attrStringArray);

			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();

			var dateString = [year, month, day].join('/');

			var defaultAttrValueArray = [ATTR_NUM];
			defaultAttrValueArray[DONE_INDEX] = false;
			defaultAttrValueArray[DATE_LINE_INDEX] = dateString;
			defaultAttrValueArray[DESCRIPTION_INDEX] = "Task";

			that.setDefaultAttrValue(defaultAttrValueArray);

			var correctedAttrValueArray = [ATTR_NUM];

			correctedAttrValueArray[DONE_INDEX] = false;
			correctedAttrValueArray[DATE_LINE_INDEX] = dateString;
			correctedAttrValueArray[DESCRIPTION_INDEX] = "Task";
			that.setCorrectedAttrValue(correctedAttrValueArray);
			that.load();
		}

		function createObj(categoryID, dataID) {}

		function doneIndex() {
			return DONE_INDEX;
		}

		function dateIndex() {
			return DATE_LINE_INDEX;
		}

		function descriptionIndex() {
			return DESCRIPTION_INDEX;
		}

		initialize();
		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});


})((this || 0).self || global);