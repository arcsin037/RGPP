/**
 * User module
 * @module User
 * @namespace RGPP.User
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "OgreMode";

	/**
	 * Script Ogre Mode
	 * @class OgreMode
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that;

		var mVx = 0;
		var mVy = 0;
		var mPrevVx = 0;
		var mPrevVy = 0;
		var mGoalPositionX = 0;
		var mGoalPositionY = 0;

		var mRangeX = 0;
		var mRangeY = 0;

		var mInRangeWidth = 40;
		var mInRangeHeight = 40;
		var system = RGPP.System;

		var MIN_SPEED = system.ChangeableValue({
			name: "Min Speed",
			minValue: 0,
			maxValue: 30,
			defaultValue: 4,
			stepValue: 1,
			type: "spinner"
		});

		var SPEED_SCALE_FACTOR = system.ChangeableValue({
			name: "speed scale factor",
			minValue: 1.2,
			maxValue: 4.0,
			defaultValue: 2.0,
			stepValue: 0.1,
			type: "spinner"
		});

		var mGameOverMapCategoryID = system.ChangeableValue({
			name: "Game Over Map Category ID",
			minValue: 0,
			maxValue: 1,
			defaultValue: 0,
			type: "spinner",
		});

		var mGameOverMapID = system.ChangeableValue({
			name: "Game Over Map ID",
			minValue: 0,
			maxValue: 10,
			defaultValue: 0,
			type: "spinner",
		});

		var MAX_SPEED = 8;

		var State = {
			NORMAL: 0,
			TRACE: 1,
			FREE: 2,
		};

		var mNearFlagX;
		var mNearFlagY;

		var mSearchRangeX = 0;
		var mSearchRangeY = 0;

		var mSearchRangeWidth = 200;
		var mSearchRangeHeight = 200;

		var mState = State.NORMAL;

		var mNormalFrameCount = 0;
		var mNormalFrameLimit = 0;
		var NORMAL_MAX_FRAME = 30;

		var mTraceFrameCount = 0;
		var TRACE_MAX_FRAME = 30;

		var mFreeFrameCount = 0;
		var mFreeFrameLimit = 0;
		var FREE_MAX_FRAME = 60;

		var mCollisionFrameCount = 0;
		var mCollisionFrameLimit = 0;
		var COLLISION_FRAME_MAX = 30;

		var PERMISSIBLE_HALF_WIDTH = 2;
		var PERMISSIBLE_HALF_HEIGHT = 2;

		var mSearchedArray = null;
		var mSpriteCollision = system.SpriteCollision();

		that = system.Script();
		that.onLoadGame = onLoadGame;
		that.onLoadMap = onLoadMap;
		that.debugDraw = debugDraw;
		that.loadChangeableValuesPerEvent = loadChangeableValuesPerEvent;
		that.onStateTransition = onStateTransition;
		that.update = update;
		that.debugUpdate = debugUpdate;

		var initialize = function(event) {
			sprite.setSpeed(MIN_SPEED.value());

			var aImageName = "hinagata.png";
			sprite.setOffsetXY(5, 15, 5, 5);
			sprite.setDivideXY(6, 4);
			sprite.setAnimImage(aImageName, [0, 1, 2, 1]);

			mState = State.NORMAL;
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
			changeableValues.push(mGameOverMapCategoryID);
			changeableValues.push(mGameOverMapID);
			return changeableValues;
		}

		function update(event) {
			mVx = 0;
			mVy = 0;
			MAX_SPEED = MIN_SPEED.value() * SPEED_SCALE_FACTOR.value();

			// in Range
			var myCenterX = sprite.centerX();
			var myCenterY = sprite.centerY();

			// TRACE
			var gm = system.GameManager.getInstance();
			var sprites = gm.getEventObjs();

			var minDistance = Number.MAX_VALUE;
			for (var i = 0; i < sprites.length; ++i) {
				if (sprites[i] === sprite) {
					continue;
				}

				if (sprites[i].event().currentStateKey() === "player") {
					var anotherSprite = sprites[i];
					var ax = anotherSprite.centerX();
					var ay = anotherSprite.centerY();

					var dirX = ax - myCenterX;
					var dirY = ay - myCenterY;
					// Manhattan distance
					var distance = Math.abs(dirX) + Math.abs(dirY);
					if (distance < minDistance) {
						minDistance = distance;
						mGoalPositionX = ax;
						mGoalPositionY = ay;
					}
				}

			}

			if (minDistance === Number.MAX_VALUE) {
				return;
			}

			// in Range
			myCenterX = sprite.centerX();
			myCenterY = sprite.centerY();

			mRangeX = myCenterX - mInRangeWidth / 2;
			mRangeY = myCenterY - mInRangeHeight / 2;

			var inRangeEvents = gm.inRangeEvents(
				sprite, mRangeX, mRangeY, mInRangeWidth, mInRangeHeight);

			// in Range
			mSearchRangeX = myCenterX - mSearchRangeWidth / 2;
			mSearchRangeY = myCenterY - mSearchRangeHeight / 2;

			if (sprite.directX() < 0) {
				mSearchRangeX = myCenterX - mSearchRangeWidth;
			}
			else if (sprite.directX() > 0) {
				mSearchRangeX = myCenterX;
			}

			if (sprite.directY() < 0) {
				mSearchRangeY = myCenterY - mSearchRangeHeight;
			}
			else if (sprite.directY() > 0) {
				mSearchRangeY = myCenterY;
			}

			if (inRangeEvents !== null) {
				// Update Event State
				for (var i = 0; i < inRangeEvents.length; ++i) {
					if (inRangeEvents[i].currentStateKey() === "player") {
						mState = State.NORMAL;
						var gameOverMapCategoryID = mGameOverMapCategoryID.value();
						var gameOverMapID = mGameOverMapID.value();
						gm.changeMap(gameOverMapCategoryID, gameOverMapID);
						return;
					}
				}
			}

			setSpriteBehavior(sprite);

			if (mState === State.TRACE) {
				sprite.setAddColor(200, 0, 0);
			}
			else if (mState === State.FREE) {
				sprite.setAddColor(0, 200, 0);
			}
			else {
				sprite.setAddColor(0, 0, 0);
			}


			//Collision Response
			mSpriteCollision.setVector(mVx, mVy);
			mSpriteCollision.setNearFlag(mNearFlagX, mNearFlagY);
			mSpriteCollision.setMinMaxSpeed(MIN_SPEED.value(), MAX_SPEED);
			mSpriteCollision.collisionResponce(sprite);
			mVx = mSpriteCollision.resultVx();
			mVy = mSpriteCollision.resultVy();

			sprite.setDirectionXY(mVx, mVy);
			mPrevVx = mVx;
			mPrevVy = mVy;

		}

		function debugUpdate(event) {
			mSpriteCollision.debugUpdate(event);
		}

		function debugDraw(ctx) {
			// Draw Range Square
			var lineWidth = 2;
			var fd = system.FundamentalDrawing.getInstance();
			fd.setColor(ctx, 255, 0, 0, 1);
			fd.drawRect(ctx, mRangeX, mRangeY, mInRangeWidth, mInRangeHeight, lineWidth);

			mSpriteCollision.debugDraw(ctx);

			// Draw Search Square
			fd.setColor(ctx, 0, 255, 0, 1);
			fd.drawRect(ctx, mSearchRangeX, mSearchRangeY, mSearchRangeWidth, mSearchRangeHeight, lineWidth);

			// Draw Search Square
			if (mState === State.NORMAL) {
				fd.setColor(ctx, 0, 255, 255, 1);
				var chipSize = system.GameManager.getInstance().chipSize();
				if (mSearchedArray !== null) {
					for (var y = 0; y < mSearchedArray.length; y += 1) {
						if (mSearchedArray[y] !== undefined) {
							for (var x = 0; x < mSearchedArray[y].length; x += 1) {
								if (mSearchedArray[y][x] === true) {
									fd.drawRect(ctx, mSearchRangeX + x * chipSize, mSearchRangeY + y * chipSize, chipSize, chipSize, lineWidth);
								}
							}
						}
					}
				}
			}
		}

		//private Function
		var setSpriteBehavior = function(sprite) {
			var centerX = sprite.centerX();
			var centerY = sprite.centerY();
			var gX = mGoalPositionX;
			var gY = mGoalPositionY;

			// Free mode
			if (mState === State.FREE) {
				mFreeFrameCount += 1;
				if (mFreeFrameCount > mFreeFrameLimit) {
					mState = State.NORMAL;
					sprite.setSpeed(MIN_SPEED.value());
					randomMove(sprite);
					return;
				}
			}

			// Normal mode
			var rightX = mSearchRangeX + mSearchRangeWidth;
			var bottomY = mSearchRangeY + mSearchRangeHeight;
			if (mState === State.NORMAL) {
				if (mSearchRangeX < gX && gX < rightX && mSearchRangeY < gY && gY < bottomY) {

					var gm = system.GameManager.getInstance();

					var mapTags = gm.inRangeMapTagFromPixelCoord(mSearchRangeX, mSearchRangeY, mSearchRangeWidth, mSearchRangeHeight);
					var directX = sprite.directX();
					var directY = sprite.directY();

					var initSearchX;
					var initSearchY;
					if (directX > 0) { // right
						initSearchX = 0;
					}
					else if (directX < 0) { // left
						initSearchX = mapTags[0].length - 1;
					}
					else {
						initSearchX = Math.floor(mapTags[0].length / 2);

					}

					if (directY > 0) { // down
						initSearchY = 0;

					}
					else if (directY < 0) { //up
						initSearchY = mapTags.length - 1;
					}
					else {
						initSearchY = Math.floor(mapTags.length / 2);
					}

					var searchedArray = {
						lowerLimitX: 0,
						upperLimitX: mapTags[0].length,
						lowerLimitY: 0,
						upperLimitY: mapTags.length,
						searched: []
					};

					for (var i = 0; i < mapTags.length; i += 1) {
						searchedArray.searched[i] = [mapTags[i].length];
						for (var j = 0; j < mapTags[i].length; j += 1) {
							searchedArray.searched[i][j] = false;
						}
					}

					var inRange = searchGoal(initSearchX, initSearchY, searchedArray, mapTags, directX, directY);
					console.log(searchedArray);
					console.log("inRange = " + inRange);
					mSearchedArray = searchedArray.searched;

					if (inRange) {
						mState = State.TRACE;
						sprite.setSpeed(MAX_SPEED);
						return;
					}
				}
				mNormalFrameCount += 1;
				if (mNormalFrameCount > mNormalFrameLimit) {
					sprite.setSpeed(MIN_SPEED.value());
					randomMove(sprite);
					return;
				}
			}

			var tmpVx = mPrevVx;
			var tmpVy = mPrevVy;
			var prevVx = tmpVx;
			var prevVy = tmpVy;

			// Trace mode
			if (mState === State.TRACE) {
				var speed = sprite.getSpeed();
				if (mSearchRangeX > gX || gX > rightX || mSearchRangeY > gY || gY > bottomY) {
					mTraceFrameCount += 1;

					if (mTraceFrameCount >= TRACE_MAX_FRAME) {
						mState = State.NORMAL;
						sprite.setSpeed(MIN_SPEED.value());
						randomMove(sprite);
						return;
					}
				}
				else {
					mTraceFrameCount = 0;
				}

				if (centerX < gX - PERMISSIBLE_HALF_WIDTH && prevVx >= 0) {
					tmpVx = speed;
				}
				else if (centerX > gX + PERMISSIBLE_HALF_WIDTH && prevVx <= 0) {
					tmpVx = -speed;
				}
				else if (prevVy !== 0) {
					tmpVx = 0;
				}

				if (centerY < gY - PERMISSIBLE_HALF_HEIGHT && prevVy >= 0) {
					tmpVy = speed;
				}
				else if (centerY > gY + PERMISSIBLE_HALF_HEIGHT && prevVy <= 0) {
					tmpVy = -speed;
				}
				else if (prevVx !== 0) {
					tmpVy = 0;
				}

				if (Math.abs(centerX - gX) < speed) {
					tmpVx = 0;
					mNearFlagX = true;
				}

				if (Math.abs(centerY - gY) < speed) {
					tmpVy = 0;
					mNearFlagY = true;
				}

			}

			var hopeVx = tmpVx;
			var hopeVy = tmpVy;

			if (hopeVx !== prevVx && hopeVy !== prevVy) {
				mCollisionFrameCount = mCollisionFrameCount + 1;
				if (mCollisionFrameCount > mCollisionFrameLimit) {
					sprite.setSpeed(MIN_SPEED.value());
					randomMove(sprite);
					mState = State.FREE;
					return;
				}
			}
			else if (hopeVx !== prevVx) {
				//previous collide X
				mCollisionFrameCount = mCollisionFrameCount + 1;
				if (mCollisionFrameCount > mCollisionFrameLimit) {
					if (hopeVy === 0) {
						sprite.setSpeed(MIN_SPEED.value());
						randomMove(sprite);
						mState = State.FREE;
						return;
					}
					else {
						tmpVx *= -1;
						mCollisionFrameCount = 0;
					}
				}
			}
			else if (hopeVy !== prevVy) {
				// previous collide Y
				mCollisionFrameCount = mCollisionFrameCount + 1;
				if (mCollisionFrameCount > mCollisionFrameLimit) {
					if (hopeVx === 0) {
						sprite.setSpeed(MIN_SPEED.value());
						randomMove(sprite);
						mState = State.FREE;
						return;
					}
					else {
						tmpVy *= -1;
						mCollisionFrameCount = 0;
					}
				}
			}
			else {
				mCollisionFrameCount = 0;
			}
			mVx = tmpVx;
			mVy = tmpVy;

		};

		var randomMove = function(sprite) {
			var ri = system.Random.getInstance();
			var speed = sprite.getSpeed();
			var randomX = ri.createRandInt({
				from: -1,
				to: 1
			});
			var randomY = ri.createRandInt({
				from: -1,
				to: 1
			});
			randomX = randomX * speed;
			randomY = randomY * speed;
			mVx = randomX;
			mVy = randomY;

			mFreeFrameLimit = ri.createRandInt({
				from: FREE_MAX_FRAME / 3,
				to: FREE_MAX_FRAME
			});

			mCollisionFrameLimit = ri.createRandInt({
				from: COLLISION_FRAME_MAX / 3,
				to: COLLISION_FRAME_MAX
			});

			mNormalFrameLimit = ri.createRandInt({
				from: NORMAL_MAX_FRAME / 3,
				to: NORMAL_MAX_FRAME
			});

			mFreeFrameCount = 0;
			mNormalFrameCount = 0;
			mCollisionFrameCount = 0;

		};


		var searchGoal = function(searchX, searchY, searchedArray, mapTags, directX, directY) {
			if (searchedArray.upperLimitY <= searchY || searchY < searchedArray.lowerLimitY) {
				return false;
			}

			if (searchedArray.upperLimitX <= searchX || searchX < searchedArray.lowerLimitX) {
				return false;
			}

			if (searchedArray.searched[searchY][searchX] === true) {
				return false;
			}

			if (mapTags[searchY][searchX] === mSpriteCollision.chipWall()) {
				return false;
			}

			var limitX = searchedArray.upperLimitX;
			var limitY = searchedArray.upperLimitY;
			var chipSize = system.GameManager.getInstance().chipSize();

			var result = false;
			var x = 0;
			var y = 0;

			while (true) {
				var yIndex = searchY + y * directY;
				var xIndex = searchX + x * directX;
				if (y < limitY) {
					y += 1;
				}
				else {
					break;
				}

				if (x < limitX) {
					x += 1;
				}
				else {
					break;
				}

				if (searchedArray.upperLimitY <= yIndex || yIndex < searchedArray.lowerLimitY) {
					continue;
				}
				if (searchedArray.upperLimitX <= xIndex || xIndex < searchedArray.lowerLimitX) {
					continue;
				}

				if (searchedArray.searched[yIndex][xIndex] !== true) {
					searchedArray.searched[yIndex][xIndex] = true;
					if (mapTags[yIndex][xIndex] === mSpriteCollision.chipWall()) {
						break;
					}
					else {
						var leftX = mSearchRangeX + chipSize * xIndex;
						var rightX = mSearchRangeX + chipSize * (xIndex + 1);
						var topY = mSearchRangeY + chipSize * yIndex;
						var bottomY = mSearchRangeY + chipSize * (yIndex + 1);
						if (leftX < mGoalPositionX && mGoalPositionX < rightX && topY < mGoalPositionY && mGoalPositionY < bottomY) {
							return true;
						}
					}
				}
			}
			if (directX !== 0 && directY !== 0) {
				result = result || searchGoal(searchX + directX, searchY, searchedArray, mapTags, directX, directY);
				result = result || searchGoal(searchX, searchY + directY, searchedArray, mapTags, directX, directY);

			}
			else {
				result = result || searchGoal(searchX - directY, searchY - directX, searchedArray, mapTags, directX, directY);
				result = result || searchGoal(searchX + directY, searchY + directX, searchedArray, mapTags, directX, directY);
			}

			return result;
		};

		return that;
	};


	RGPP.User.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
