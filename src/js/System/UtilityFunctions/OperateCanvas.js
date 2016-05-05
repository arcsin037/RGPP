/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "OperateCanvas";

	/**
	 * Operate Canvas
	 * @class OperateCanvas
	 * @author arcsin
	 * @constructor 
	 */
	var constructor = function(uu) {
		var that = {};
		var mUUObj = null;
		var mUUCanvasFlag = false;
		var mTmpCanvas = null;

		if (uu !== undefined) {
			mUUCanvasFlag = true;
			mUUObj = uu;
			mTmpCanvas = mUUObj.canvas.create();
		}
		else {
			mTmpCanvas = document.createElement("canvas");
			mTmpCanvas.getContext('2d').fillStyle = "rgba(0, 0, 0, 0)";
		}

		that.clear = clear;
		that.loadImage = loadImage;
		that.createCanvas = createCanvas;
		that.getContext2D = getContext2D;
		that.tmpCanvasCtx2d = tmpCanvasCtx2d;
		that.tmpCanvasURL = tmpCanvasURL;

		function createCanvas() {
			if (mUUCanvasFlag) {
				return mUUObj.canvas.create();
			}
			else {
				return document.createElement("canvas");
			}
		}

		function clear(ctx) {
			if (mUUCanvasFlag) {
				ctx.clear();
			}
			else {
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			}
		}

		function getContext2D(canvas) {
			if (!canvas || !canvas.getContext) {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputErrMsgToConsole("Arguments is not canvas");
				return null;
			}
			return canvas.getContext('2d');
		}

		function loadImage(imgName) {
			var img = new Image();
			img.src = imgName + "?" + new Date().getTime();
			return img;
		}

		function tmpCanvasCtx2d() {
			if (!mTmpCanvas || !mTmpCanvas.getContext) {
				var scriptUtil = RGPP.System.ScriptUtil.getInstance();
				scriptUtil.outputErrMsgToConsole("Temporary canvas is null");
				return null;
			}
			return mTmpCanvas.getContext('2d');
		}

		function tmpCanvasURL() {
			return mTmpCanvas.toDataURL();
		}

		return that;
	};
	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
