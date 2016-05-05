/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "Script";
	/**
	 * Script Base
	 * @class Script
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		// "onLoadGame" is called when the game is loaded.
		that.onLoadGame = function(event) {
			// scriptUtil.outputMsgToConsole("Script 'onLoadGame' is not defined!");
		};

		// "onLoadMap" is called when the map is loaded.
		that.onLoadMap = function(event) {
			// scriptUtil.outputMsgToConsole("Script 'onLoadMap' is not defined!");
		};

		that.loadChangeableValuesPerEvent = function() {
			// scriptUtil.outputMsgToConsole("Script 'loadChangeableValuesPerEvent' is not defined!");
			return [];
		};

		that.loadChangeableValuesPerScript = function() {
			// scriptUtil.outputMsgToConsole("Script 'loadChangeableValuesPerScript' is not defined!");
			return [];
		};

		// "state transition" is called when the game is loaded.
		that.onStateTransition = function(event) {
			// scriptUtil.outputMsgToConsole("Script 'onStateTransition' is not defined!");
		};

		that.reaction = function(event) {
			// scriptUtil.outputMsgToConsole("Script 'reaction' is not defined!");
		};

		that.update = function(event) {
			// scriptUtil.outputMsgToConsole("Script 'update' is not defined!");
		};

		that.debugUpdate = function(event) {
			// scriptUtil.outputMsgToConsole("Script 'debugUpdate' is not defined!");

		};

		that.draw = function(ctx) {
			// scriptUtil.outputMsgToConsole("Script 'draw' is not defined!");
		};

		that.debugDraw = function(ctx) {
			// scriptUtil.outputMsgToConsole("Script 'debugDraw' is not defined!");
		};
		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
