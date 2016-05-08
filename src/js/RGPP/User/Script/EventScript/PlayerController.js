(function(global) {
	/* global RGPP */
	"use strict";


	var objName = "PlayerController";

	var constructor = function(spec, my) {
		var that;

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

		var mPlayerSpriteController = RGPP.MW.PlayerSpriteController();

		var MAX_SPEED = 16;

		var mFilter = RGPP.MW.Sepia();
		
		var mSprite = null;

		that = RGPP.System.Script();
		that.onLoadGame = onLoadGame;
		that.onLoadMap = onLoadMap;
		that.onStateTransition = onStateTransition;
		that.update = update;

		that.loadChangeableValuesPerEvent = loadChangeableValuesPerEvent;
		that.debugUpdate = debugUpdate;
		that.debugDraw = debugDraw;

		var initialize = function(event) {
			mSprite = event.createGameObj(RGPP.MW.RPG.CHARA_CHIP_OBJ_ID, RGPP.RGPP.MW, "Sprite");
			mSprite.setImageDataBaseID(0, 0);
			mSprite.setEventPosition(event.currentX(), event.currentY());
			
			mSprite.setSpeed(MIN_SPEED.value());
			mSprite.setOffsetXY(5, 15, 5, 5);
			mSprite.setDivideXY(6, 4);
			mSprite.setAnimPatternArray([0, 1, 2, 1]);

			mPlayerSpriteController.initialize(mSprite);

			//RGPP.System.ImageFilterInstance.getInstance().setFilter(mFilter);

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
			return changeableValues;
		}

		function update(event) {
			MAX_SPEED = MIN_SPEED.value() * SPEED_SCALE_FACTOR.value();

			mPlayerSpriteController.setMinMaxSpeed(MIN_SPEED.value(), MAX_SPEED);
			mPlayerSpriteController.update(event);
		}
		
		function debugUpdate(event) {
			mPlayerSpriteController.debugUpdate(event);
		}

		function debugDraw(ctx) {
			mPlayerSpriteController.debugDraw(ctx);
		}

		return that;
	};


	RGPP.User.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
