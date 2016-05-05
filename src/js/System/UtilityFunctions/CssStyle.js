/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "CssStyle";

	/**
	 * CSS Style Script
	 * @class CSS Style Script
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		// Setting of pixel size(px)
		that.setPixelSize = setPixelSize;

		// Setting of resolution(px)
		that.setResolution = setResolution;

		// Setting of percent(%) size
		that.setPercentSize = setPercentSize;

		// Set the backgroud color
		that.setBgColor = setBgColor;

		// Set to fixed center position
		that.setFixedCenterPosition = setFixedCenterPosition;

		// Set to fixed lower right position
		that.setFixedLowerRightPosition = setFixedLowerRightPosition;

		// Set to fixed top position
		that.setFixedTopPosition = setFixedTopPosition;

		// Set to relative center position
		that.setRelativeCenterPosition = setRelativeCenterPosition;

		// Set top margin of element
		that.setTopMargin = setTopMargin;

		// Set padding of element
		that.setPadding = setPadding;

		// Set font of element
		that.setFont = setFont;

		// Set font color of element
		that.setFontColor = setFontColor;

		// Centering text
		that.centeringText = centeringText;

		// Set to scroll element
		that.setScroll = setScroll;

		// Set to hide the overflow element
		that.setOverFlowHidden = setOverFlowHidden;

		// Set the css of the list panel
		that.setListPanel = setListPanel;

		// Set to a breaking element
		that.setBreaking = setBreaking;

		// Set to a non-breaking element
		that.setNonBreaking = setNonBreaking;

		/**
		 * Setting of pixel size(px)
		 * @method setPixelSize
		 * @param element element to be set 
		 * @param {number} aWidth width(px) of element
		 * @param {number} aHeight height(px) of element
		 */
		function setPixelSize(element, aWidth, aHeight) {
			$(element).css('width', aWidth + "px");
			$(element).css('height', aHeight + "px");
		}

		/**
		 * Setting of resolution(px)
		 * @method setResolution
		 * @param element element to be set 
		 * @param {number} resolutionX resolution x of element
		 * @param {number} resolutionY resolution y of element
		 */
		function setResolution(element, resolutionX, resolutionY) {
			element.width = resolutionX;
			element.height = resolutionY;
		}

		/**
		 * Setting of percent(%) size
		 * @method setPercentSize
		 * @param element element to be set 
		 * @param {number} percentWidth width(%)
		 * @param {number} percentHeight height(%)
		 */
		function setPercentSize(element, percentWidth, percentHeight) {
			$(element).css('width', percentWidth + "%");
			$(element).css('height', percentHeight + "%");
		}

		/**
		 * Set to fixed center position
		 * @method setFixedCenterPosition
		 * @param element element to be set 
		 */
		function setFixedCenterPosition(element) {
			$(element).addClass("fixed_center");
		}

		/**
		 * Set to fixed lower right position
		 * @method setFixedLowerRightPosition
		 * @param element element to be set 
		 */
		function setFixedLowerRightPosition(element) {
			$(element).addClass("fixed_lower_right");
		}

		/**
		 * Set to fixed top position
		 * @method setFixedTopPosition
		 * @param element element to be set 
		 */
		function setFixedTopPosition(element) {
			$(element).addClass("fixed_top");
		}

		/**
		 * Set to relative center position
		 * @method setRelativeCenterPosition
		 * @param element element to be set 
		 */
		function setRelativeCenterPosition(element) {
			$(element).addClass("relative_center_position");
		}

		/**
		 * Set the backgroud color
		 * @method setBgColor
		 * @param element element to be set 
		 * @param {string} color RGB color
		 * @param {number} alpha alpha(opacity:0.0~1.0) color 
		 */
		function setBgColor(element, color, alpha) {
			var style = element.style;
			$(element).css('backgroundColor', color);

			if (alpha !== undefined) {
				// IE6.0, IE7.0  
				style.filter = 'alpha(opacity=' + (alpha * 100) + ')';
				// Firefox, Netscape  
				style.MozOpacity = alpha;
				// Chrome, Safari, Opera  
				style.opacity = alpha;
				$(element).css('opacity', alpha);
			}
			style.visible = "true";
		}

		/**
		 * Set top margin of element
		 * @method setTopMargin
		 * @param element element to be set 
		 * @param {number} top top margin(px) 
		 */
		function setTopMargin(element, top) {
			$(element).css('top', top + "px");
		}

		/**
		 * Set padding of element
		 * @method setPadding
		 * @param element element to be set 
		 * @param {number} top top margin(px) 
		 * @param {number} bottom bottom margin(px) 
		 * @param {number} left left margin(px) 
		 * @param {number} right right margin(px) 
		 */
		function setPadding(element, top, bottom, left, right) {
			$(element).css({
				'padding-top': top + "px",
				'padding-bottom': bottom + "px",
				'padding-left': left + "px",
				'padding-right': right + "px",
			});
		}

		/**
		 * Set font of element
		 * @method setFont
		 * @param element element to be set 
		 * @param {string} fontFamily font family 
		 * @param {string} fontSize  
		 */
		function setFont(element, fontFamily, fontSize) {
			$(element).css({
				'font-family': fontFamily,
				'font-size': fontSize
			});
		}

		/**
		 * Set font color of element
		 * @method setFontColor
		 * @param element element to be set 
		 * @param {string} color RGB color
		 */
		function setFontColor(element, color) {
			$(element).css('color', color);
		}

		/**
		 * Centering text
		 * @method centeringText
		 * @param element element to be set 
		 */
		function centeringText(element) {
			$(element).css({
				"text-align": "center",
			});
		}

		/**
		 * Set to scroll element
		 * @method setScroll
		 * @param element element to be set 
		 */
		function setScroll(element) {
			$(element).css({
				"overflow": "auto"
			});
		}

		/**
		 * Set to hide the overflow element
		 * @method setOverFlowHidden
		 * @param element element to be set 
		 */
		function setOverFlowHidden(element) {
			$(element).css({
				"overflow": "hidden"
			});
		}

		/**
		 * Set the css of the list panel
		 * @method setListPanel
		 * @param element element to be set 
		 */
		function setListPanel(element) {
			$(element).addClass("list_panel");
		}

		/**
		 * Set to a non-breaking element
		 * @method setNonBreaking
		 * @param element element to be set 
		 */
		function setNonBreaking(element) {
			$(element).addClass("non_breaking");
		}

		/**
		 * Set to a breaking element
		 * @method setBreaking
		 * @param element element to be set 
		 */
		function setBreaking(element) {
			$(element).addClass("breaking");
		}

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);