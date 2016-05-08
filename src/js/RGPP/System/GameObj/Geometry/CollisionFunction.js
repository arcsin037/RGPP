/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
    /* global RGPP */
    "use strict";
    var objName = "CollisionFunction";
    /**
     * Collision function
     * 
     * @class CollisionFunction
     * @author arcsin
     * @constructor
     */
    var constructor = function() {
        var that = {};

        that.checkCollision = checkCollision;

        function checkCollision(objA, objB) {
            var system = RGPP.System;
            var scriptUtil = system.ScriptUtil.getInstance();
            var vecOp = system.VectorOperator.getInstance();
            var vecAtoB = vecOp.Vec2.sub(objA.pos(), objB.pos());
            var vecBtoA = vecAtoB.negative();

            var referenceLengthA = objA.referenceLength(vecAtoB);
            var referenceLengthB = objB.referenceLength(vecBtoA);

            var distanceToPlane = 0;

            if (objA.normal !== undefined && objB.normal !== undefined) { // plane & plane
                return false;
            }
            else if (objA.normal !== undefined) { // plane & cicle
                distanceToPlane = vecOp.Vec2.dot(vecAtoB, objA.normal());

                scriptUtil.outputMsgToConsole("@collisionFunc:" + distanceToPlane);

                if (distanceToPlane < 0) {
                    distanceToPlane = -distanceToPlane;
                }

                if ((referenceLengthB - distanceToPlane) >= 0) {
                    return true;
                }
                return false;
            }
            else if (objB.normal !== undefined) { // circle & plane
                distanceToPlane = vecOp.Vec2.dot(vecBtoA, objB.normal());
                scriptUtil.outputMsgToConsole("@collisionFunc:" + distanceToPlane);

                if (distanceToPlane < 0) {
                    distanceToPlane = -distanceToPlane;
                }

                if ((referenceLengthA - distanceToPlane) >= 0) {
                    return true;
                }
                return false;

            }
            else { // circle & circle
                var squareDistance = vecOp.Vec2.distanceSquare(objA.pos(), objB.pos());
                var sumReferenceRength = (referenceLengthA + referenceLengthB);
                var squareReferenceLength = sumReferenceRength * sumReferenceRength;
                if (squareDistance <= squareReferenceLength) {
                    // hit
                    return true;
                }

                return false;
            }
        }

        return that;
    };
    
	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);