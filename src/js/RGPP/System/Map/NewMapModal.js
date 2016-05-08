/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "NewMapModal";

	/**
	 * New Map Modal
	 * @constructor
	 * @class NewMapModal
	 * @author arcsin
	 */
	var constructor = function(spec) {
		// Modal Body
		var mModalBody = $("<div>");

		// creating new modal
		var that = RGPP.System.Modal({
			title: "Creating Map",
			bodyElement: mModalBody,
			footerButton: "create",
			approveFunc: approvedFunc
		});

		// Function to call when opening the modal 
		that.openFunc = openFunc;

		// Function to call when closing the modal 
		that.closeFunc = closeFunc;

		/**
		 * Default column of new map
		 * @property DEFAULT_COL
		 * @final
		 */
		var DEFAULT_COL = 20;
		/**
		 * Default row of new map
		 * @property DEFAULT_ROW
		 * @final
		 */
		var DEFAULT_ROW = 15;

		/**
		 * Default chip width of new map
		 * @property DEFAULT_CHIP_WIDTH
		 * @final
		 */
		var DEFAULT_CHIP_WIDTH = 32;

		/**
		 * Default chip height of new map
		 * @property DEFAULT_CHIP_HEIGHT
		 * @final
		 */
		var DEFAULT_CHIP_HEIGHT = 32;


		/**
		 * Function to be called when the user has approved the new map setting
		 * @method approvedFunc
		 */
		function approvedFunc() {
			var mapName = mMapNameInput.value();
			var widthValue = mMapWidthSpinner.value();
			var heightValue = mMapHeightSpinner.value();
			var chipWidthValue = mChipWidthSpinner.value();
			var chipHeightValue = mChipHeightSpinner.value();
			var description = mDescriptionInput.value();

			var strUtil = RGPP.System.StringUtil.getInstance();
			var rgpp = RGPP;

			var emptyFlag = strUtil.isEmptyString(mapName);

			if (emptyFlag) {
				alert("Please input map name!");
				return;
			}

			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			var categoryIndex = mCategoryComboBox.selectedIndex;

			if (categoryIndex < 0) {
				categoryIndex = 0;
			}

			if (rgpp.isIntegerType(widthValue) &&
				rgpp.isIntegerType(heightValue) &&
				rgpp.isIntegerType(chipWidthValue) &&
				rgpp.isIntegerType(chipHeightValue)) {

				mapPanelList.createObj({
					mapName: mapName,
					col: widthValue,
					row: heightValue,
					description: description,
					categoryIndex: categoryIndex,
					chipWidth: chipWidthValue,
					chipHeight: chipHeightValue,
				});
				mapPanelList.save();
				spec.updateFunc();
				that.hide();
			}
			else {
				alert("please input integer value!");
			}
		}

		/**
		 * Function to call when opening the modal 
		 * @method openFunc
		 */
		function openFunc() {
			setMapColSpinner_(1, 100000, 1, "n");
			setMapRowSpinner_(1, 100000, 1, "n");
			setMapChipWidthSpinner_(1, 100000, 1, "n");
			setMapChipHeightSpinner_(1, 100000, 1, "n");

			setCategoryComboBox_();
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
		 * Set spinner of map column
		 * @method setMapColSpinner_
		 * @param minValue {Number} minimum value of spinner
		 * @param maxValue {Number} maximum value of spinner
		 * @param stepValue {Number} step value of spinner
		 * @param format {String} format value
		 * @private
		 */
		function setMapColSpinner_(minValue, maxValue, stepValue, format) {
			mMapWidthSpinner.initialize({
				minValue: minValue,
				maxValue: maxValue,
				initValue: DEFAULT_COL,
				stepValue: stepValue,
				format: format
			});

		}

		/**
		 * Set spinner of map row
		 * @method setMapRowSpinner_
		 * @param minValue {Number} minimum value of spinner
		 * @param maxValue {Number} maximum value of spinner
		 * @param stepValue {Number} step value of spinner
		 * @param format {String} format value
		 * @private
		 */
		function setMapRowSpinner_(minValue, maxValue, stepValue, format) {
			mMapHeightSpinner.initialize({
				minValue: minValue,
				maxValue: maxValue,
				initValue: DEFAULT_ROW,
				stepValue: stepValue,
				format: format
			});
		}

		/**
		 * Set spinner of map chip width
		 * @method setMapChipWidthSpinner_
		 * @param minValue {Number} minimum value of spinner
		 * @param maxValue {Number} maximum value of spinner
		 * @param stepValue {Number} step value of spinner
		 * @param format {String} format value
		 * @private
		 */
		function setMapChipWidthSpinner_(minValue, maxValue, stepValue, format) {
			mChipWidthSpinner.initialize({
				minValue: minValue,
				maxValue: maxValue,
				initValue: DEFAULT_CHIP_WIDTH,
				stepValue: stepValue,
				format: format
			});
		}

		/**
		 * Set spinner of map chip height
		 * @method setMapChipHeightSpinner_
		 * @param minValue {Number} minimum value of spinner
		 * @param maxValue {Number} maximum value of spinner
		 * @param stepValue {Number} step value of spinner
		 * @param format {String} format value
		 * @private
		 */
		function setMapChipHeightSpinner_(minValue, maxValue, stepValue, format) {
			mChipHeightSpinner.initialize({
				minValue: minValue,
				maxValue: maxValue,
				initValue: DEFAULT_CHIP_HEIGHT,
				stepValue: stepValue,
				format: format
			});
		}

		/**
		 * Set category combo box
		 * @method setCategoryComboBox_
		 * @private
		 */
		var setCategoryComboBox_ = function() {
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			var categorySize = mapPanelList.categorySize();

			// append category from map panel list
			$(mCategoryComboBox).empty();
			for (var i = 0; i < categorySize; i += 1) {
				var option = document.createElement("option");
				$(option).append(mapPanelList.categoryName(i));
				$(mCategoryComboBox).append(option);
			}
		};

		/**
		 * initialize UI
		 * @method initializeUI_
		 * @private
		 */
		var initializeUI_ = function() {
			// Creating division
			var mapCategoryDiv = createMapCategoryDiv_();
			var mapNameDiv = createMapNameDiv_();
			var mapSizeDiv = createMapSizeDiv_();
			var mapChipSizeDiv = createMapChipSizeDiv_();
			var descriptionDiv = createDescriptionDiv_();

			$(mModalBody).empty();
			$(mModalBody).append(mapNameDiv);
			$(mModalBody).append(mapCategoryDiv);
			$(mModalBody).append(mapSizeDiv);
			$(mModalBody).append(mapChipSizeDiv);
			$(mModalBody).append(descriptionDiv);
		};

		/**
		 * create map category division
		 * @method createMapCategoryDiv_
		 * @return game name division
		 * @private
		 */
		var createMapCategoryDiv_ = function() {
			var mapCategoryDiv = $("<div>");

			var categoryLabel = $("<label>");
			$(categoryLabel).append("Category");

			$(mapCategoryDiv).append(categoryLabel);
			$(mapCategoryDiv).append(" : ");
			$(mapCategoryDiv).append(mCategoryComboBox);

			return mapCategoryDiv;
		};

		/**
		 * create map name division
		 * @method createMapNameDiv_
		 * @return map name division
		 * @private
		 */
		var createMapNameDiv_ = function() {
			var mapNameDiv = $("<div>");

			var nameLabel = $("<label>");
			$(nameLabel).append("Map Name");

			$(mapNameDiv).append(nameLabel);
			$(mapNameDiv).append(" : ");
			$(mapNameDiv).append(mMapNameInput.element());

			return mapNameDiv;
		};

		/**
		 * create map size division
		 * @method createMapSizeDiv_
		 * @return map size division
		 * @private
		 */
		var createMapSizeDiv_ = function() {
			var mapSizeDiv = $("<div>");

			var colLabel = $("<label>");
			var rowLabel = $("<label>");

			$(colLabel).append("Map Chip Column");
			$(rowLabel).append("Map Chip Row");

			$(mapSizeDiv).append(colLabel);
			$(mapSizeDiv).append(" : ");
			$(mapSizeDiv).append(mMapWidthSpinner.element());
			$(mapSizeDiv).append(" ");

			$(mapSizeDiv).append(rowLabel);
			$(mapSizeDiv).append(" : ");
			$(mapSizeDiv).append(mMapHeightSpinner.element());
			return mapSizeDiv;
		};

		/**
		 * create map chip size division
		 * @method createMapChipSizeDiv_
		 * @return map chip size division
		 * @private
		 */
		var createMapChipSizeDiv_ = function() {
			var chipSizeDiv = $("<div>");
			var chipWidthLabel = $("<label>");
			var chipHeightLabel = $("<label>");

			$(chipWidthLabel).append("Map Chip Width(px)");
			$(chipHeightLabel).append("Map Chip Height(px)");
			$(chipSizeDiv).append(chipWidthLabel);
			$(chipSizeDiv).append(" : ");
			$(chipSizeDiv).append(mChipWidthSpinner.element());
			$(chipSizeDiv).append(" ");

			$(chipSizeDiv).append(chipHeightLabel);
			$(chipSizeDiv).append(" : ");
			$(chipSizeDiv).append(mChipHeightSpinner.element());

			return chipSizeDiv;
		};

		/**
		 * create map description division
		 * @method createDescriptionDiv_
		 * @return map description division
		 * @private
		 */
		var createDescriptionDiv_ = function() {
			var descriptionDiv = $("<div>");
			var descriptionLabel = $("<label>");
			$(descriptionLabel).append("Description");

			$(descriptionDiv).append(descriptionLabel);
			$(descriptionDiv).append(" : ");
			$(descriptionDiv).append(mDescriptionInput.element());
			return descriptionDiv;
		};


		// Input element of map name 
		var mMapNameInput = RGPP.System.VariousInput();
		mMapNameInput.initialize({
			initValue: "New Map"
		});

		// Input element of map description 
		var mDescriptionInput = RGPP.System.VariousInput();
		mDescriptionInput.initialize({
			initValue: "New Description"
		});

		// category combobox
		var mCategoryComboBox = document.createElement("select");

		// Spinner of map width
		var mMapWidthSpinner = RGPP.System.VariousInput({
			type: "spinner"
		});

		// Spinner of map height
		var mMapHeightSpinner = RGPP.System.VariousInput({
			type: "spinner"
		});

		// Spinner of chip width
		var mChipWidthSpinner = RGPP.System.VariousInput({
			type: "spinner"
		});

		// Spinner of chip height
		var mChipHeightSpinner = RGPP.System.VariousInput({
			type: "spinner"
		});

		// initialize UI
		initializeUI_();
		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);