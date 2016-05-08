(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "CameraController";
	var constructor = function() {
		var that;

		var mScrollX = 0;
		var mScrollY = 0;

		that = RGPP.System.Script();

		that.onLoadGame = onLoadGame;
		that.onLoadMap = onLoadMap;
		that.onStateTransition = onStateTransition;
		that.update = update;

		that.debugDraw = debugDraw;
		that.draw = draw;
		that.setScrollXY = setScrollXY;
		that.getScrollX = getScrollX;
		that.getScrollY = getScrollY;

		var initialize = function() {
			mScrollX = 0;
			mScrollY = 0;
		};

		function onLoadGame(event) {
			initialize();
		}

		function onLoadMap(event) {
			initialize();
		}

		function onStateTransition(event) {}

		function update(event) {}

		function debugDraw(ctx) {
			// Draw Camera Angle
			var fundDrawing = RGPP.System.FundamentalDrawing.getInstance();
			fundDrawing.setColor(ctx, 255, 255, 255, 1);
			fundDrawing.drawRect(ctx, mScrollX, mScrollY, RGPP.Config.RESOLUTION_X, RGPP.Config.RESOLUTION_Y, 2);
		}

		function draw(ctx) {}

		function setScrollXY(x, y) {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();

			var halfWidth = RGPP.Config.RESOLUTION_X / 2;
			var halfHeight = RGPP.Config.RESOLUTION_Y / 2;
			mScrollX = x - halfWidth;
			mScrollY = y - halfHeight;
			if (mScrollX < 0) {
				mScrollX = 0;
			}
			if (mScrollY < 0) {
				mScrollY = 0;
			}
			var maxScrollWidth = currentMapPanel.fieldWidth() - RGPP.Config.RESOLUTION_X;
			if (mScrollX >= maxScrollWidth) {
				mScrollX = maxScrollWidth;
			}
			var maxScrollHeight = currentMapPanel.fieldHeight() - RGPP.Config.RESOLUTION_Y;
			if (mScrollY >= maxScrollHeight) {
				mScrollY = maxScrollHeight;
			}

			if (mScrollX < 0) {
				mScrollX = 0;
			}

			if (mScrollY < 0) {
				mScrollY = 0;
			}

			RGPP.System.CoordinateSystem.getInstance().setScrollXY(mScrollX, mScrollY);

		}

		function getScrollX() {
			return mScrollX;
		}

		function getScrollY() {
			return mScrollY;
		}
		return that;
	};
	RGPP.MW.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});
})((this || 0).self || global);
