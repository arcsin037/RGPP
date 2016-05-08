/**
 * User module
 * @module User
 * @namespace RGPP.User
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "Goal";

	/**
	 * Script Goal
	 * 
	 * @class Goal
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that;

		var mSprite = null;
		var mRangeX = 0;
		var mRangeY = 0;

		var mInRangeWidth = 40;
		var mInRangeHeight = 40;
		
		var system = RGPP.System;
		var mw = RGPP.MW;

		var mNextMapIDSet = system.IDSet({
			name: "Next Map",
			categoryID: 0,
			dataID: 1,
		});

		var mNextMapEventPos = system.Position2D({
			name: "Next Map Event",
			x: 0,
			y: 0
		});

		that = system.Script();
		that.onLoadMap = onLoadMap;
		that.update = update;
		that.debugDraw = debugDraw;
		that.loadChangeableValuesPerEvent = loadChangeableValuesPerEvent;

		function loadChangeableValuesPerEvent() {
			var changeableValues = [];
			mNextMapIDSet.loadChangeableValues(changeableValues);
			mNextMapEventPos.loadChangeableValues(changeableValues);

			return changeableValues;
		}

		function onLoadMap(event) {
			mSprite = event.createGameObj(mw.RPG.CHARA_CHIP_OBJ_ID, RGPP.mw, "Sprite");
			mSprite.setOffsetXY(5, 15, 5, 5);
		}

		function update(event) {
			var mm = system.MapManager.getInstance();

			var chipWidth = mm.chipWidth();
			var chipHeight = mm.chipHeight();
			// in Range
			var centerX = event.currentX() * chipWidth + chipWidth / 2;
			var centerY = event.currentY() * chipHeight + chipHeight / 2;

			mRangeX = centerX - mInRangeWidth / 2;
			mRangeY = centerY - mInRangeHeight / 2;

			var inRangeEvents = mw.EventOperator.getInstance().inRangeEvents(
				mSprite, mRangeX, mRangeY, mInRangeWidth, mInRangeHeight);

			for (var i = 0; i < inRangeEvents.length; ++i) {
				console.log(inRangeEvents[i].currentStateKey());
				if (inRangeEvents[i].currentStateKey() === "player") {
					var categoryID = mNextMapIDSet.categoryID();
					var mapID = mNextMapIDSet.dataID();
					var nextX = mNextMapEventPos.x();
					var nextY = mNextMapEventPos.y();
					inRangeEvents[i].setPosition(categoryID, mapID, nextX, nextY);
					mm.changeMap(categoryID, mapID);
					return;
				}
			}
		}

		function debugDraw(ctx) {
			// Draw Range Square
			var fundDrawing = system.FundamentalDrawing.getInstance();
			fundDrawing.setColor(ctx, 0, 0, 255, 1);
			fundDrawing.drawRect(ctx,
				mRangeX, mRangeY, mInRangeWidth, mInRangeHeight, 2
			);
		}

		return that;
	};

	RGPP.User.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
