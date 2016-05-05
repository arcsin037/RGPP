/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "SelectBox";
	/**
	 * Select Box
	 * 
	 * @class SelectBox
	 * @author arcsin
	 * @constructor
	 * @param spec
	 * @param spec.element {jQuery} jQuery element to select box
	 * @param spec.updateFunc {Function} change function of select box
	 * @param jquery {$} Global object of jQuery
	 */
	var constructor = function(spec, jquery) {
		spec = spec || {};
		spec.key = spec.key || "<select>";
		
		var that = RGPP.System.UIBase(spec, jquery);

		// Get selected index of select box
		that.selectedIndex = selectedIndex;
		// Get selected value
		that.selectedValue = selectedValue;
		
		// private variable
		var mSelectedIndex = 0,
			mUpdateFunc = spec.updateFunc,
			// msDropDown
			mHandler = that.element().msDropDown && that.element().msDropDown({
				on: {
					change: updateFunc_,
				}
			}).data("dd");


		/**
		 * Get selected index of select box
		 * 
		 * @method selectedIndex
		 * @return {Number} selected index
		 */
		function selectedIndex() {
			return mSelectedIndex;
		}
		
		/**
		 * Get selected value of select box
		 * 
		 * @method selectedValue
		 * @return {String} selected value
		 */
		function selectedValue() {
			var val = mHandler.getData().data.value;
			return val;
		}
		
		
		/**
		 * Function to be called when the selected value is changed 
		 * @method updateFunc_
		 * @private
		 */ 
		var updateFunc_ = function() {
			mSelectedIndex = mHandler.selectedIndex;
			if ( RGPP.isDefined(mUpdateFunc) ) {
				mUpdateFunc(mSelectedIndex);
			}
		};

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);