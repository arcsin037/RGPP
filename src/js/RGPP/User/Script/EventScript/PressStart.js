/**
 * User module
 * @module User
 * @namespace RGPP.User
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "PressStart";

	var BLINK_FRAME = RGPP.System.ChangeableValue({
		name: "blink frame",
		minValue: 0,
		maxValue: 120,
		defaultValue: 10,
		stepValue: 1,
		type: "spinner"
	});

	/**
	 * Press Start
	 * 
	 * @class PressStart
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = RGPP.System.Script();

		// Interface
		that.onLoadMap = onLoadMap;
		that.loadChangeableValuesPerEvent = loadChangeableValuesPerEvent;
		that.loadChangeableValuesPerScript = loadChangeableValuesPerScript;
		that.update = update;
		that.draw = draw;

		var mTitleObj = null;
		var mPressSpaceKeyObj = null;
		var mCount = 0;
		var mDisplayFlag = true;

		var STRING = RGPP.System.ChangeableValue({
			name: "String",
			defaultValue: "GameOver!"
		});

		var mTitlePos = RGPP.System.Position2D({
			name: "Title",
			x: 320,
			y: 240,
		});

		var mPressKeyPos = RGPP.System.Position2D({
			name: "Press Key",
			x: 320,
			y: 300,
		});

		var mTitleColor = RGPP.System.ColorRGBA({
			name: "Title",
			r: 255,
			g: 255,
			b: 255,
			a: 1
		});

		var mPressKeyColor = RGPP.System.ColorRGBA({
			name: "PressStart",
			r: 255,
			g: 255,
			b: 255,
			a: 1
		});

		var mFirstMap = RGPP.System.IDSet({
			name: "First Map",
			categoryID: 0,
			mapID: 1,
		});

		var initialize = function(event) {
			var imageDataManager = RGPP.System.ImageDataManager.getInstance();
			mTitleObj = imageDataManager.createObj(STRING.value(), event);
			mTitleObj.setOnScreen(true);

			mPressSpaceKeyObj = imageDataManager.createObj("Press space key!", event);
		};

		function loadChangeableValuesPerEvent() {
			var changeableValues = [];
			changeableValues.push(STRING);
			mTitlePos.loadChangeableValues(changeableValues);
			mPressKeyPos.loadChangeableValues(changeableValues);
			mTitleColor.loadChangeableValues(changeableValues);
			mPressKeyColor.loadChangeableValues(changeableValues);
			mFirstMap.loadChangeableValues(changeableValues);
			return changeableValues;
		}

		function loadChangeableValuesPerScript() {
			var changeableValues = [];

			changeableValues.push(BLINK_FRAME);
			return changeableValues;
		}

		function onLoadMap(event) {
			initialize(event);
		}

		function update(event) {
			var cm = RGPP.System.ControlManager.getInstance();

			if (cm.isKeyTriggeredA()) {
				console.log("press space");
				var categoryID = mFirstMap.categoryID();
				var mapID = mFirstMap.dataID();

				RGPP.System.MapManager.getInstance().changeMap(categoryID, mapID);
				return;
			}

			mCount += 1;

			if (mCount > BLINK_FRAME.value()) {
				if (mDisplayFlag) {
					mPressSpaceKeyObj.disableDisplay();
				}
				else {
					mPressSpaceKeyObj.enableDisplay();
				}
				mDisplayFlag = !mDisplayFlag;
				mCount = 0;
			}
		}

		function draw(ctx) {
			mTitleObj.setText(STRING.value());
			mTitleObj.setFontColor(mTitleColor.r(), mTitleColor.g(), mTitleColor.b(), mTitleColor.a());
			mPressSpaceKeyObj.setFontColor(
				mPressKeyColor.r(),
				mPressKeyColor.g(),
				mPressKeyColor.b(),
				mPressKeyColor.a());

			mTitleObj.calcTextSize(ctx);
			mTitleObj.setCenterXY(mTitlePos.x(), mTitlePos.y());

			mPressSpaceKeyObj.calcTextSize(ctx);
			mPressSpaceKeyObj.setCenterXY(mPressKeyPos.x(), mPressKeyPos.y());
		}

		return that;
	};


	RGPP.User.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
