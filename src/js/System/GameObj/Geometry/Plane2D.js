/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "Plane2D";

	/**
	 * Game Object of Plane 2D 
	 * 
	 * @class Plane2D
	 * @author arcsin
	 * @constructor
	 * @param spec {Object}
	 * @param spec.pos {Object} circle position
	 * @param spec.size {Object} 2D plane size
	 * @param spec.normal {Object} 2D plane normal
	 * @param [my] {Object}  
	 */
	var constructor = function(spec, my) {
		var that;
		my = my || {};

		var mSize = spec.size;
		var mNormal = spec.normal;

		that = RGPP.System.Geometry(spec, my);

		// Interface
		that.width = width;
		that.height = height;
		that.normal = normal;
		that.draw = draw;
		
		that.referenceLength = referenceLength;


		/**
		 * Return width of plane
		 * @method width
		 * @return {Number} width of plane
		 */ 
		function width() {
			return mSize * Math.abs(mNormal.y);
		}

		/**
		 * Return height of plane
		 * @method height
		 * @return {Number} height of plane
		 */ 
		function height() {
			return mSize * Math.abs(mNormal.x);
		}

		/**
		 * Return normal vector of plane
		 * @method normal
		 * @return {Vector2D} width of plane
		 */ 
		function normal() {
			return mNormal;
		}

		/**
		 * drawing function
		 * @method draw
		 */ 
		function draw(ctx) {
			var pos = that.pos();
			var halfWidth = width() * 0.5;
			var halfHeight = height() * 0.5;

			RGPP.System.FundamentalDrawing.getInstance().drawLine(ctx,
				pos.x - halfWidth, pos.y - halfHeight,
				pos.x + halfWidth, pos.y + halfHeight
			);
		}

		function referenceLength() {
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
