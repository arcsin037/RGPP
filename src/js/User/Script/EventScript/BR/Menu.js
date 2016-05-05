/**
 * User module
 * @module User
 * @namespace RGPP.User
 */
(function(global) {
	/* global RGPP */
	"use strict";


	var objName = "Menu";

	var mOptions = RGPP.System.Strings({
		name: "option",
		size: 2,
	});

	/**
	 * Menu
	 * 
	 * @class Menu
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var that = RGPP.MW.Choices();

		that.onLoadMap = onLoadMap;
		that.loadChangeableValuesPerScript = loadChangeableValuesPerScript;
		that.update = update;
		that.draw = draw;

		function onLoadMap(event) {
			that.setOption(mOptions);
			that.initialize(event);
		}

		function loadChangeableValuesPerScript() {
			var changeableValues = [];
			mOptions.loadChangeableValues(changeableValues);
			return changeableValues;
		}

		function update(event) {
			that.updateChoices();
			var cm = RGPP.System.ControlManager.getInstance();
			if (cm.isLeftClick()) {
				var selectedIndex = that.selectedIndex();
				if (selectedIndex === 0) {
					console.log("調査");
				}
				else if (selectedIndex === 1) {
					console.log("休息");
				}
				else {
					that.close();
				}
			}

		}

		function draw(ctx) {
			that.drawChoices(ctx);
		}

		return that;
	};

	RGPP.User.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});
})((this || 0).self || global);