(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "GameMainPanel";

	// Class
	var constructor = function() {
		var that = {};
		var scriptUtil = RGPP.System.ScriptUtil.getInstance();
		// Interface
		that.open = open;

		// Private Method Implementation
		function open() {
			scriptUtil.outputMsgToConsole("Initialize Palette Panel List...");
			var palettePanelList = RGPP.System.PalettePanelList.getInstance();
			palettePanelList.createPalettePanels();

			scriptUtil.outputMsgToConsole("Initialize Map Panel List...");
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			mapPanelList.setCurrentMapPanel(0);

			scriptUtil.outputMsgToConsole("Initialize Game Canvas...");
			var gamePanel = RGPP.System.EmulationModeCanvas.getInstance();
			$("#emulation-window-panel").append(gamePanel.element());

			gamePanel.initialize();


			scriptUtil.outputMsgToConsole("Initialize Game Manager...");
			var gameManager = RGPP.System.GameManager.getInstance();
			gameManager.setEmulationMode(true);
			gameManager.setTestMode(true);
		}

		return that;
	};


    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);