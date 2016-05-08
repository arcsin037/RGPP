/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "DeadlineList";
	/**
	 * Deadline List
	 * @class DeadlineList
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var ATTR_NUM = 2;

		var DEAD_LINE_INDEX = 0;
		var DESCRIPTION_INDEX = 1;

		var that = RGPP.System.DataBase({
			dbName: "DeadLineListDB",
			attrSize: ATTR_NUM
		});

		// Interface
		that.createObj = createObj;
		that.deadlineIndex = deadlineIndex;
		that.descriptionIndex = descriptionIndex;

		function initialize() {
			var attrStringArray = [ATTR_NUM];
			attrStringArray[DEAD_LINE_INDEX] = "Date of Deadline";
			attrStringArray[DESCRIPTION_INDEX] = "Deadline Event";

			that.setAttrString(attrStringArray);

			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();

			var dateString = [year, month, day].join('/');

			var defaultAttrValueArray = [ATTR_NUM];
			defaultAttrValueArray[DEAD_LINE_INDEX] = dateString;
			defaultAttrValueArray[DESCRIPTION_INDEX] = "Deadline Event";

			that.setDefaultAttrValue(defaultAttrValueArray);

			var correctedAttrValueArray = [ATTR_NUM];

			correctedAttrValueArray[DEAD_LINE_INDEX] = dateString;
			correctedAttrValueArray[DESCRIPTION_INDEX] = "Deadline Event";
			that.setCorrectedAttrValue(correctedAttrValueArray);
			that.load();
		}

		function createObj(categoryID, dataID) {}

		function deadlineIndex() {
			return DEAD_LINE_INDEX;
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