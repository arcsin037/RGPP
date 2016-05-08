(function(global) {
	/* global RGPP */
	"use strict";


	var objName = "Player";

	var constructor = function(spec, my) {
		var that = RGPP.System.Script();

		my = my || {};

		var MIN_SPEED = RGPP.System.ChangeableValue({
			name: "Min Speed",
			minValue: 0,
			maxValue: 30,
			defaultValue: 8,
			stepValue: 1,
			type: "spinner"
		});

		var SPEED_SCALE_FACTOR = RGPP.System.ChangeableValue({
			name: "speed scale factor",
			minValue: 1.2,
			maxValue: 4.0,
			defaultValue: 2.0,
			stepValue: 0.1,
			type: "spinner"
		});

		var LAYER_2 = 1;
		var MAX_SPEED = 16;

		var mSprite = null;

		var mCameraController = RGPP.MW.CameraController();
		var mSpriteCollision = RGPP.MW.SpriteCollision();

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

		var mReactionFlag = false;


		that.onLoadGame = onLoadGame;
		that.onLoadMap = onLoadMap;
		that.onStateTransition = onStateTransition;
		that.update = update;
		that.debugUpdate = debugUpdate;
		that.debugDraw = debugDraw;
		that.reaction = reaction;
		that.loadChangeableValuesPerEvent = loadChangeableValuesPerEvent;

		var initialize = function(event) {

			mSprite = event.createGameObj(RGPP.MW.RPG.CHARA_CHIP_OBJ_ID, RGPP.RGPP.MW, "Sprite");
			mSprite.setImageDataBaseID(0, 0);
			mSprite.setEventPosition(event.currentX(), event.currentY());
			mSprite.setSpeed(MIN_SPEED.value());
			mSprite.setOffsetXY(5, 15, 5, 5);
			mSprite.setDivideXY(6, 4);
			mSprite.setAnimPatternArray([0, 1, 2, 1]);
			mSprite.setCollisionFlag(true);
		};

		function onLoadGame(event) {
			initialize(event);
		}

		function onLoadMap(event) {
			initialize(event);
		}

		function onStateTransition(event) {
			initialize(event);
		}

		function loadChangeableValuesPerEvent() {
			var changeableValues = [];
			changeableValues.push(MIN_SPEED);
			changeableValues.push(SPEED_SCALE_FACTOR);
			changeableValues.push(mDeleteWidth);
			changeableValues.push(mDeleteHeight);
			return changeableValues;
		}

		function update(event) {
			MAX_SPEED = MIN_SPEED.value() * SPEED_SCALE_FACTOR.value();
			var mapManager = RGPP.System.MapManager.getInstance();
			var chipWidth = mapManager.chipWidth();
			var chipHeight = mapManager.chipHeight();
			var firstX = Math.floor(mSprite.centerX() / chipWidth) - Math.floor(mDeleteWidth.value() / 2);
			var firstY = Math.floor(mSprite.centerY() / chipHeight) - Math.floor(mDeleteHeight.value() / 2);

			var deleteArray = [];
			for (var y = 0; y < mDeleteHeight.value(); y += 1) {
				deleteArray[y] = [];
				for (var x = 0; x < mDeleteWidth.value(); x += 1) {
					deleteArray[y][x] = -1;
				}
			}

			mapManager.setMapChipArray(LAYER_2, firstX, firstY, deleteArray, deleteArray, deleteArray);
			mReactionFlag = false;
		}


		function reaction(event) {
			//Collision Response
			if (!mReactionFlag) {
				var eventOperator = RGPP.MW.EventOperator.getInstance();
				// Movement
				var dirX = mSprite.directX() * mSprite.getSpeed();
				var dirY = mSprite.directY() * mSprite.getSpeed();
				// console.log("dir(x, y) = (" + dirX + ", " + dirY + ")");
				mSpriteCollision.setVector(dirX, dirY);
				mSpriteCollision.setMinMaxSpeed(MIN_SPEED.value(), MAX_SPEED);
				mSpriteCollision.collisionResponce(mSprite);
				mCameraController.setScrollXY(mSprite.getX() + mSprite.divideWidth() / 2, mSprite.getY() + mSprite.divideHeight() / 2);

				// React MainSpot
				var mapManager = RGPP.System.MapManager.getInstance();
				var chipWidth = mapManager.chipWidth();
				var chipHeight = mapManager.chipHeight();
				var firstX = mSprite.centerX() - chipWidth * mDeleteWidth.value() / 2;
				var firstY = mSprite.centerY() - chipHeight * mDeleteHeight.value() / 2;

				var width = chipWidth * mDeleteWidth.value();
				var height = chipHeight * mDeleteHeight.value();

				eventOperator.reactionInRange(event, firstX, firstY, width, height);

				mReactionFlag = true;
			}
		}

		function debugUpdate(event) {
			mSpriteCollision.debugUpdate();
		}

		function debugDraw(ctx) {
			mCameraController.debugDraw(ctx);
			mSpriteCollision.debugDraw(ctx);
		}

		return that;
	};


	RGPP.User.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
