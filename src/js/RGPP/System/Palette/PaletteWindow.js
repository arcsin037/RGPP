/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "PaletteWindow";
	/**
	 * Window of Palette
	 * @class PaletteWindow
	 * @author arcsin
	 * @constructor
	 * @param spec {Object}
	 * @param spec.$element {jQuery} jQuery element to palette window
	 */
	var constructor = function(spec) {
		var that = {};

		// Interface
		that.openFunc = openFunc;
		that.closeFunc = closeFunc;

		var $mWindow = spec.$element;

		$mWindow.dialog({
			autoOpen: false,
			width: 640,
			height: 500
		});


		function openFunc() {
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			if (!mapPanelList.isEventLayer()) {
				$mWindow.dialog("option", "title", "Palette");
				$mWindow.dialog("open");
				var pList = RGPP.System.PalettePanelList.getInstance();
				var currentPalettePanel = pList.currentPalettePanel();
				if (currentPalettePanel !== null) {
					currentPalettePanel.paintComponent();
				}
			}
		}

		function closeFunc() {
			$mWindow.dialog("close");
		}

		return that;
	};
	
	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);