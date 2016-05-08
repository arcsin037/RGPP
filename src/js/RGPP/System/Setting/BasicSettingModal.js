/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "BasicSettingModal";

	/**
	 * Base Setting Modal
	 * @class BaseSettingModal
	 * @constructor
	 * @author arcsin
	 */
	var constructor = function(spec) {
		// Modal Body
		var mModalBody = $("<div>");

		// creating new modal
		var that = RGPP.System.Modal({
			title: "Base Setting",
			bodyElement: mModalBody,
			footerButton: "save",
			approveFunc: approvedFunc
		});

		// Function to call when opening the modal 
		that.openFunc = openFunc;

		// Function to call when closing the modal 
		that.closeFunc = closeFunc;

		/**
		 * Function to be called when the user has approved the basic setting
		 * @method approvedFunc
		 */
		function approvedFunc() {
			if (!isCorrectInputValue_()) { //Not correct input value
				return;
			}

			// Set Game Name
			RGPP.Config.GAME_NAME = mGameNameInput.value();

			// Set Resolution
			RGPP.Config.RESOLUTION_X = mResolutionXSpinner.value();
			RGPP.Config.RESOLUTION_Y = mResolutionYSpinner.value();

			// Font
			var font = mFontInput.value();
			var fontSize = mFontSizeInput.value();

			// Set default font
			RGPP.Config.DEFAULT_FONT = fontSize + " " + font;

			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			scriptUtil.outputMsgToConsole(RGPP.Config.DEFAULT_FONT);

			// update modal
			spec.updateFunc();

			that.hide();
		}

		/**
		 * Function to call when opening the modal 
		 * @method openFunc
		 */
		function openFunc() {
			setResolutionXSpinner_(1, 1920, 1, "n");
			setResolutionYSpinner_(1, 1080, 1, "n");
			that.open();
		}

		/**
		 * Function to call when closing the modal
		 * @method closeFunc
		 */
		function closeFunc() {
			that.hide();
		}

		/**
		 * Set spinner of resolution X
		 * @method setResolutionXSpinner_
		 * @param minValue minimum value of spinner
		 * @param maxValue maximum value of spinner
		 * @param stepValue step value of spinner
		 * @param format format value format
		 * @private
		 */
		function setResolutionXSpinner_(minValue, maxValue, stepValue, format) {
			mResolutionXSpinner.initialize({
				minValue: minValue,
				maxValue: maxValue,
				initValue: RGPP.Config.RESOLUTION_X,
				stepValue: stepValue,
				format: format
			});
		}

		/**
		 * Set spinner of resolution Y 
		 * @method setResolutionYSpinner_
		 * @param minValue minimum value of spinner
		 * @param maxValue maximum value of spinner
		 * @param stepValue step value of spinner
		 * @param format format value format
		 * @private
		 */
		function setResolutionYSpinner_(minValue, maxValue, stepValue, format) {
			mResolutionYSpinner.initialize({
				minValue: minValue,
				maxValue: maxValue,
				initValue: RGPP.Config.RESOLUTION_Y,
				stepValue: stepValue,
				format: format

			});
		}

		/**
		 * initialize UI
		 * @method initializeUI_
		 * @private
		 */
		var initializeUI_ = function() {
			// Creating division
			var nameDiv = createGameNameDiv_();
			var widthDiv = createResolutionXDiv_();
			var heightDiv = createResolutionYDiv_();
			var fontDiv = createFontDiv_();
			var fontSizeDiv = createFontSizeDiv_();
			var gridModeDiv = createGridModeDiv_();

			$(mModalBody).empty();
			$(mModalBody).append(nameDiv);
			$(mModalBody).append(widthDiv);
			$(mModalBody).append(heightDiv);
			$(mModalBody).append(fontDiv);
			$(mModalBody).append(fontSizeDiv);
			$(mModalBody).append(gridModeDiv);
		};

		/**
		 * create game name division
		 * @method createGameNameDiv_
		 * @return game name division
		 * @private
		 */
		var createGameNameDiv_ = function() {
			var nameDiv = $("<div>");
			var nameLabel = $("<label>");
			$(nameLabel).append("Game Name");

			$(nameDiv).append(nameLabel);
			$(nameDiv).append(" : ");
			$(nameDiv).append(mGameNameInput.element());
			return nameDiv;
		};

		/**
		 * create resolution x division
		 * @method createResolutionXDiv_
		 * @return resolution x division
		 * @private
		 */
		var createResolutionXDiv_ = function() {
			var resolutionXDiv = $("<div>");
			var resolutionXLabel = $("<label>");
			$(resolutionXLabel).append("Resolution X");
			$(resolutionXDiv).append(resolutionXLabel);
			$(resolutionXDiv).append(" : ");
			$(resolutionXDiv).append(mResolutionXSpinner.element());
			return resolutionXDiv;
		};

		/**
		 * create resolution y division
		 * @method createResolutionYDiv_
		 * @return resolution y division
		 * @private
		 */
		var createResolutionYDiv_ = function() {
			var resolutionYDiv = $("<div>");
			var resolutionYLabel = $("<label>");
			$(resolutionYLabel).append("Resolution Y");
			$(resolutionYDiv).append(resolutionYLabel);
			$(resolutionYDiv).append(" : ");
			$(resolutionYDiv).append(mResolutionYSpinner.element());
			return resolutionYDiv;
		};

		/**
		 * create font division
		 * @method createFontDiv_
		 * @return font division
		 * @private
		 */
		var createFontDiv_ = function() {
			var fontDiv = $("<div>");
			var fontLabel = $("<label>");
			$(fontLabel).append("Font");

			$(fontDiv).append(fontLabel);
			$(fontDiv).append(" : ");
			$(fontDiv).append(mFontInput.element());
			return fontDiv;
		};

		/**
		 * create font size division
		 * @method createFontSizeDiv_
		 * @return font size division
		 * @private
		 */
		var createFontSizeDiv_ = function() {
			var fontSizeDiv = $("<div>");
			var fontSizeLabel = $("<label>");
			$(fontSizeLabel).append("Font Size");

			$(fontSizeDiv).append(fontSizeLabel);
			$(fontSizeDiv).append(" : ");
			$(fontSizeDiv).append(mFontSizeInput.element());
			return fontSizeDiv;
		};

		/**
		 * create grid mode division
		 * @method createGridModeDiv_
		 * @return grid mode division
		 * @private
		 */
		var createGridModeDiv_ = function() {
			var gridModeDiv = $("<div>");
			$(gridModeDiv).append(mGridModeInput.element());
			return gridModeDiv;
		};

		/**
		 * Wheter the input value is corrected
		 * @method isCorrectInputValue_
		 * @return Wheter the input value is corrected
		 * @private
		 */
		var isCorrectInputValue_ = function() {

			if (isCorrectGameName_()) {}
			else {
				return false;
			}

			if (isCorrectFont_()) {}
			else {
				return false;
			}

			if (isCorrectFontSize_()) {}
			else {
				return false;
			}

			if (isCorrectResolution_()) {}
			else {
				return false;
			}

			return true;
		};

		/**
		 * Whether the game name is correct value
		 * @method isCorrectGameName_
		 * @return whether the game name is correct value
		 * @private
		 */
		var isCorrectGameName_ = function() {
			var strUtil = RGPP.System.StringUtil.getInstance();
			var gameName = mGameNameInput.value();

			if (strUtil.isEmptyString(gameName)) {
				alert("please input value is empty!");
				return false;
			}

			return true;
		};


		/**
		 * Whether the font is correct value
		 * @method isCorrectFont_
		 * @return whether the font is correct value
		 * @private
		 */
		var isCorrectFont_ = function() {
			var strUtil = RGPP.System.StringUtil.getInstance();
			var font = mFontInput.value();

			if (strUtil.isEmptyString(font)) {
				alert("please input value is empty!");
				return false;
			}
			return true;
		};

		/**
		 * Whether the font size is correct value
		 * @method isCorrectFontSize_
		 * @return whether the font size is correct value
		 * @private
		 */
		var isCorrectFontSize_ = function() {
			var strUtil = RGPP.System.StringUtil.getInstance();
			var fontSize = mFontSizeInput.value();

			if (strUtil.isEmptyString(fontSize)) {
				alert("please input value is empty!");
				return false;
			}
			return true;
		};

		/**
		 * Whether the resolution is correct value
		 * @method isCorrectResolution_
		 * @return whether the resolution is correct value
		 * @private
		 */
		var isCorrectResolution_ = function() {
			var numUtil = RGPP.System.NumberUtil.getInstance();
			var widthValue = mResolutionXSpinner.value();
			var heightValue = mResolutionYSpinner.value();

			if (numUtil.isIntegerType(widthValue) &&
				numUtil.isIntegerType(heightValue)) {
				return true;
			}

			alert("please input integer value!");
			return false;
		};


		// Spinner of resolution width
		var mResolutionXSpinner = RGPP.System.VariousInput({
			type: "spinner"
		});

		// Spinner of resolution height
		var mResolutionYSpinner = RGPP.System.VariousInput({
			type: "spinner"
		});

		// Input element of game name 
		var mGameNameInput = RGPP.System.VariousInput();
		mGameNameInput.initialize({
			initValue: RGPP.Config.GAME_NAME
		});

		// Input element of font
		var mFontInput = RGPP.System.VariousInput();
		mFontInput.initialize({
			initValue: "Arial"
		});

		// Input element of font size
		var mFontSizeInput = RGPP.System.VariousInput();
		mFontSizeInput.initialize({
			initValue: "2em"
		});

		// Whether the mode is grid mode
		var mGridModeInput = RGPP.System.VariousInput({
			type: "checkBox",
			idName: "GridMode",
			labelName: "Grid Mode"
		});
		mGridModeInput.initialize({
			initValue: "GridMode",
		});

		// Initialize UI
		initializeUI_();

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);