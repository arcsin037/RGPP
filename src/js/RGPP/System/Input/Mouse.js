/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "Mouse";
	var mMouseButton = [];
	var mMouseButtonPrevious = [];
	var MOUSE_BUTTON_LEFT = 0;
	var MOUSE_BUTTON_CENTER = 1;
	var MOUSE_BUTTON_RIGHT = 2;
	var MOUSE_BUTTON_COUNT = 3;

	function initialize() {
		for (var i = 0; i < MOUSE_BUTTON_COUNT; ++i) {
			mMouseButton[i] = false;
			mMouseButtonPrevious[i] = false;
		}
	}

	function isDragged() {
		if (mMouseButton[MOUSE_BUTTON_LEFT]) {
			return true;
		}
		else {
			return false;
		}
	}

	function checkMouseButton(e) {
		if (!e) {
			e = window.event;
		}

		if (e.buttons !== undefined) {
			var data = e.buttons;

			mMouseButton[MOUSE_BUTTON_LEFT] = ((data & 0x0001) ? true : false);
			mMouseButton[MOUSE_BUTTON_RIGHT] = ((data & 0x0002) ? true : false);
			mMouseButton[MOUSE_BUTTON_CENTER] = ((data & 0x0004) ? true : false);
		}
	}

	// replace global function
	global.onmousedown = function(e) {
		checkMouseButton(e);
	};

	global.onmouseup = function(e) {
		checkMouseButton(e);
	};

	global.onmousemove = function(e) {
		checkMouseButton(e);
		// prevent default action
		if (e.preventDefault) {
			e.preventDefault();
		}
		else {
			return false;
		}
	};

	/**
	 * Mouse Operator
	 * @class Template
	 * @author arcsin
	 * @constructor
	 * @param spec {Object}
	 * @param spec.element {Element}
	 * @param spec.moveFunc {Function}
	 * @param spec.downFunc {Function}
	 * @param spec.upFunc {Function}
	 * @param spec.outFunc {Function}
	 * @param spec.overFunc {Function}
	 * @param spec.doubleClickFunc {Function}
	 */
	var constructor = function(spec) {
		// element
		// moveFunc
		// downFunc
		// upFunc
		// outFunc
		// overFunc
		// doubleClickFunc

		var mMouseX = 0;
		var mMouseY = 0;

		var mMouseOverFlag = false;
		var Mode = {
			INIT_MODE: false,
			DRAG_MODE: true,
		};

		var mLeftButtonMode = Mode.INIT_MODE;

		var scriptUtil = RGPP.System.ScriptUtil.getInstance();

		var that = {};

		// Interface
		that.initialize = initialize;
		that.mouseMoveFunc = mouseMoveFunc;
		that.mouseDownFunc = mouseDownFunc;
		that.mouseUpFunc = mouseUpFunc;
		that.mouseOutFunc = mouseOutFunc;
		that.mouseOverFunc = mouseOverFunc;
		that.mouseDoubleClickFunc = mouseDoubleClickFunc;
		that.getX = getX;
		that.getY = getY;

		that.isPressedLeftButton = isPressedLeftButton;
		that.isPressedRightButton = isPressedRightButton;
		that.isPressedCenterButton = isPressedCenterButton;

		that.isLeftClick = isLeftClick;
		that.isCenterClick = isCenterClick;
		that.isRightClick = isRightClick;
		that.isMouseOver = isMouseOver;
		that.isDragged = isDragged;
		that.savePreviousButton = savePreviousButton;

		spec.element.onmousemove = function(e) {
			mouseMoveFunc(e);
			if (spec.moveFunc !== undefined) {
				spec.moveFunc(e);
			}
		};

		spec.element.onmousedown = function(e) {
			global.onmousedown(e);
			mouseDownFunc(e);
			if (spec.downFunc !== undefined) {
				spec.downFunc(e);
			}
		};

		spec.element.onmouseup = function(e) {
			global.onmouseup(e);
			mouseUpFunc(e);
			if (spec.upFunc !== undefined) {
				spec.upFunc(e);
			}
		};

		spec.element.onmouseout = function(e) {
			mouseOutFunc(e);
			if (spec.outFunc !== undefined) {
				spec.outFunc(e);
			}
		};

		spec.element.onmouseover = function(e) {
			mouseOverFunc(e);
			if (spec.overFunc !== undefined) {
				spec.overFunc(e);
			}
		};

		spec.element.ondblclick = function(e) {
			mouseDoubleClickFunc(e);
			if (spec.doubleClickFunc !== undefined) {
				spec.doubleClickFunc(e);
			}
		};

		function mouseMoveFunc(e) {
			checkPosition(e);
		}

		function mouseDownFunc(e) {
			checkPosition(e);
			scriptUtil.outputMsgToConsole("mouse down!");
			if (mMouseOverFlag) {
				if (mMouseButton[MOUSE_BUTTON_LEFT]) {
					mLeftButtonMode = Mode.DRAG_MODE;
				}
			}
		}

		function mouseUpFunc(e) {
			scriptUtil.outputMsgToConsole("mouse up!");
		}

		function mouseOutFunc(e) {
			mMouseOverFlag = false;
			scriptUtil.outputMsgToConsole("out flag!");
		}

		function mouseOverFunc(e) {
			mMouseOverFlag = true;
			checkPosition(e);
			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			scriptUtil.outputMsgToConsole("over flag!");
		}

		function mouseDoubleClickFunc(e) {
			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			scriptUtil.outputMsgToConsole("double click!");
		}

		var checkPosition = function(e) {
			if (e) {
				var rect = e.target.getBoundingClientRect();
				var mouseX = e.clientX - rect.left;
				var mouseY = e.clientY - rect.top;
				mMouseX = mouseX;
				mMouseY = mouseY;
			}
			else {
				mMouseX = event.offsetX;
				mMouseY = event.offsetY;
			}
		};


		function getX() {
			return mMouseX;
		}

		function getY() {
			return mMouseY;
		}

		function isPressedLeftButton() {
			if (mMouseButton[MOUSE_BUTTON_LEFT]) {
				return mLeftButtonMode;
			}
			mLeftButtonMode = Mode.INIT_MODE;
			return false;
		}

		function isPressedRightButton() {
			return mMouseButton[MOUSE_BUTTON_RIGHT];
		}

		function isPressedCenterButton() {
			return mMouseButton[MOUSE_BUTTON_CENTER];
		}


		function isLeftClick() {
			if (!mMouseButtonPrevious[MOUSE_BUTTON_LEFT]) {
				if (isPressedLeftButton()) {
					return true;
				}
			}
			return false;
		}

		function isCenterClick() {
			if (!mMouseButtonPrevious[MOUSE_BUTTON_CENTER]) {
				if (isPressedCenterButton()) {
					return true;
				}
			}
			return false;
		}

		function isRightClick() {
			if (!mMouseButtonPrevious[MOUSE_BUTTON_RIGHT]) {
				if (isPressedRightButton()) {
					return true;
				}
			}
			return false;
		}

		function isMouseOver() {
			return mMouseOverFlag;
		}

		function savePreviousButton() {
			for (var i = 0; i < MOUSE_BUTTON_COUNT; i += 1) {
				mMouseButtonPrevious[i] = mMouseButton[i];
			}
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
