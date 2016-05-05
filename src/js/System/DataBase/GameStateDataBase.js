/*
 * Game State DB
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "GameStateDataBase";
	var constructor = function() {
		var ATTR_NUM = 2;

		var NAME_INDEX = 0;
		var VALUE_INDEX = 1;

		var that = RGPP.System.DataBase({
			dbName: "GameStateDB",
			attrSize: ATTR_NUM
		});

		function initialize() {

			var attrStringArray = [ATTR_NUM];
			attrStringArray[NAME_INDEX] = "State Name ";
			attrStringArray[VALUE_INDEX] = "Value";

			that.setAttrString(attrStringArray);

			var defaultAttrValueArray = [ATTR_NUM];
			defaultAttrValueArray[NAME_INDEX] = "State";
			defaultAttrValueArray[VALUE_INDEX] = 0;

			that.setDefaultAttrValue(defaultAttrValueArray);

			var correctedAttrValueArray = [ATTR_NUM];

			correctedAttrValueArray[NAME_INDEX] = "State";
			correctedAttrValueArray[VALUE_INDEX] = 0;
			that.setCorrectedAttrValue(correctedAttrValueArray);
			that.load();

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