(function(global) {
	/* global RGPP */
	"use strict";


	var objName = "PlayerSpriteController";

	var constructor = function(spec, my) {
		var that = {};

		my = my || {};

		var mVx = 0;
		var mVy = 0;
		var MIN_SPEED = 8;
		var MAX_SPEED = 16;
		var mNearMouseFlagX = false;
		var mNearMouseFlagY = false;
		
		var mSprite = null;

		var mActionSquare = [];

		that.initialize = initialize;
		that.setMinMaxSpeed = setMinMaxSpeed;
		that.update = update;

		that.debugUpdate = debugUpdate;
		that.debugDraw = debugDraw;

		var mCameraController = RGPP.MW.CameraController();

		var mSpriteCollision = RGPP.MW.SpriteCollision();

		function initialize(sprite) {
			mVx = 0;
			mVy = 0;
			mSprite = sprite;
			mSprite.setCollisionFlag(true);
		}

		function setMinMaxSpeed(minSpeed, maxSpeed) {
			MIN_SPEED = minSpeed;
			MAX_SPEED = maxSpeed;
		}

		function update(event) {
			mVx = 0;
			mVy = 0;

			controlPlayerByKeyBoard();
			controlPlayerByMouse();

			mSprite.setDirectionXY(mVx, mVy);

			//Collision Response
			mSpriteCollision.setVector(mVx, mVy);
			mSpriteCollision.setNearFlag(mNearMouseFlagX, mNearMouseFlagY);
			mSpriteCollision.setMinMaxSpeed(MIN_SPEED, MAX_SPEED);
			mSpriteCollision.collisionResponce(mSprite);
			mVx = mSpriteCollision.resultVx();
			mVy = mSpriteCollision.resultVy();

			mCameraController.setScrollXY(mSprite.getX() + mSprite.divideWidth() / 2, mSprite.getY() + mSprite.divideHeight() / 2);
		}
		
		function debugUpdate(event) {
			mSpriteCollision.debugUpdate(mSprite);
		}

		function debugDraw(ctx) {
			mCameraController.debugDraw(ctx);

			var fundDrawing = RGPP.System.FundamentalDrawing.getInstance();
			// Draw Action Square
			fundDrawing.setColor(ctx, 255, 0, 255, 1);
			fundDrawing.drawRect(ctx, mActionSquare[0], mActionSquare[1], mActionSquare[2], mActionSquare[3], 2);
		}

		var controlPlayerByKeyBoard = function() {
			var cm = RGPP.System.ControlManager.getInstance();
			var speed = mSprite.getSpeed();
			//Check KeyBoard
			if (cm.isKeyOnRight()) {
				mVx = speed;
			}
			else if (cm.isKeyOnLeft()) {
				mVx = -speed;
			}

			if (cm.isKeyOnUp()) {
				mVy = -speed;
			}
			else if (cm.isKeyOnDown()) {
				mVy = speed;
			}

			if (cm.isKeyTriggeredA()) {
				var directX = mSprite.directX();
				var directY = mSprite.directY();
				mActionSquare[2] = mSprite.hitSquareWidth();
				mActionSquare[3] = mSprite.hitSquareHeight();

				mActionSquare[0] = mSprite.hitSquareLeftX() + directX * mActionSquare[2];
				mActionSquare[1] = mSprite.hitSquareTopY() + directY * mActionSquare[3];

				var rpg = RGPP.MW.EventOperator.getInstance();
				rpg.reactionInRange(mSprite, mActionSquare[0], mActionSquare[1], mActionSquare[2], mActionSquare[3]);
			}

			if (cm.isKeyTriggeredB()) {}

			if (cm.isKeyOnC()) {
				mSprite.setSpeed(MAX_SPEED);
			}
			else {
				mSprite.setSpeed(MIN_SPEED);
			}

		};

		var controlPlayerByMouse = function() {
			//Check Mouse
			mNearMouseFlagX = false;
			mNearMouseFlagY = false;
			var x = mSprite.getX();
			var y = mSprite.getY();

			var speed = mSprite.getSpeed();

			var cm = RGPP.System.ControlManager.getInstance();
			if (cm.isPressedLeftButton()) {
				var mx = cm.getMouseX() - mSprite.divideWidth() / 2;
				var my = cm.getMouseY() - mSprite.divideHeight() / 2;

				var posX = x - mCameraController.getScrollX();
				var posY = y - mCameraController.getScrollY();

				if (Math.abs(mx - posX) < speed) {
					mVx = 0;
					mNearMouseFlagX = true;
				}
				else {
					if (mx < posX) {
						mVx = -speed;
					}
					else {
						mVx = speed;
					}
				}

				if (Math.abs(my - posY) < speed) {
					mVy = 0;
					mNearMouseFlagY = true;
				}
				else {
					if (my < posY) {
						mVy = -speed;
					}
					else {
						mVy = speed;
					}
				}
			}

		};

		return that;
	};

	RGPP.MW.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
