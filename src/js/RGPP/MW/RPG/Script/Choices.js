(function(global) {
	/* global RGPP */
	"use strict";

	var objName = "Choices";

	var mBaseCursorIDSet = RGPP.System.IDSet({
		name: "Base Cursor",
		categoryID: 1,
		dataID: 1,
	});

	var constructor = function(spec, my) {
		var that;
		
		my = my || {};

		that = RGPP.MW.WindowBase(spec, my);

		that.onLoadMap = onLoadMap;
		that.initialize = initialize;

		that.update = update;
		that.updateChoices = updateChoices;
		
		that.draw = draw;
		that.loadChangeableValuesPerScript = loadChangeableValuesPerScript;
		that.loadChangeableValuesPerEvent = loadChangeableValuesPerEvent;
		that.drawChoices = drawChoices;
		that.selectedIndex = selectedIndex;
		that.open = open;
		that.close = close;
		that.setOption = setOption;
		that.isOpen = isOpen;

		var mOptionSize = RGPP.System.ChangeableValue({
			name: "option size",
			minValue: 1,
			maxValue: 10,
			defaultValue: 3,
			stepValue: 1,
			type: "spinner"
		});

		var mAddRedValue = RGPP.System.ChangeableValue({
			name: "Add red value",
			minValue: 1,
			maxValue: 40,
			defaultValue: 30,
			stepValue: 1,
			type: "spinner"
		});

		var mMaxAddRedValue = RGPP.System.ChangeableValue({
			name: "Max Add red value",
			minValue: 1,
			maxValue: 40,
			defaultValue: 30,
			stepValue: 1,
			type: "spinner"
		});

		var mCenter = RGPP.System.Position2D({
			name: "Center",
			x: 320,
			y: 240,
		});

		var mSize = RGPP.System.Size2D({
			name: "Window",
			width: 100,
			height: 50,
		});

		var mOptions = RGPP.System.Strings({
			name: "option",
			size: mOptionSize.value(),
		});

		var mCursorImages = [];
		var mOptionTexts = [];

		var mAddColorR = 0;
		var mCount = 0;
		var mMaxWindowWidth = 0;

		var mSelectedIndex = 0;
		var mSelectedFlag = false;
		var mOpenFlag = false;
		
		function onLoadMap(event) {
			initialize(event);
		}
		
		function initialize(event) {
			var index = 0;
			var windowImage = that.createWindowImage(event, index);
			windowImage.disableDisplay();
			index += 1;
			// display option
			for (var i = 0; i < mOptionSize.value(); i += 1) {
				mCursorImages[i] = event.createImageObj(index, mBaseCursorIDSet);
				mCursorImages[i] = RGPP.System.FreeSizeImage(mCursorImages[i]);
				index += 1;
				mOptionTexts[i] = event.createImageObj(index, mOptions.value(i));
				index += 1;
				mOptionTexts[i].setOnScreen(true);
				
				mCursorImages[i].disableDisplay();
				mCursorImages[i].setZ(1);
				mOptionTexts[i].disableDisplay();
				mOptionTexts[i].setZ(2);
			}
		}

		function loadChangeableValuesPerScript() {
            var changeableValues = my.loadChangeableValuesPerScript();
            mBaseCursorIDSet.loadChangeableValues(changeableValues);
			return changeableValues;
		} 

		function loadChangeableValuesPerEvent() {
			var changeableValues = [];

			mCenter.loadChangeableValues(changeableValues);
			mSize.loadChangeableValues(changeableValues);
			changeableValues.push(mOptionSize);
			mOptions.loadChangeableValues(changeableValues);

			return changeableValues;
		}

		function update(event) {
			updateChoices();
		}

		function draw(ctx) {
			drawChoices(ctx);
		}
		
		function updateChoices() {
			mSelectedFlag = false;
			var cm = RGPP.System.ControlManager.getInstance();
			if (cm.isLeftClick()) {
				if (mSelectedIndex >= 0) {
					console.log("selected index = " + mSelectedIndex);
					mSelectedFlag = true;
				}
			}
		}


		function drawChoices(ctx) {
			drawOptions();
			drawWindowAndCursor();
			updateColor();
		}

		var drawOptions = function() {
			var windowImage = that.windowImage();
			var yOffset = 6;
			var x = windowImage.centerX();
			var y = windowImage.getY() + yOffset;

			mMaxWindowWidth = 0;
			for (var i = 0; i < mOptionSize.value(); i += 1) {
				if (mOptionTexts[i] !== "") {
					// display option
					var textHalfHeight = mOptionTexts[i].imageHeight() / 2;
					y += textHalfHeight;
					mOptionTexts[i].setCenterXY(x, y);
					y += textHalfHeight;

					// calc max window width
					var textWidth = mOptionTexts[i].imageWidth();
					if (mMaxWindowWidth < textWidth) {
						mMaxWindowWidth = textWidth;
					}
				}
			}
		};

		var drawWindowAndCursor = function() {
			var xOffset = 12;
			var windowImage = that.windowImage();
			var yOffset = 6;
			var x = windowImage.centerX();
			var y = windowImage.getY() + yOffset;
			var windowHeight = yOffset * 2;

			mSelectedIndex = -1;

			for (var i = 0; i < mOptionSize.value(); i += 1) {
				if (mOptionTexts[i] !== "") {
					// display cursor
					var textHeight = mOptionTexts[i].imageHeight();
					var textHalfHeight = textHeight / 2;

					var cursorWidth = mMaxWindowWidth + xOffset;
					var cursorHeight = textHeight - yOffset / 3;

					y += textHalfHeight;
					mCursorImages[i].setPosSize(x, y, cursorWidth, cursorHeight);
					if (mCursorImages[i].onMouse()) {
						mCursorImages[i].setAddColor(mAddColorR, 0, 0, 0);
						mCursorImages[i].setGlobalAlpha(0.8);
						mSelectedIndex = i;
					}
					else {
						mCursorImages[i].setAddColor(0, 0, 0, 0);
						mCursorImages[i].setGlobalAlpha(0);
					}
					y += textHalfHeight;

					windowHeight += textHalfHeight * 2;
				}
			}

			var windowWidth = mMaxWindowWidth + xOffset * 2;

			that.setPosSize(mCenter.x(), mCenter.y(), windowWidth, windowHeight);

		};

		var updateColor = function() {
			mAddColorR = Math.floor(mMaxAddRedValue.value() * Math.sin(mCount * (Math.PI / 180.0)));
			mCount += mAddRedValue.value();
			mCount %= 360;
		};
		
		function selectedIndex() {
			if (mOpenFlag && mSelectedFlag) {
				return mSelectedIndex;
			}
			return -1;
		}
		
		function open() {
			var windowImage = that.windowImage();
			windowImage.enableDisplay();
			// display option
			for (var i = 0; i < mOptionSize.value(); i += 1) {
				mCursorImages[i].enableDisplay();
				mOptionTexts[i].enableDisplay();
			}
			mOpenFlag = true;
		}
		
		function close() {
			var windowImage = that.windowImage();
			windowImage.disableDisplay();
			// display option
			for (var i = 0; i < mOptionSize.value(); i += 1) {
				mCursorImages[i].disableDisplay();
				mOptionTexts[i].disableDisplay();
			}
			mOpenFlag = false;
		}
		
		function setOption(options) {
			for (var i = 0; i < options.size(); i += 1) {
				var value = options.value(i);
				mOptions.setValue(i, value);
			}
		}
		
		function isOpen() {
			return mOpenFlag;
		}

		return that;
	};

	RGPP.MW.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
