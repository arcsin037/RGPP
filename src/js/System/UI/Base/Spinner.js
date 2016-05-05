/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "Spinner";
	/**
	 * Spinner
	 * 
	 * @class Spinner
	 * @author arcsin
	 * @constructor
	 * @param spec
	 * @param spec.element {jQuery} jQuery element to select box
	 * @param jquery {$} Global object of jQuery
	 */
	var constructor = function(spec, jquery) {
		spec = spec || {};
		spec.key = spec.key || "<input>";
		
		var that = RGPP.System.UIBase(spec, jquery),
			mInitFlag = false;

		// Set up spinner
		that.setUp = setUp;

		// get value of spinner
		that.getValue = getValue;

		// set value of spinner
		that.setValue = setValue;

		/**
		 * Set up spinner
		 * 
		 * @method setUp
		 * @param param {Object} parameter of spinner
		 * @param param.minValue {Number} minimum value of spinner
		 * @param param.maxValue {Number} maximum value of spinner
		 * @param param.defaultValue {Number} default value of spinner
		 * @param param.stepValue {Number} step value of spinner
		 * @param param.format {String}
		 * * 'n': normal number
		 * * 'C': currency
		 */
		function setUp(param) {
			that.element().spinner({
				min: param.minValue,
				max: param.maxValue,
				step: param.stepValue,
				numberFormat: param.format
			});

			mInitFlag = true;

			setValue(param.defaultValue);
		}

		/**
		 * Set value of spinner
		 * 
		 * @method setValue
		 * @param value {Number} Number to be set in the spinner <br />
		 * If setUp function of this object is not called, ignore this function.
		 */
		function setValue(value) {
			if (mInitFlag && RGPP.isFiniteNumber(value)) {
				that.element().spinner("value", value);
			}
		}

		/**
		 * Get value of spinner
		 * 
		 * @method getValue
		 * @return {Number | undefined} Value of spinner <br />
		 * If setUp function of this object is not called, return undefined.
		 */
		function getValue() {
			if (mInitFlag) {
				return that.element().spinner("value");
			}
			else {
				return undefined;
			}
		}

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);