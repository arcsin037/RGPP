/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
    /* global RGPP */
    "use strict";
    var objName = "ImageFilter";
    /**
     * Image Filter
     * 
	 * @class ImageFilter 
	 * @author arcsin
	 * @constructor
     */
    var constructor = function(spec) {
        var that = {};

        var baseFilterR = function(r, g, b, a) {
            return r;
        };
        var baseFilterG = function(r, g, b, a) {
            return g;
        };
        var baseFilterB = function(r, g, b, a) {
            return b;
        };
        var baseFilterA = function(r, g, b, a) {
            return a;
        };

        spec.filterR = spec.filterR || baseFilterR;
        spec.filterG = spec.filterG || baseFilterG;
        spec.filterB = spec.filterB || baseFilterB;
        spec.filterA = spec.filterA || baseFilterA;

        var mSizeX = RGPP.Config.RESOLUTION_X;
        var mSizeY = RGPP.Config.RESOLUTION_Y;
        var mPicLength = mSizeX * mSizeY;

        that.filter = filter;
        
        var coordinateSystem = RGPP.System.CoordinateSystem.getInstance();

        function filter(ctx) {
            var scrollX = coordinateSystem.convertMapToScreenX(0);
            var scrollY = coordinateSystem.convertMapToScreenY(0);
            ctx.save();
            var imageData = ctx.getImageData(scrollX, scrollY, mSizeX, mSizeY);
            for (var i = 0; i < mPicLength * 4; i += 4) {
                var r = imageData.data[i + 0];
                var g = imageData.data[i + 1];
                var b = imageData.data[i + 2];
                var a = imageData.data[i + 3];

                imageData.data[i + 0] = spec.filterR(r, g, b, a);
                imageData.data[i + 1] = spec.filterG(r, g, b, a);
                imageData.data[i + 2] = spec.filterB(r, g, b, a);
                imageData.data[i + 3] = spec.filterA(r, g, b, a);
            }
            ctx.restore();

            ctx.save();
            ctx.putImageData(imageData, scrollX, scrollY);
            ctx.restore();

        }

        return that;
    };
    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);
