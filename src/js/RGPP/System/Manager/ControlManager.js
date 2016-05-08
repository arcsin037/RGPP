/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "ControlManager";

	/**
	 * Control Manager
	 * @class ControlManager
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		// Mouse Function
		that.isLeftClick = isLeftClick;
		that.isPressedLeftButton = isPressedLeftButton;
		that.getMouseX = getMouseX;
		that.getMouseY = getMouseY;

		// Key function
		that.isKeyOnRight = isKeyOnRight;
		that.isKeyOnLeft = isKeyOnLeft;
		that.isKeyOnUp = isKeyOnUp;
		that.isKeyOnDown = isKeyOnDown;
		that.isKeyTriggeredA = isKeyTriggeredA;
		that.isKeyTriggeredB = isKeyTriggeredB;
		that.isKeyTriggeredC = isKeyTriggeredC;
		that.isKeyOnC = isKeyOnC;

		that.savePreviousInputInfo = savePreviousInputInfo;

		var gm = RGPP.System.GameManager.getInstance();

		function isPressedLeftButton() {
			if (gm.isEmulationMode()) {
				return RGPP.System.EmulationModeCanvas.getInstance().isPressedLeftMouseButton();
			}
			else {
				var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
				if (currentMapPanel !== null) {
					return currentMapPanel.isPressedLeftMouseButton();
				}
			}
			return false;
		}

		function isLeftClick() {
			if (gm.isEmulationMode()) {
				return RGPP.System.EmulationModeCanvas.getInstance().isLeftClick();
			}
			else {
				var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
				if (currentMapPanel !== null) {
					return currentMapPanel.isLeftClick();
				}
			}
			return false;
		}

		function getMouseX() {
			if (gm.isEmulationMode()) {
				return RGPP.System.EmulationModeCanvas.getInstance().getMouseX();
			}
			else {
				var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
				if (currentMapPanel !== null) {
					var mouseX = currentMapPanel.getMouseX();
					return RGPP.System.CoordinateSystem.getInstance().convertScreenToMapX(mouseX);
				}
			}
			return 0;
		}

		function getMouseY() {
			if (gm.isEmulationMode()) {
				return RGPP.System.EmulationModeCanvas.getInstance().getMouseY();
			}
			else {
				var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
				if (currentMapPanel !== null) {
					var mouseY = currentMapPanel.getMouseY();
					return RGPP.System.CoordinateSystem.getInstance().convertScreenToMapY(mouseY);
				}
			}
			return 0;
		}

		function isKeyOnRight() {
			if (gm.isEmulationMode()) {
				return RGPP.System.EmulationModeCanvas.getInstance().isKeyOnRight();
			}
			else {
				var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
				if (currentMapPanel !== null) {
					return currentMapPanel.isKeyOnRight();
				}
			}
			return false;
		}

		function isKeyOnLeft() {
			if (gm.isEmulationMode()) {
				return RGPP.System.EmulationModeCanvas.getInstance().isKeyOnLeft();
			}
			else {
				var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
				if (currentMapPanel !== null) {
					return currentMapPanel.isKeyOnLeft();
				}
			}
			return false;
		}

		function isKeyOnUp() {
			if (gm.isEmulationMode()) {
				return RGPP.System.EmulationModeCanvas.getInstance().isKeyOnUp();
			}
			else {
				var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
				if (currentMapPanel !== null) {
					return currentMapPanel.isKeyOnUp();
				}
			}
			return false;
		}

		function isKeyOnDown() {
			if (gm.isEmulationMode()) {
				return RGPP.System.EmulationModeCanvas.getInstance().isKeyOnDown();
			}
			else {
				var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
				if (currentMapPanel !== null) {
					return currentMapPanel.isKeyOnDown();
				}
			}
			return false;
		}

		function isKeyTriggeredA() {
			if (gm.isEmulationMode()) {
				return RGPP.System.EmulationModeCanvas.getInstance().isKeyTriggeredA();
			}
			else {
				var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
				if (currentMapPanel !== null) {
					return currentMapPanel.isKeyTriggeredA();
				}
			}
			return false;
		}

		function isKeyTriggeredB() {
			if (gm.isEmulationMode()) {
				return RGPP.System.EmulationModeCanvas.getInstance().isKeyTriggeredB();
			}
			else {
				var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
				if (currentMapPanel !== null) {
					return currentMapPanel.isKeyTriggeredB();
				}
			}
			return false;
		}

		function isKeyTriggeredC() {
			if (gm.isEmulationMode()) {
				return RGPP.System.EmulationModeCanvas.getInstance().isKeyTriggeredC();
			}
			else {
				var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
				if (currentMapPanel !== null) {
					return currentMapPanel.isKeyTriggeredC();
				}
			}
			return false;
		}

		function isKeyOnC() {
			if (gm.isEmulationMode()) {
				return RGPP.System.EmulationModeCanvas.getInstance().isKeyOnC();
			}
			else {
				var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
				if (currentMapPanel !== null) {
					return currentMapPanel.isKeyOnC();
				}
			}
			return false;
		}


		function savePreviousInputInfo() {
			if (gm.isEmulationMode()) {
				RGPP.System.EmulationModeCanvas.getInstance().savePreviousInputInfo();
			}
			else {
				var currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel();
				if (currentMapPanel !== null) {
					currentMapPanel.savePreviousInputInfo();
				}
			}
		}

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});


})((this || 0).self || global);