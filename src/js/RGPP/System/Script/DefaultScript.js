(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "DefaultScript";
	var constructor = function() {
		var that;

		that = RGPP.System.Script();

		that.onLoadGame = onLoadGame;
		that.onLoadMap = onLoadMap;
		that.onStateTransition = onStateTransition;
		that.onUpdate = onUpdate;
		that.debugDraw = debugDraw;
		that.onDraw = onDraw;

		function onLoadGame(event) {}

		function onLoadMap(event) {}

		function onStateTransition(event) {}

		function onUpdate(event) {}

		function debugDraw(ctx) {}

		function onDraw(ctx) {}

		return that;
	};


    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);
