/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "Pad";

	/**
	 * Pad
	 * @class Pad
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var that = {};

		var mKeyboard = RGPP.System.KeyBoard({
			element: spec.element,
			keyDownFunc: spec.keyDownFunc,
			keyUpFunc: spec.keyUpFunc
		});

		// Interface
		that.isKeyOnUp = isKeyOnUp;
		that.isKeyOnDown = isKeyOnDown;
		that.isKeyOnLeft = isKeyOnLeft;
		that.isKeyOnRight = isKeyOnRight;
		that.isKeyOnA = isKeyOnA;
		that.isKeyOnB = isKeyOnB;
		that.isKeyOnC = isKeyOnC;
		that.isKeyTriggeredUp = isKeyTriggeredUp;
		that.isKeyTriggeredDown = isKeyTriggeredDown;
		that.isKeyTriggeredLeft = isKeyTriggeredLeft;
		that.isKeyTriggeredRight = isKeyTriggeredRight;
		that.isKeyTriggeredA = isKeyTriggeredA;
		that.isKeyTriggeredB = isKeyTriggeredB;
		that.isKeyTriggeredC = isKeyTriggeredC;
		that.isKeyTriggeredCtrlZ = isKeyTriggeredCtrlZ;
		that.isKeyTriggeredCtrlY = isKeyTriggeredCtrlY;
		that.isKeyTriggeredCtrlX = isKeyTriggeredCtrlX;
		that.isKeyTriggeredCtrlV = isKeyTriggeredCtrlV;
		that.isKeyTriggeredCtrlC = isKeyTriggeredCtrlC;
		that.isKeyTriggeredCtrlS = isKeyTriggeredCtrlS;
		that.isKeyTriggeredBackSpaceOrDeleteKey = isKeyTriggeredBackSpaceOrDeleteKey;

		that.savePrevious = savePrevious;
		that.initialize = initialize;
		that.setPadInfo = setPadInfo;
		that.copyPadInfo = copyPadInfo;

		// Private Method
		function isKeyOnUp() {
			return mKeyboard.isKeyOn(mKeyboard.KEY_UP);
		}

		function isKeyOnDown() {
			return mKeyboard.isKeyOn(mKeyboard.KEY_DOWN);
		}

		function isKeyOnLeft() {
			return mKeyboard.isKeyOn(mKeyboard.KEY_LEFT);
		}

		function isKeyOnRight() {
			return mKeyboard.isKeyOn(mKeyboard.KEY_RIGHT);
		}

		function isKeyOnA() {
			var ret = mKeyboard.isKeyOn(mKeyboard.KEY_SPACE) || mKeyboard.isKeyOn(mKeyboard.KEY_Z);
			ret = (ret || mKeyboard.isKeyOn(mKeyboard.KEY_ENTER));
			return ret;
		}

		function isKeyOnB() {
			var ret = mKeyboard.isKeyOn(mKeyboard.KEY_ESC) || mKeyboard.isKeyOn(mKeyboard.KEY_X);
			return ret;
		}

		function isKeyOnC() {
			var ret = mKeyboard.isKeyOn(mKeyboard.KEY_SHIFT) || mKeyboard.isKeyOn(mKeyboard.KEY_C);
			return ret;
		}

		// key trigger
		function isKeyTriggeredUp() {
			return mKeyboard.isKeyTriggered(mKeyboard.KEY_UP);
		}

		function isKeyTriggeredDown() {
			return mKeyboard.isKeyTriggered(mKeyboard.KEY_DOWN);
		}

		function isKeyTriggeredLeft() {
			return mKeyboard.isKeyTriggered(mKeyboard.KEY_LEFT);
		}

		function isKeyTriggeredRight() {
			return mKeyboard.isKeyTriggered(mKeyboard.KEY_RIGHT);
		}

		function isKeyTriggeredA() {
			var ret = mKeyboard.isKeyTriggered(mKeyboard.KEY_SPACE);
			ret = (ret || (mKeyboard.isKeyTriggered(mKeyboard.KEY_Z) && !mKeyboard.isKeyOn(mKeyboard.KEY_CTRL)));
			ret = (ret || mKeyboard.isKeyTriggered(mKeyboard.KEY_ENTER));
			return ret;
		}

		function isKeyTriggeredB() {
			var ret = mKeyboard.isKeyTriggered(mKeyboard.KEY_ESC) || mKeyboard.isKeyTriggered(mKeyboard.KEY_X);
			return ret;
		}

		function isKeyTriggeredC() {
			var ret = mKeyboard.isKeyTriggered(mKeyboard.KEY_SHIFT) || mKeyboard.isKeyTriggered(mKeyboard.KEY_C);
			return ret;
		}

		function isKeyTriggeredCtrlZ() {
			var ret = mKeyboard.isKeyTriggered(mKeyboard.KEY_Z) && mKeyboard.isKeyOn(mKeyboard.KEY_CTRL);
			return ret;
		}

		function isKeyTriggeredCtrlY() {
			var ret = mKeyboard.isKeyTriggered(mKeyboard.KEY_Y) && mKeyboard.isKeyOn(mKeyboard.KEY_CTRL);
			return ret;
		}

		function isKeyTriggeredCtrlX() {
			var ret = mKeyboard.isKeyTriggered(mKeyboard.KEY_X) && mKeyboard.isKeyOn(mKeyboard.KEY_CTRL);
			return ret;
		}

		function isKeyTriggeredCtrlV() {
			var ret = mKeyboard.isKeyTriggered(mKeyboard.KEY_V) && mKeyboard.isKeyOn(mKeyboard.KEY_CTRL);
			return ret;
		}

		function isKeyTriggeredCtrlC() {
			var ret = mKeyboard.isKeyTriggered(mKeyboard.KEY_C) && mKeyboard.isKeyOn(mKeyboard.KEY_CTRL);
			return ret;
		}

		function isKeyTriggeredCtrlS() {
			var ret = mKeyboard.isKeyTriggered(mKeyboard.KEY_S) && mKeyboard.isKeyOn(mKeyboard.KEY_CTRL);
			return ret;
		}

		function isKeyTriggeredBackSpaceOrDeleteKey() {
			var ret = mKeyboard.isKeyTriggered(mKeyboard.KEY_BACKSPACE) || mKeyboard.isKeyTriggered(mKeyboard.KEY_DEL);
			return ret;
		}

		function savePrevious() {
			mKeyboard.savePreviousKey();
		}

		function initialize() {
			mKeyboard.initialize();
		}

		function copyPadInfo() {
			return mKeyboard.keyInfo();
		}

		function setPadInfo(keyInfo) {
			mKeyboard.setKeyInfo(keyInfo);
		}


		return that;
	};
	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
