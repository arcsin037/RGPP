/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "Sprite";
	/**
	 * Base of Sprite 
	 * @class Sprite
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec, my) {
		my = my || {};

		var that = RGPP.System.ImageObj(spec, my);

		// public method
		// Original
		that.onLoad = onLoad;
		that.onUpdate = onUpdate;
		that.onDraw = onDraw;
		// Default
		that.update = update;
		that.debugDraw = debugDraw;

		// Setter 
		that.setOffsetXY = setOffsetXY;
		that.setSpeed = setSpeed;
		that.setCollisionFlag = setCollisionFlag;
		that.setDirectionXY = setDirectionXY;
		that.setEventPosition = setEventPosition;

		// Getter
		that.checkCollision = checkCollision;
		that.inRange = inRange;
		that.hitSquareLeftX = hitSquareLeftX;
		that.hitSquareRightX = hitSquareRightX;
		that.hitSquareTopY = hitSquareTopY;
		that.hitSquareBottomY = hitSquareBottomY;
		that.hitSquareWidth = hitSquareWidth;
		that.hitSquareHeight = hitSquareHeight;
		that.getSpeed = getSpeed;
		that.centerX = centerX;
		that.centerY = centerY;
		that.collisionFlag = getCollisionFlag;

		that.directX = directX;
		that.directY = directY;

		that.sortFunction = sortFunction;

		// Direction of Event Instance
		var mDirectX = 0;
		var mDirectY = 1;

		var mSpeed = 0;
		var mLoadEnd = false;
		var mHitOffsetX1 = 0;
		var mHitOffsetY1 = 0;
		var mHitOffsetX2 = 0;
		var mHitOffsetY2 = 0;
		var UPDATE_INTERVAL = 5;
		var mHitSquare = {
			leftX: 0,
			topY: 0,
			rightX: 1,
			bottomY: 1,
		};

		var mInitEventX = 0;
		var mInitEventY = 0;
		var mChipWidth = 0;
		var mChipHeight = 0;
		var mCollisionFlag = false;

		function onLoad() {
			my.onLoad();
			if (that.isLoadEnd() && !mLoadEnd) {
				setHitSquare();
				that.setSpriteAnimFlag(true);
				mLoadEnd = true;
			}
		}


		function onUpdate() {

		}


		function update() {
			onLoad();

			var directX = that.directX();
			var directY = that.directY();
			if (directX === 1) {
				if (directY === 1) {
					//right down
					that.setAnimPatternArrayIndex(5);
				}
				else if (directY === -1) {
					//right up
					that.setAnimPatternArrayIndex(7);
				}
				else if (directY === 0) {
					//right
					that.setAnimPatternArrayIndex(2);
				}
			}
			else if (directX === -1) {
				if (directY === 1) {
					//left down
					that.setAnimPatternArrayIndex(4);
				}
				else if (directY === -1) {
					//left up
					that.setAnimPatternArrayIndex(6);
				}
				else if (directY === 0) {
					//left
					that.setAnimPatternArrayIndex(1);
				}
			}
			else if (directX === 0) {
				if (directY === 1) {
					//down
					that.setAnimPatternArrayIndex(0);
				}
				else if (directY === -1) {
					//up
					that.setAnimPatternArrayIndex(3);
				}
			}
			that.stepAnim();
			that.updateRotate();
			that.checkOnMouse();

		}

		function onDraw(ctx) {

		}


		function debugDraw(ctx) {
			// Draw Hit Square
			var lineWidth = 2;
			var fundDrawing = RGPP.System.FundamentalDrawing.getInstance();
			fundDrawing.setColor(ctx, 0, 255, 0, 1);


			var divideWidth = that.divideWidth();
			var divideHeight = that.divideHeight();

			if (divideWidth <= 0 || divideHeight <= 0) {
				return;
			}

			fundDrawing.drawRect(
				ctx,
				hitSquareLeftX(),
				hitSquareTopY(),
				hitSquareWidth(),
				hitSquareHeight(),
				lineWidth);
		}


		function setOffsetXY(offsetX1, offsetY1, offsetX2, offsetY2) {
			mHitOffsetX1 = offsetX1;
			mHitOffsetX2 = offsetX2;

			mHitOffsetY1 = offsetY1;
			mHitOffsetY2 = offsetY2;

		}

		function setHitSquare() {
			var offsetX1 = mHitOffsetX1;
			var offsetX2 = mHitOffsetX2;
			var offsetY1 = mHitOffsetY1;
			var offsetY2 = mHitOffsetY2;

			var sizeX = Math.floor(that.divideWidth() * that.scaleX());
			var sizeY = Math.floor(that.divideHeight() * that.scaleX());

			mHitSquare = {
				leftX: offsetX1,
				topY: offsetY1,
				rightX: sizeX - offsetX2,
				bottomY: sizeY - offsetY2
			};

			// Correct position
			var halfChipWidth = mChipWidth / 2;
			var halfChipHeight = mChipHeight / 2;
			var correctX = 2 * mInitEventX - that.centerX() + halfChipWidth;
			var correctY = 2 * mInitEventY - that.centerY() + halfChipHeight;
			that.setXY(correctX, correctY);
		}

		function checkCollision(spr) {

			if (!spr.collisionFlag()) {
				return false;
			}

			if (!mCollisionFlag) {
				return false;
			}

			var a = mHitSquare,
				b = spr;

			var al = a.leftX + that.getX(),
				ar = a.rightX + that.getX();
			var at = a.topY + that.getY(),
				ab = a.bottomY + that.getY();

			var bl = b.hitSquareLeftX(),
				br = b.hitSquareRightX();
			var bt = b.hitSquareTopY(),
				bb = b.hitSquareBottomY();

			if (al < br && bl < ar && at < bb && bt < ab) {
				return true;
			}
			return false;
		}

		function inRange(x, y, width, height) {
			var a = mHitSquare;

			var al = a.leftX + that.getX(),
				ar = a.rightX + that.getX();
			var at = a.topY + that.getY(),
				ab = a.bottomY + that.getY();

			var bl = x,
				br = x + width;
			var bt = y,
				bb = y + height;

			if (al < br && bl < ar && at < bb && bt < ab) {
				return true;
			}
			return false;
		}

		function hitSquareWidth() {
			var a = mHitSquare;
			return (a.rightX - a.leftX);
		}

		function hitSquareHeight() {
			var a = mHitSquare;
			return (a.bottomY - a.topY);
		}

		function setSpeed(speed) {
			mSpeed = speed;
		}

		function getSpeed() {
			return mSpeed;
		}

		function centerX() {
			var centerXPos = that.getX() + (mHitSquare.rightX + mHitSquare.leftX) / 2;
			return centerXPos;
		}

		function centerY() {
			var centerYPos = that.getY() + (mHitSquare.bottomY + mHitSquare.topY) / 2;
			return centerYPos;
		}

		function hitSquareLeftX() {
			return that.getX() + mHitSquare.leftX;
		}

		function hitSquareTopY() {
			return that.getY() + mHitSquare.topY;
		}

		function hitSquareRightX() {
			return that.getX() + mHitSquare.rightX;
		}

		function hitSquareBottomY() {
			return that.getY() + mHitSquare.bottomY;
		}

		function setCollisionFlag(flag) {
			mCollisionFlag = flag;
		}

		function getCollisionFlag() {
			return mCollisionFlag;
		}

		function setEventPosition(eventX, eventY) {
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			var currentMapPanel = mapPanelList.currentMapPanel();
			var currentMapCategoryID = currentMapPanel.categoryID();
			var currentMapDataID = currentMapPanel.id();

			mChipWidth = mapPanelList.chipWidth(currentMapCategoryID, currentMapDataID);
			mChipHeight = mapPanelList.chipHeight(currentMapCategoryID, currentMapDataID);
			var ax = eventX * mChipWidth;
			var ay = eventY * mChipHeight;

			ax = ax || 0;
			ay = ay || 0;

			mInitEventX = ax;
			mInitEventY = ay;
			that.setXY(ax, ay);
		}

		function setDirectionXY(vx, vy) {
			//Nothing x == 0 && y == 0
			if (vx === 0 && vy === 0) {
				return;
			}
			if (vx < 0) {
				mDirectX = -1;
			}
			else if (vx > 0) {
				mDirectX = 1;
			}
			else {
				mDirectX = 0;
			}
			if (vy < 0) {
				mDirectY = -1;
			}
			else if (vy > 0) {
				mDirectY = 1;
			}
			else {
				mDirectY = 0;
			}
		}

		function directX() {
			return mDirectX;
		}

		function directY() {
			return mDirectY;
		}

		function sortFunction(a, b) {
			if (a.getY() < b.getY()) {
				return -1;
			}
			if (a.getY() > b.getY()) {
				return 1;
			}
			return 0;
		}

		return that;
	};

	RGPP.MW.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
