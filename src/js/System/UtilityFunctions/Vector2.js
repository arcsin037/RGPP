/**
 * @class 2D Vector
 * @author arcsin
 */
(function(global) {
	/* global RGPP */
	"use strict";
	    var objName = "Vector2";
    var constructor = function(spec, my) {
        var that = {};
        my = my || {};

        that.x = spec.x;
        that.y = spec.y;
        
        that.norm = norm;
        that.negative = negative;
        that.normalize = normalize;

        function negative() {
            return RGPP.System.Vector2({
                x: -that.x,
                y: -that.y
            });
        }

        function norm() {
            var squareLength = RGPP.System.VectorOperator.getInstance().Vec2.dot(that, that);
            return Math.sqrt(squareLength);
        }

        function normalize() {
            var length = norm();
            var x = that.x / length;
            var y = that.y / length;
            return RGPP.System.Vector2({
                x: x,
                y: y
            });
        }
        

        return that;
    };
    
    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);
