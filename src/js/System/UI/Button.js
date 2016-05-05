/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "Button";

	/**
	 * Button UI
	 * @class ButtonUI
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(buttonElement) {
		var that = {};

		// Get element
		that.element = element;

		// Change icon
		that.changeIcon = changeIcon;

		that.setAttr = setAttr;
		that.addClass = addClass;

		var mButton = $("<button>");
		$(mButton).append(buttonElement);

		/**
		 * Get element
		 * @method element
		 */
		function element() {
			return mButton;
		}

		/**
		 * Change Icon
		 * @method changeIcon
		 * @param iconElement icon element
		 */
		function changeIcon(iconElement) {
			$(mButton).empty();
			$(mButton).append(iconElement);
		}

		/**
		 * Set Attribute
		 * @method setAttr
		 * @param {string} attrName attribute name
		 * @param attrValue attribute value
		 */
		function setAttr(attrName, attrValue) {
			$(mButton).attr(attrName, attrValue);
		}

		/**
		 * Add class to button element
		 * @method addClass
		 * @param objName class name
		 */
		function addClass(objName) {
			$(mButton).addClass(objName);
		}

		return that;
	};


	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);