/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "UIBase";
	/**
	 * Base of UI
	 * 
	 * @class UIBase
	 * @author arcsin
	 * @constructor
	 * @param {Object} spec
	 * @param spec.key {String} jQuery key of DOM object
	 * @param spec.$element {jQuery} jQuery element
	 * @param jquery {$} Global object of jQuery
	 */
	var constructor = function(spec, jquery) {
		spec = spec || {};
		jquery = jquery || $;

		var that = {},
			mElement = spec.$element || (spec.key && jquery(spec.key));

		// Get jQuery element
		that.element = element;
		
		/**
		 * Get jQuery element
		 * @method element
		 * @return {jQuery | undefined} jQuery element. <br />
		 * If the spec.$element and spec.$key are not defined on constructor, return undefined
		 */
		function element() {
			return mElement;
		}
		
		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);