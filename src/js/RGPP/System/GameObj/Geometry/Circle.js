/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "Circle";
	/**
	 * Geometry Circle
	 * 
	 * @class Circle
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec, my) {
		// spec.radius: circle radius
		// spec.pos: circle position
		var that;
		my = my || {};

		var mRadius = spec.radius;
		var mDiameter = mRadius * 2.0;

		var mMaxPushVector;
		var mMinPushVector;
		var mMaxParallelVelocity;
		var mMinParallelVelocity;
		var mMaxPerpendicularVelocity;
		var mMinPerpendicularVelocity;


		that = RGPP.System.Geometry(spec, my);

		// Interface
		that.setRadius = setRadius;
		that.width = width;
		that.height = height;
		that.radius = radius;
		that.draw = draw;
		that.addVelocity = addVelocity;
		that.move = move;
		that.moveVector = moveVector;

		that.initMinMax = initMinMax;
		that.referenceLength = referenceLength;
		that.setMinMaxPushVector = setMinMaxPushVector;
		that.setMinMaxVelocity = setMinMaxVelocity;
		that.correctPos = correctPos;
		that.correctVelocity = correctVelocity;

		function setRadius(radius) {
			mRadius = radius;
			mDiameter = mRadius * 2.0;
		}

		function width() {
			return mDiameter;
		}

		function height() {
			return mDiameter;
		}

		function radius() {
			return mRadius;
		}

		function draw(ctx) {
			ctx.beginPath();
			var pos = that.pos();
			ctx.arc(pos.x, pos.y, mRadius, 0, Math.PI * 2, false);
			ctx.stroke();
		}


		function addVelocity(velocity) {
			spec.velocity = RGPP.System.VectorOperator.getInstance().Vec2.add(spec.velocity, velocity);
		}

		function move() {
			spec.pos = RGPP.System.VectorOperator.getInstance().Vec2.add(spec.pos, spec.velocity);
		}

		function moveVector(pos) {
			spec.pos = RGPP.System.VectorOperator.getInstance().Vec2.add(spec.pos, pos);
		}

		function correctPos() {
			moveVector(correctPushVector());
		}

		function correctVelocity() {
			addVelocity(correctParallelVelocity());
			addVelocity(correctPerpendicularVelocity());
		}

		function referenceLength() {
			return mRadius;
		}

		function initMinMax() {
			mMaxPushVector = RGPP.System.Vector2({
				x: 0,
				y: 0
			});
			mMinPushVector = RGPP.System.Vector2({
				x: 0,
				y: 0
			});
			mMaxParallelVelocity = RGPP.System.Vector2({
				x: 0,
				y: 0
			});
			mMinParallelVelocity = RGPP.System.Vector2({
				x: 0,
				y: 0
			});
			mMaxPerpendicularVelocity = RGPP.System.Vector2({
				x: 0,
				y: 0
			});
			mMinPerpendicularVelocity = RGPP.System.Vector2({
				x: 0,
				y: 0
			});
		}

		function setMinMaxPushVector(pushVector) {
			if (pushVector.x > 0) {
				mMaxPushVector.x = Math.max(pushVector.x, mMaxPushVector.x);
			}
			else if (pushVector.x < 0) {
				mMinPushVector.x = Math.min(pushVector.x, mMinPushVector.x);
			}

			if (pushVector.y > 0) {
				mMaxPushVector.y = Math.max(pushVector.y, mMaxPushVector.y);
			}
			else if (pushVector.y < 0) {
				mMinPushVector.y = Math.min(pushVector.y, mMinPushVector.y);
			}

		}

		function setMinMaxVelocity(parallelLineOfActionVelocity, perpendicularLineOfActionVelocity) {

			if (parallelLineOfActionVelocity.x > 0) {
				mMaxParallelVelocity.x = Math.max(parallelLineOfActionVelocity.x, mMaxParallelVelocity.x);
			}
			else if (parallelLineOfActionVelocity.x < 0) {
				mMinParallelVelocity.x = Math.min(parallelLineOfActionVelocity.x, mMinParallelVelocity.x);
			}

			if (parallelLineOfActionVelocity.y > 0) {
				mMaxParallelVelocity.y = Math.max(parallelLineOfActionVelocity.y, mMaxParallelVelocity.y);
			}
			else if (parallelLineOfActionVelocity.y < 0) {
				mMinParallelVelocity.y = Math.min(parallelLineOfActionVelocity.y, mMinParallelVelocity.y);
			}

			if (perpendicularLineOfActionVelocity.x > 0) {
				mMaxPerpendicularVelocity.x = Math.max(perpendicularLineOfActionVelocity.x, mMaxPerpendicularVelocity.x);
			}
			else if (perpendicularLineOfActionVelocity.x < 0) {
				mMinPerpendicularVelocity.x = Math.min(perpendicularLineOfActionVelocity.x, mMinPerpendicularVelocity.x);
			}

			if (perpendicularLineOfActionVelocity.y > 0) {
				mMaxPerpendicularVelocity.y = Math.max(perpendicularLineOfActionVelocity.y, mMaxPerpendicularVelocity.y);
			}
			else if (perpendicularLineOfActionVelocity.y < 0) {
				mMinPerpendicularVelocity.y = Math.min(perpendicularLineOfActionVelocity.y, mMinPerpendicularVelocity.y);
			}

		}

		function correctPushVector() {
			return RGPP.System.VectorOperator.getInstance().Vec2.add(mMaxPushVector, mMinPushVector);
		}

		function correctParallelVelocity() {
			return RGPP.System.VectorOperator.getInstance().Vec2.add(mMaxParallelVelocity, mMinParallelVelocity);
		}

		function correctPerpendicularVelocity() {
			return RGPP.System.VectorOperator.getInstance().Vec2.add(mMaxPerpendicularVelocity, mMinPerpendicularVelocity);
		}

		return that;
	};
	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
