/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	/* global $ */
	"use strict";
	var objName = "EmulationModeCanvas";

	/**
	 * Emulation Mode Canvas
	 * @class Emulation Mode Canvas
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		var scriptUtil = RGPP.System.ScriptUtil.getInstance();

		var ScreenType = {
			WINDOW: 0,
			FULL_SCREEN: 1,
			PSEUDO_FULL_SCREEN: 2,
		};

		var mScreenType = ScreenType.WINDOW;

		// var mCanvas = RGPP.System.OperateCanvas.getInstance().createCanvas();
		// var mCtx = RGPP.System.OperateCanvas.getInstance().getContext2D(mCanvas);

		// var mDivElement = document.createElement("div");
		// mDivElement.contentEditable = true;

		// var mButtonDiv = document.createElement("div");


		// var operateCanvas = RGPP.System.OperateCanvas.getInstance();
		// var mFullScreenImage = operateCanvas.loadImage(RGPP.Config.SYSTEM_IMAGE_PATH + "fullScreenIcon.svg");
		// var mPseudoFullScreenImage = operateCanvas.loadImage(RGPP.Config.SYSTEM_IMAGE_PATH + "pseudoFullScreenIcon.svg");
		// var mWindowModeImage = operateCanvas.loadImage(RGPP.Config.SYSTEM_IMAGE_PATH + "windowIcon.svg");

		// var mFullScreenButton = RGPP.System.Button(mFullScreenImage);

		// var FULL_SCREEN_CLASS_STRING = "FullScreen";
		// $(mFullScreenButton.element()).attr("class", FULL_SCREEN_CLASS_STRING);

		// var mPseudoFullScreenButton = null;
		// var PSEUDO_FULL_SCREEN_CLASS_STRING = "PseudoFullScreen";

		// var mWindowBar = document.createElement("div");

		// $(mWindowBar).append("<b>" + RGPP.Config.GAME_NAME + "</b>");
		// $(mWindowBar).append(mButtonDiv);
		// $(mDivElement).append(mWindowBar);
		// $(mDivElement).append(mCanvas);
		
		var mDivElement = $("#emulation-version");
		var mWindowBar = $("#emulation-window-bar");
		var mCanvas = $("#emulation-window-canvas");
		var mCtx = RGPP.System.OperateCanvas.getInstance().getContext2D(mCanvas);
		var mButtonDiv = $("#emulation-window-buttons");

		$(mDivElement).draggable({
			handle: mWindowBar
		});

		var mMouse = null;
		var mPad = null;
		var mScale = 1.0;
		var mBarHeight = 0.0;

		// interface
		that.initialize = initialize;
		that.element = element;
		that.buttonElement = buttonElement;

		that.clear = clear;
		that.draw = draw;

		that.getMouseX = getMouseX;
		that.getMouseY = getMouseY;

		that.savePreviousInputInfo = savePreviousInputInfo;
		that.isPressedLeftMouseButton = isPressedLeftMouseButton;
		that.isLeftClick = isLeftClick;
		that.isKeyOnRight = isKeyOnRight;
		that.isKeyOnLeft = isKeyOnLeft;
		that.isKeyOnUp = isKeyOnUp;
		that.isKeyOnDown = isKeyOnDown;
		that.isKeyTriggeredA = isKeyTriggeredA;
		that.isKeyTriggeredB = isKeyTriggeredB;
		that.isKeyTriggeredC = isKeyTriggeredC;
		that.isKeyOnC = isKeyOnC;

		that.resetInput = resetInput;
		that.copyPadInfo = copyPadInfo;
		that.setPadInfo = setPadInfo;
		that.hide = hide;

		$(global).load(function() {
			initScreen();
		});

		$(global).resize(function() {
			initScreen();
		});


		function initialize() {
			mDivElement.show();
			var cssStyle = RGPP.System.CssStyle.getInstance();
			var canvasWidth = RGPP.Config.RESOLUTION_X;
			var canvasHeight = RGPP.Config.RESOLUTION_Y;

			cssStyle.setRelativeCenterPosition(mCanvas);
			cssStyle.setResolution(mCanvas, canvasWidth, canvasHeight);
			cssStyle.setPixelSize(mCanvas, canvasWidth, canvasHeight);
			
			console.log(mCanvas);
			
			// cssStyle.setBgColor(mCanvas, "black", 1);
			// cssStyle.setBgColor(mButtonDiv, "silver", 1);
			// cssStyle.setBgColor(mWindowBar, "silver", 0.8);
			cssStyle.setNonBreaking(mButtonDiv);
			
			mMouse = RGPP.System.Mouse({
				element: mCanvas,
			});
			
			mDivElement.contentEditable = true;
			mDivElement.focus();
			mPad = RGPP.System.Pad({
				element: mDivElement
			});
			initButtonDiv();
			windowMode();
		}

		var initButtonDiv = function() {
			if (mScreenType === ScreenType.WINDOW) {
				mPseudoFullScreenButton = RGPP.System.Button(mPseudoFullScreenImage);
			}
			else if (mScreenType === ScreenType.PSEUDO_FULL_SCREEN) {
				mPseudoFullScreenButton = RGPP.System.Button(mWindowModeImage);
			}
			else {
				mPseudoFullScreenButton = RGPP.System.Button(mWindowModeImage);
			}
			$(mPseudoFullScreenButton.element()).attr("class", PSEUDO_FULL_SCREEN_CLASS_STRING);

			$(mButtonDiv).empty();
			$(mButtonDiv).append(mPseudoFullScreenButton.element());
			$(mButtonDiv).append(mFullScreenButton.element());
			var uiOperator = RGPP.System.UIOperator.getInstance();
			uiOperator.registClickFunction($("." + FULL_SCREEN_CLASS_STRING), fullScreen);
			uiOperator.registClickFunction($("." + PSEUDO_FULL_SCREEN_CLASS_STRING), clickPseudoFullScreenButton);
			mBarHeight = $(mButtonDiv).outerHeight(true);
			$(mWindowBar).css({
				height: mBarHeight,
				margin: "auto",
				"text-align": "center",
				"vertical-align": "middle",
				"font-size": "1em"
			});

		};

		//---------------------------------------------------------
		// Window 
		//---------------------------------------------------------
		function windowMode() {
			var canvasWidth = RGPP.Config.RESOLUTION_X;
			var canvasHeight = RGPP.Config.RESOLUTION_Y;
			var winW = $(global).width();
			var winH = $(global).height();
			var cssStyle = RGPP.System.CssStyle.getInstance();
			mScale = 1.0;
			$(mDivElement).css({
				position: 'fixed',
				left: (winW - canvasWidth) / 2,
				top: (winH - canvasHeight) / 2,
				width: canvasWidth,
				height: 0,
				zIndex: 500,
			});
			$(mCanvas).css({
				position: 'relative',
				left: 0,
				top: 0,
				width: canvasWidth,
				height: canvasHeight,

				zIndex: 500,
			});

			initButtonDiv();
			$(mButtonDiv).css({
				position: 'absolute',
				right: 0,
				top: 0,
				zIndex: 501,
			});

			cssStyle.setResolution(mCanvas, canvasWidth, canvasHeight);
		}

		//---------------------------------------------------------
		// Full Screen
		//---------------------------------------------------------
		function fullScreen() {
			if (!documentIsEnabledFullscreen(mCanvas)) {
				mScreenType = ScreenType.FULL_SCREEN;
				var canvasWidth = RGPP.Config.RESOLUTION_X;
				var canvasHeight = RGPP.Config.RESOLUTION_Y;
				var screenW = global.parent.screen.width;
				var screenH = global.parent.screen.height;
				scriptUtil.outputMsgToConsole("screenW = " + screenW);
				scriptUtil.outputMsgToConsole("screenH = " + screenH);
				mScale = Math.min(screenW / canvasWidth, screenH / canvasHeight);
				var fixW = canvasWidth * mScale;
				var fixH = canvasHeight * mScale;
				scriptUtil.outputMsgToConsole(mScale);
				mScale = 1.0 / mScale;
				var cssStyle = RGPP.System.CssStyle.getInstance();

				$(mCanvas).css({
					position: 'absolute',
					left: (screenW - fixW) / 2,
					top: (screenH - fixH) / 2,
					width: fixW,
					height: fixH,
					zIndex: 500,
				});
				cssStyle.setResolution(mCanvas, canvasWidth, canvasHeight);

				var list = [
					"requestFullscreen",
					"webkitRequestFullScreen",
					"mozRequestFullScreen",
					"msRequestFullscreen"
				];
				var num = list.length;
				for (var i = 0; i < num; i++) {
					if (mCanvas[list[i]]) {
						mCanvas[list[i]]();
						return true;
					}
				}
			}

			return false;
		}

		//---------------------------------------------------------
		// Pseudo Full Screen
		//---------------------------------------------------------
		function pseudoFullScreen() {
			var canvasWidth = RGPP.Config.RESOLUTION_X;
			var canvasHeight = RGPP.Config.RESOLUTION_Y;
			var winW = $(global).width();
			var winH = $(global).height() - mBarHeight;
			var widthScale = winW / canvasWidth;
			var heightScale = winH / canvasHeight;
			mScale = Math.min(widthScale, heightScale);
			var fixW = canvasWidth * mScale;
			var fixH = canvasHeight * mScale;
			mScale = 1.0 / mScale;
			var cssStyle = RGPP.System.CssStyle.getInstance();
			$(mDivElement).css({
				position: 'fixed',
				left: (winW - fixW) / 2,
				top: (winH - fixH) / 2,
				width: fixW,
				height: fixH,
				zIndex: 500,
			});

			$(mCanvas).css({
				position: 'relative',
				left: 0,
				top: 0,
				width: fixW,
				height: fixH,
				zIndex: 500,
			});


			initButtonDiv();


			$(mButtonDiv).css({
				position: 'absolute',
				right: 0,
				top: 0,
				zIndex: 501,
			});

			cssStyle.setResolution(mCanvas, canvasWidth, canvasHeight);
		}

		function clickPseudoFullScreenButton() {
			if (mScreenType === ScreenType.PSEUDO_FULL_SCREEN) {
				mScreenType = ScreenType.WINDOW;
				windowMode();
			}
			else {
				mScreenType = ScreenType.PSEUDO_FULL_SCREEN;
				pseudoFullScreen();
			}
		}

		function initScreen() {
			switch (mScreenType) {
				case ScreenType.WINDOW:
					windowMode();
					break;
				case ScreenType.FULL_SCREEN:
					mScreenType = ScreenType.WINDOW;
					break;
				case ScreenType.PSEUDO_FULL_SCREEN:
					pseudoFullScreen();
					break;
			}
		}

		// ------------------------------------------------------------
		// check enable full screen
		// ------------------------------------------------------------
		function documentIsEnabledFullscreen(element) {
			return (
				element.fullscreenEnabled ||
				element.webkitFullscreenEnabled ||
				element.mozFullScreenEnabled ||
				element.msFullscreenEnabled ||
				false
			);
		}

		function element() {
			return mDivElement;
		}

		function buttonElement() {
			return mButtonDiv;
		}

		function clear() {
			RGPP.System.OperateCanvas.getInstance().clear(mCtx);
		}

		function draw(imageData) {
			mCtx.save();
			mCtx.putImageData(imageData, 0, 0);
			mCtx.restore();
		}
		
		function hide() {
			return mDivElement.hide();
		}


		function getMouseX() {
			return mMouse.getX() * mScale;
		}

		function getMouseY() {
			return mMouse.getY() * mScale;
		}

		function isLeftClick() {
			return mMouse.isLeftClick();
		}


		function isPressedLeftMouseButton() {
			return mMouse.isPressedLeftButton();
		}

		function isKeyOnRight() {
			return mPad.isKeyOnRight();
		}

		function isKeyOnLeft() {
			return mPad.isKeyOnLeft();
		}

		function isKeyOnUp() {
			return mPad.isKeyOnUp();
		}

		function isKeyOnDown() {
			return mPad.isKeyOnDown();
		}

		function isKeyTriggeredA() {
			return mPad.isKeyTriggeredA();
		}

		function isKeyTriggeredB() {
			return mPad.isKeyTriggeredB();
		}

		function isKeyTriggeredC() {
			return mPad.isKeyTriggeredC();
		}

		function isKeyOnC() {
			return mPad.isKeyOnC();
		}

		function savePreviousInputInfo() {
			mPad.savePrevious();
			mMouse.savePreviousButton();
		}

		function resetInput() {
			mPad.initialize();
			mMouse.initialize();
		}

		function copyPadInfo() {
			return mPad.copyPadInfo();
		}

		function setPadInfo(padInfo) {
			mPad.setPadInfo(padInfo);
		}

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});


})((this || 0).self || global);