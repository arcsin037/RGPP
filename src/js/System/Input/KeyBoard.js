/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "KeyBoard";

	/**
	 * KeyBoard
	 * 
	 * @class KeyBoard
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var that = {};

		var KEY_COUNT = 256;
		var mKey = [KEY_COUNT];
		var mKeyPrevious = [KEY_COUNT];

		that.KEY_LEFT = 37;
		that.KEY_RIGHT = 39;
		that.KEY_UP = 38;
		that.KEY_DOWN = 40;

		that.KEY_SPACE = 32;
		that.KEY_ENTER = 13;
		that.KEY_ESC = 27;
		that.KEY_DEL = 46;
		that.KEY_BACKSPACE = 8;

		that.KEY_C = 67;

		that.KEY_S = 83;

		that.KEY_V = 86;

		that.KEY_X = 88;
		that.KEY_Y = 89;
		that.KEY_Z = 90;

		that.KEY_SHIFT = 16;
		that.KEY_CTRL = 17;

		var mKeyDownFunc = spec.keyDownFunc;
		var mKeyUpFunc = spec.keyUpFunc;
		var element = spec.element;

		// Interface
		that.initialize = initialize;
		that.isKeyOn = isKeyOn;
		that.isKeyTriggered = isKeyTriggered;
		that.savePreviousKey = savePreviousKey;
		that.keyInfo = keyInfo;
		that.setKeyInfo = setKeyInfo;

		//push down key
		element.onkeydown = function(e) {
			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			scriptUtil.outputMsgToConsole(e.which);
			if (e) { //Fire fox
				mKey[e.which] = true;
			}
			else {
				mKey[event.keyCode] = true;
			}
			if (mKeyDownFunc) {
				mKeyDownFunc(e);
			}

			e.preventDefault();

			return false;
		};

		element.onkeyup = function(e) {
			if (e) { //Fire fox
				mKey[e.which] = false;
				mKeyPrevious[e.which] = false;
			}
			else {
				mKey[event.keyCode] = false;
				mKeyPrevious[event.keyCode] = false;
			}

			if (mKeyUpFunc) {
				mKeyUpFunc(e);
			}

			return false;
		};

		function initialize() {
			//initialize keyboard state
			for (var i = 0; i < mKey.length; ++i) {
				mKey[i] = false;
				mKeyPrevious[i] = false;
			}
		}

		// Key On
		function isKeyOn(code) {
			return mKey[code];
		}

		//Key Triggered
		function isKeyTriggered(code) {
			if (mKey[code]) {
				if (mKeyPrevious[code]) {
					return false;
				}
				else {
					return true;
				}
			}
			return false;
		}

		function savePreviousKey() {
			for (var i = 0; i < mKey.length; i += 1) {
				mKeyPrevious[i] = mKey[i];
			}
		}

		function keyInfo() {
			var key = [];
			var keyPrevious = [];
			for (var i = 0; i < mKey.length; ++i) {
				key[i] = mKey[i];
				keyPrevious[i] = mKeyPrevious[i];
			}

			var ret = {
				key: key,
				keyPrevious: keyPrevious
			};

			return ret;
		}

		function setKeyInfo(keyInfo) {
			mKey = keyInfo.key;
			mKeyPrevious = keyInfo.keyPrevious;
		}


		initialize();

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
