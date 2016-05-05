/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
    var objName = "FundamentalDrawing";
    
	/**
	 * Fundamental Drawing Object
	 * 
	 * @class FundamentalDrawing
	 * @author arcsin
	 * @constructor
	 */
    var constructor = function() {
        var that = {};
        
        that.drawLine = drawLine;
        that.drawRect = drawRect;
        that.setColor = setColor;

        function drawLine(ctx, fromX, fromY, toX, toY) {
            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.stroke();
        }

        function drawRect(ctx, dstX, dstY, width, height, lineWidth) {
            ctx.save();
            ctx.lineWidth = lineWidth;
            ctx.strokeRect(dstX, dstY, width, height);
            ctx.restore();
        }

        function setColor(ctx, r, g, b, a) {
            ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        }

        return that;
    };
    
	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);