/**
 * Middle-ware module
 * @module MW
 * @namespace RGPP.MW
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "SpriteCollision";

	/**
	 * Collision with sprite
	 * 
	 * @class SpriteCollision
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var that;

		that = RGPP.System.Script();

		var mVx = 0;
		var mVy = 0;
		var mResultVx = 0;
		var mResultVy = 0;

		var MIN_SPEED = 8;
		var MAX_SPEED = 16;

		var mNearFlagX = false;
		var mNearFlagY = false;

		var CHIP_WALL = 1;

		that.collisionResponce = collisionResponce;

		that.setVector = setVector;
		that.resultVx = resultVx;
		that.resultVy = resultVy;
		that.setNearFlag = setNearFlag;
		that.setMinMaxSpeed = setMinMaxSpeed;
		that.chipWall = chipWall;

		function collisionResponce(sprite) {
			var x = sprite.getX();
			var y = sprite.getY();
			var minSpeedX;
			var minSpeedY;

			//Check Mouse
			var saveX = x;
			var saveY = y;

			//Check X
			var hitX = false;
			if (mVx !== 0 || mNearFlagX) {
				//console.log("check x");
				sprite.setXY(x + mVx, y);
				hitX = checkCollision(sprite);
			}
			//Check Y
			var hitY = false;
			if (mVy !== 0 || mNearFlagY) {
				//console.log("check y");
				sprite.setXY(x, y + mVy);
				hitY = checkCollision(sprite);
			}
			var hit = hitX && hitY;
			if (hitX || hitY) {
				if (mVx === 0 || mVy === 0) { //move one vector
					hit = true;
				}
				if (mNearFlagX) {
					x = saveX;
				}
				if (mNearFlagY) {
					y = saveY;
				}
			}
			var hit01 = false;
			if (!hit) {
				if (hitX && !hitY) { //only Y ok
					//if MAX SPEED
					if (Math.abs(mVx) === MAX_SPEED) {
						minSpeedX = MIN_SPEED;
						if (mVx < 0) {
							minSpeedX *= -1;
						}
						sprite.setXY(x, y);
						mVx = minSpeedX;
						collisionResponce(sprite);
						return;
					}
					mVx = 0;
				}
				else if (!hitX && hitY) { //only X ok
					//if MAX SPEED
					if (Math.abs(mVy) === MAX_SPEED) {
						minSpeedY = MIN_SPEED;
						if (mVy < 0) {
							minSpeedY *= -1;
						}
						sprite.setXY(x, y);
						mVy = minSpeedY;
						collisionResponce(sprite);
						return;
					}
					mVy = 0;
				}
				if (mNearFlagX) {
					x = saveX;
				}
				if (mNearFlagY) {
					y = saveY;

				}
			}
			else {
				//hit
				//hit X and hit Y
				var halfSizeX = Math.floor(sprite.hitSquareWidth() / 2);
				var halfSizeY = Math.floor(sprite.hitSquareHeight() / 2);

				var slideX1 = x + mVx;
				var slideX2 = slideX1;
				var slideY1 = y + mVy;
				var slideY2 = slideY1;
				if (mVx !== 0) { //move X
					//slide Y
					slideY1 += halfSizeY; //down
					slideY2 -= halfSizeY; //up
				}
				else if (mVy !== 0) { //move Y
					//slide X
					slideX1 += halfSizeX; //right
					slideX2 -= halfSizeX; //left
				}

				//Check slide
				sprite.setXY(slideX1, slideY1);
				var hit0 = checkCollision(sprite);
				sprite.setXY(slideX2, slideY2);
				var hit1 = checkCollision(sprite);
				hit01 = hit0 && hit1;
				if (!hit01) {
					if (mVx !== 0) { //move X
						if (hit0 && !hit1) { //go up
							mVy = -MIN_SPEED;
						}
						else if (!hit0 && hit1) { //go down
							mVy = MIN_SPEED;
						}
						mVx = 0;
					}
					else if (mVy !== 0) { //moveY
						if (hit0 && !hit1) { //go left
							mVx = -MIN_SPEED;
						}
						else if (!hit0 && hit1) { //go right
							mVx = MIN_SPEED;
						}
						mVy = 0;
					}
					sprite.setDirectionXY(mVx, mVy);
				}
				else {
					//check 2
					var mSpriteSpeed = sprite.getSpeed();
					var tmpSpeed = mSpriteSpeed;
					// var loopCount = 0;
					var hit3 = true;
					for (;;) {
						slideX1 = x + mVx;
						slideX2 = slideX1;
						slideY1 = y + mVy;
						slideY2 = slideY1;

						if (hitX) { // hit when move X
							//slide Y
							slideY1 += tmpSpeed; //down
							slideY2 -= tmpSpeed; //up
						}
						else if (hitY) { // hit when move Y
							//slide X
							slideX1 += tmpSpeed; //right
							slideX2 -= tmpSpeed; //left
						}
						//Check slide
						sprite.setXY(slideX1, slideY1);
						hit0 = checkCollision(sprite);
						sprite.setXY(slideX2, slideY2);
						hit1 = checkCollision(sprite);

						if (!hit0 || !hit1) { // not hit
							hit3 = false;
							break;
						}

						tmpSpeed -= 1;
						if (tmpSpeed <= 0) {
							break;
						}

					}

					if (!hit3) {
						if (mVx !== 0) { //move X
							if (hit0 && !hit1) { //go up
								mVy = -tmpSpeed;
							}
							else if (!hit0 && hit1) { //go down
								mVy = tmpSpeed;
							}
							mVx = 0;
						}
						else if (mVy !== 0) { //moveY
							if (hit0 && !hit1) { //go left
								mVx = -tmpSpeed;
							}
							else if (!hit0 && hit1) { //go right
								mVx = tmpSpeed;
							}
							mVy = 0;
						}
						sprite.setDirectionXY(mVx, mVy);
					}
					else {
						var flagX = (Math.abs(mVx) === MAX_SPEED);
						var flagY = (Math.abs(mVy) === MAX_SPEED);

						minSpeedX = MIN_SPEED;
						minSpeedY = MIN_SPEED;

						if (mVx < 0) {
							minSpeedX *= -1;
						}
						if (mVy < 0) {
							minSpeedY *= -1;
						}
						sprite.setXY(x, y);
						if (flagX && flagY) {
							mVx = minSpeedX;
							mVy = minSpeedY;
							collisionResponce(sprite);
							return;
						}
						else if (flagX) {
							mVx = minSpeedX;
							collisionResponce(sprite);
							return;
						}
						else if (flagY) {
							mVy = minSpeedY;
							collisionResponce(sprite);
							return;
						}
						mVx = 0;
						mVy = 0;
					}
				}
			}

			sprite.setXY(x + mVx, y + mVy);
			mResultVx = mVx;
			mResultVy = mVy;
		}


		function setVector(vx, vy) {
			mVx = vx;
			mVy = vy;
		}

		function setNearFlag(flagX, flagY) {
			mNearFlagX = flagX;
			mNearFlagY = flagY;
		}

		function setMinMaxSpeed(minSpeed, maxspeed) {
			MIN_SPEED = minSpeed;
			MAX_SPEED = maxspeed;
		}

		function resultVx() {
			return mResultVx;
		}

		function resultVy() {
			return mResultVy;
		}

		var checkCollision = function(spr) {
			if (isWall(spr)) {
				return true;
			}

			return checkCollisionEventObj(spr);
		};

		var isWall = function(spr) {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			var ax = spr.hitSquareLeftX();
			var ay = spr.hitSquareTopY();
			var tmpX = ax + spr.hitSquareWidth();
			var tmpY = ay + spr.hitSquareHeight();
			if (ax < 0 || tmpX >= currentMapPanel.fieldWidth() || ay < 0 || tmpY >= currentMapPanel.fieldHeight()) {
				return true;
			}

			if (!spr.collisionFlag()) {
				return false;
			}

			var chipWidth = currentMapPanel.chipWidth();
			var chipHeight = currentMapPanel.chipHeight();
			var x = Math.floor(ax / chipWidth);
			var y = Math.floor(ay / chipHeight);
			var hit = currentMapPanel.getTagData(x, y) === CHIP_WALL;
			if (!hit) {
				x = Math.floor(tmpX / chipWidth);
				hit = currentMapPanel.getTagData(x, y) === CHIP_WALL;
				if (!hit) {
					y = Math.floor(tmpY / chipHeight);
					hit = currentMapPanel.getTagData(x, y) === CHIP_WALL;

					if (!hit) {
						x = Math.floor(ax / chipWidth);
						hit = currentMapPanel.getTagData(x, y) === CHIP_WALL;
					}
				}
			}
			return hit;
		};

		function checkCollisionEventObj(spr) {
			var sprites = RGPP.System.EventObjManager.getInstance().gameObjs("Sprite");
			for (var i = 0; i < sprites.length; ++i) {
				if (spr !== sprites[i]) {
					if (spr.checkCollision(sprites[i])) {
						return true;
					}
				}
			}
			return false;
		}

		function chipWall() {
			return CHIP_WALL;
		}

		return that;
	};

	RGPP.MW.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
