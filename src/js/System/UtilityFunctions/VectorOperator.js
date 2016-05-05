/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
    /* global RGPP */
    "use strict";
        var objName = "VectorOperator";

    /**
     * Vector Operator
     * @class VectorOperator
     * @author arcsin
     */
    var constructor = function() {
        var that = {
            Vec2: {},
            Vec3: {} //TODO
        };

        that.Vec2.add = addVec2;
        that.Vec2.sub = subVec2;
        that.Vec2.dot = dotVec2;
        that.Vec2.distanceSquare = distanceSquareVec2;
        that.Vec2.multScalar = multScalarVec2;
        that.Vec2.distance = distance;

        function addVec2(vecA, vecB) {
            var resultX = vecA.x + vecB.x;
            var resultY = vecA.y + vecB.y;
            var vec = RGPP.System.Vector2({
                x: resultX,
                y: resultY
            });
            return vec;
        }

        function subVec2(vecA, vecB) {
            var resultX = vecA.x - vecB.x;
            var resultY = vecA.y - vecB.y;
            var vec = RGPP.System.Vector2({
                x: resultX,
                y: resultY
            });
            return vec;
        }

        function dotVec2(vecA, vecB) {
            return vecA.x * vecB.x + vecA.y * vecB.y;
        }

        function distanceSquareVec2(vecA, vecB) {
            var subVec = subVec2(vecA, vecB);
            return dotVec2(subVec, subVec);
        }

        function multScalarVec2(multValue, vec) {
            return RGPP.System.Vector2({
                x: vec.x * multValue,
                y: vec.y * multValue
            });
        }

        function distance(vecA, vecB) {
            var subVec = subVec2(vecA, vecB);
            return Math.sqrt(dotVec2(subVec, subVec));
        }

        return that;
    };
    
	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
