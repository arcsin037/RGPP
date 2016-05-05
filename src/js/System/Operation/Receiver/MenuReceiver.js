(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "MenuReceiver";
	var constructor = function() {
		var that = {};

		that.saveMap = saveMap;
		that.showVersion = showVersion;

		function saveMap() {
			RGPP.System.MapPanelList.getInstance().saveCurrentMapPanel();
		}

		function showVersion() {
			alert("Rapid Game Prototyping Platform(RGPP) Ver 0.1 \n created by arcsin");
		}

		return that;
	};
    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);