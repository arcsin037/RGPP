/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "GameObjBase";

	/**
	 * Base of Game Object 
	 * 
	 * @class GameObjBase
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		that.update = update;
		that.draw = draw;
		that.debugDraw = debugDraw;
		that.sortFunction = sortFunction;

		function update() {

		}

		function draw(ctx) {

		}

		function debugDraw(ctx) {

		}

		function sortFunction(a, b) {
			return 0;
		}


		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);