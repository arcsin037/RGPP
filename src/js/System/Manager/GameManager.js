/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "GameManager";

	/**
	 * Game Manager
	 * @class GameManager
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		// operate game
		that.togglePause = togglePause;
		that.quitGame = quitGame;

		// Getter
		that.isTestMode = isTestMode;
		that.isEmulationMode = isEmulationMode;
		that.isDebugMode = isDebugMode;

		// Setter
		that.setTestMode = setTestMode;
		that.setEmulationMode = setEmulationMode;
		that.setDebugMode = setDebugMode;


		// Private variable
		var FRAME_RATE = 20, // (frame / second)
			INTERVAL = 1000 / FRAME_RATE,

			mDebugModeFlag = false,
			mPauseGameFlag = false,
			mTestModeFlag = false,
			mEmulationMode = false,

			mTimer = RGPP.System.Timer(),

			requestAnimationFrame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.setTimeout;

		function startGame() {
			requestAnimationFrame(alwaysUpdate, INTERVAL);
		}

		function togglePause() {
			mPauseGameFlag = !mPauseGameFlag;
			return mPauseGameFlag;
		}

		function quitGame() {
			RGPP.System.ImageDataManager.getInstance().clearObj();
			RGPP.System.EventObjManager.getInstance().clear();
			RGPP.System.EmulationModeCanvas.getInstance().clear();
		}

		function alwaysUpdate() {
			var eom = RGPP.System.EventObjManager.getInstance();
			eom.organizeEventObj();
			if (!mPauseGameFlag) {
				onUpdate();
			}
			onDraw();

			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			var currentMapPanel = mapPanelList.currentMapPanel();
			if (currentMapPanel !== null) {
				var fps = mTimer.measureFPS();
				currentMapPanel.setFPS(fps);
			}
			if (mTestModeFlag) {
				requestAnimationFrame(alwaysUpdate, INTERVAL);
			}
		}

		function onUpdate() {
			var cm = RGPP.System.ControlManager.getInstance();
			var eom = RGPP.System.EventObjManager.getInstance();

			// update event instance
			eom.updateEventObj();

			// update event instance for debug
			if (mDebugModeFlag) {
				eom.updateEventObjDebug();
			}

			RGPP.System.EventDialogList.getInstance().updateDialog();

			eom.updateGameObj();

			// save previous pad info
			cm.savePreviousInputInfo();
		}

		function onDraw() {
			var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
			if (currentMapPanel !== null) {
				var eom = RGPP.System.EventObjManager.getInstance();
				var ctx = currentMapPanel.getCtx();

				eom.sortGameObj();

				// draw map
				currentMapPanel.paintComponent();

				// draw event instance
				eom.drawEventObj(ctx);

				if (mDebugModeFlag) {
					eom.drawEventObjDebug(ctx);
				}

				// Draw Filter
				RGPP.System.ImageFilterInstance.getInstance().filter(ctx);

				if (mEmulationMode) {
					// Draw to Emulation Canvas
					var scrollX = RGPP.System.CoordinateSystem.getInstance().convertMapToScreenX(0);
					var scrollY = RGPP.System.CoordinateSystem.getInstance().convertMapToScreenY(0);
					var imageData = ctx.getImageData(scrollX, scrollY, RGPP.Config.RESOLUTION_X, RGPP.Config.RESOLUTION_Y);
					RGPP.System.EmulationModeCanvas.getInstance().draw(imageData);
				}

				// Draw System Rect
				currentMapPanel.drawEditSystemRect();
			}
		}


		function setTestMode(testModeFlag) {
			// Reset Filter
			RGPP.System.ImageFilterInstance.getInstance().resetFilter();
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			var eom = RGPP.System.EventObjManager.getInstance();
			var eventMoveInfoList = RGPP.System.EventMoveInfoList.getInstance();

			if (testModeFlag === true && mTestModeFlag === false) {
				mTestModeFlag = true;
				// clear event instance
				eventMoveInfoList.clear();
				eom.clear();

				// set game mode
				for (var mapPanelIndex = 0; mapPanelIndex < mapPanelList.size(); mapPanelIndex += 1) {
					mapPanelList.panel(mapPanelIndex).setGameMode();
					mapPanelList.panel(mapPanelIndex).resetEventParam();
				}

				if (mapPanelList.size() > 0) {
					// load initialized event instance of current map panel
					eom.loadInitEventObj();
				}

				RGPP.System.EventDialogList.getInstance().updateDialog();

				RGPP.System.ImageDataManager.getInstance().clearObj();

				// start game main loop
				startGame();

				eom.onLoad();
			}
			else if (testModeFlag === false && mTestModeFlag === true) {
				mTestModeFlag = false;
				// stop game main loop
				quitGame();

				// reset game mode
				for (var mapPanelIndex = 0; mapPanelIndex < mapPanelList.size(); mapPanelIndex += 1) {
					mapPanelList.panel(mapPanelIndex).resetGameMode();
				}
				RGPP.System.EmulationModeCanvas.getInstance().resetInput();

				// clear event instance
				eventMoveInfoList.clear();
				eom.clear();
			}
		}


		function setDebugMode(debugModeFlag) {
			mDebugModeFlag = debugModeFlag;
		}

		function setEmulationMode(emulationFlag) {
			mEmulationMode = emulationFlag;
		}

		function isEmulationMode() {
			return mEmulationMode;
		}

		function isTestMode() {
			return mTestModeFlag;
		}

		function isDebugMode() {
			return mDebugModeFlag;
		}


		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});


})((this || 0).self || global);