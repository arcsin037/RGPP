(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "ColorRGBA";
	// Class
	var constructor = function(spec) {
		var that = {};

		var mRed = RGPP.System.ChangeableValue({
			name: spec.name + " R",
			minValue: 0,
			maxValue: 255,
			defaultValue: spec.r,
			type: "spinner",
		});

		var mGreen = RGPP.System.ChangeableValue({
			name: spec.name + " G",
			minValue: 0,
			maxValue: 255,
			defaultValue: spec.g,
			type: "spinner",
		});

		var mBlue = RGPP.System.ChangeableValue({
			name: spec.name + " B",
			minValue: 0,
			maxValue: 255,
			defaultValue: spec.b,
			type: "spinner",
		});

		var mAlpha = RGPP.System.ChangeableValue({
			name: spec.name + " A",
			minValue: 0,
			maxValue: 1,
			stepValue: 0.01,
			defaultValue: spec.a,
			type: "spinner",
		});

		that.r = getRed;
		that.g = getGreen;
		that.b = getBlue;
		that.a = getAlpha;

		that.loadChangeableValues = loadChangeableValues;

		function loadChangeableValues(changeableValues) {
			changeableValues.push(mRed);
			changeableValues.push(mGreen);
			changeableValues.push(mBlue);
			changeableValues.push(mAlpha);
		}


		function getRed() {
			return mRed.value();
		}

		function getGreen() {
			return mGreen.value();
		}

		function getBlue() {
			return mBlue.value();
		}

		function getAlpha() {
			return mAlpha.value();
		}


		return that;
	};

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);