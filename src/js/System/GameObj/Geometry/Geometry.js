/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "Geometry";
	/**
	 * Base of Geometry
	 * 
	 * @class Geometry
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec, my) {
		var that;
		my = my || {};

		var mHit = false;

		that = {};
		that.pos = getPos;
		that.setPos = setPos;
		that.velocity = getVelocity;
		that.setVelocity = setVelocity;
		that.width = width;
		that.height = height;
		that.draw = draw;
		that.isHit = isHit;
		that.resetHit = resetHit;

		function getPos() {
			return spec.pos;
		}

		function setPos(pos) {
			spec.pos = pos;
		}

		function getVelocity() {
			return spec.velocity;
		}

		function setVelocity(velocity) {
			spec.velocity = velocity;
		}

		function width() {
			return spec.width;
		}

		function height() {
			return spec.height;
		}

		function draw() {
			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			scriptUtil.outputMsgToConsole("please define draw function!");
		}

		function isHit() {
			return mHit;
		}

		function resetHit() {
			mHit = false;
		}

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
