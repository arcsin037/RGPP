(function(global) {
	/* global RGPP */
	"use strict";



	var objName = "Spot";

	var mGoalPosX = 0;
	var mGoalPosY = 0;
	var mMoveFlag = false;

	var LINE_WIDTH = RGPP.System.ChangeableValue({
		name: "Line Width",
		minValue: 1,
		maxValue: 10,
		defaultValue: 2,
		stepValue: 1,
		type: "spinner"
	});

	var constructor = function(spec, my) {
		var that;

		my = my || {};

		var mX = 0;
		var mY = 0;
		var mVx = 0;
		var mVy = 0;
		var mNearFlagX = false;
		var mNearFlagY = false;

		var mEnable = false;
		var mReachFlag = false;
		var mUpdateFlag = false;

		var mDeleteWidth = RGPP.System.ChangeableValue({
			name: "Delete Width",
			minValue: 1,
			maxValue: 17,
			defaultValue: 3,
			stepValue: 2,
			type: "spinner"
		});

		var mDeleteHeight = RGPP.System.ChangeableValue({
			name: "Delete Height",
			minValue: 1,
			maxValue: 17,
			defaultValue: 3,
			stepValue: 2,
			type: "spinner"
		});

		var mNextSpotID = RGPP.System.ChangeableValue({
			name: "Next Spot ID",
			minValue: 0,
			maxValue: 100,
			defaultValue: 0,
			stepValue: 1,
			type: "spinner"
		});

		var mDescriptions = RGPP.System.Strings({
			name: "Description",
			size: 1,
		});
		
		var LAYER_2 = 1;

		that = RGPP.System.Script();
		that.onLoadGame = initialize;
		that.onLoadMap = initialize;

		that.update = update;
		that.draw = draw;
		that.reaction = reaction;
		that.loadChangeableValuesPerScript = loadChangeableValuesPerScript;
		that.loadChangeableValuesPerEvent = loadChangeableValuesPerEvent;

		var mMenu = UserNS.Menu();

		function initialize(event) {
			mMoveFlag = false;
			mEnable = false;
			mReachFlag = false;
			mUpdateFlag = false;
			mMenu.onLoadMap(event);
		}

		function loadChangeableValuesPerScript() {
			var changeableValues = mMenu.loadChangeableValuesPerScript();
			changeableValues.push(LINE_WIDTH);
			return changeableValues;
		}

		function loadChangeableValuesPerEvent() {
			var changeableValues = [];
			changeableValues.push(mNextSpotID);
			changeableValues.push(mDeleteWidth);
			changeableValues.push(mDeleteHeight);
			mDescriptions.loadChangeableValues(changeableValues);

			return changeableValues;
		}

		function update(event) {
			mMenu.update(event);

			if (mMenu.selectedIndex() === 0) {
				console.log("調査！");
				console.log("Desctiption = " + mDescriptions.value(0));
			}
			else if (mMenu.selectedIndex() === 1) {
				alert("休息！");
			}
			var mapManager = RGPP.System.MapManager.getInstance();
			var eventOperator = RGPP.MW.EventOperator.getInstance();
			var chipWidth = mapManager.chipWidth();
			var chipHeight = mapManager.chipHeight();
			mX = event.currentX() * chipWidth;
			mY = event.currentY() * chipHeight;

			var playerEventObj = eventOperator.searchEventObjsByStateKey("player")[0];

			if (playerEventObj !== undefined) {
				var playerSprite = playerEventObj.gameObjs("Sprite")[RGPP.MW.RPG.CHARA_CHIP_OBJ_ID];

				controlPlayerByMouse(playerSprite);
				if (mMoveFlag) {
					playerSprite.setDirectionXY(mVx, mVy);
					eventOperator.reactionByStateKey("player");
				}

				if (mEnable && mReachFlag && !mUpdateFlag) {
					eventOperator.reactionByEventID(mNextSpotID.value());
					mUpdateFlag = true;
				}
			}
		}

		var controlPlayerByMouse = function(playerSprite) {
			//Check Mouse
			var mapManager = RGPP.System.MapManager.getInstance();

			var chipWidth = mapManager.chipWidth();
			var chipHeight = mapManager.chipHeight();

			var cs = RGPP.System.CoordinateSystem.getInstance();
			var cm = RGPP.System.ControlManager.getInstance();

			var mouseMapX = cs.convertScreenToMapX(cm.getMouseX());
			var mouseMapY = cs.convertScreenToMapY(cm.getMouseY());

			if (cm.isLeftClick() && mEnable) {
				if (mX < mouseMapX && mouseMapX < mX + chipWidth && mY < mouseMapY && mouseMapY < mY + chipHeight) {
					//console.log("in!");
					mMoveFlag = true;
					mReachFlag = false;
					mGoalPosX = mX + chipWidth / 2;
					mGoalPosY = mY + chipHeight / 2;
				}
			}

			mVy = 0;
			mVx = 0;
			mNearFlagX = false;
			mNearFlagY = false;

			var speed = playerSprite.getSpeed();
			var posX = playerSprite.centerX();
			var posY = playerSprite.centerY();

			if (Math.abs(mGoalPosX - posX) < speed) {
				mVx = 0;
				mNearFlagX = true;
			}
			else {
				if (mGoalPosX < posX) {
					mVx = -speed;
				}
				else {
					mVx = speed;
				}
			}

			if (Math.abs(mGoalPosY - posY) < speed) {
				mVy = 0;
				mNearFlagY = true;
			}
			else {
				if (mGoalPosY < posY) {
					mVy = -speed;
				}
				else {
					mVy = speed;
				}
			}

			if (mNearFlagX && mNearFlagY) {
				mMoveFlag = false;
			}
			if (mX < posX && posX < mX + chipWidth && mY < posY && posY < mY + chipHeight) {
				if (!mReachFlag && cm.isLeftClick()) {
					console.log("Menu!");
					if (!mMenu.isOpen()) {
						mMenu.open();
					}
				}
				mEnable = true;
				mReachFlag = true;
			}
		};

		function reaction(event) {
			mEnable = true;

			var mapManager = RGPP.System.MapManager.getInstance();

			var firstX = event.currentX() - Math.floor(mDeleteWidth.value() / 2);
			var firstY = event.currentY() - Math.floor(mDeleteHeight.value() / 2);

			var deleteArray = [];
			for (var y = 0; y < mDeleteHeight.value(); y += 1) {
				deleteArray[y] = [];
				for (var x = 0; x < mDeleteWidth.value(); x += 1) {
					deleteArray[y][x] = -1;
				}
			}

			mapManager.setMapChipArray(LAYER_2, firstX, firstY, deleteArray, deleteArray, deleteArray);
		}

		function draw(ctx) {
			mMenu.draw(ctx);
			if (mEnable) {
				// Draw Range Square
				var fundDrawing = RGPP.System.FundamentalDrawing.getInstance();

				fundDrawing.setColor(ctx, 0, 0, 255, 1);
				var mapManager = RGPP.System.MapManager.getInstance();
				var chipWidth = mapManager.chipWidth();
				var chipHeight = mapManager.chipHeight();

				fundDrawing.drawRect(ctx, mX, mY, chipWidth, chipHeight, LINE_WIDTH.value());
			}
		}

		return that;
	};


	RGPP.User.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});
})((this || 0).self || global);
