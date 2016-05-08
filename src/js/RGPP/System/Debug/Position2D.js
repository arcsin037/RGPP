(function(global) {
	/* global RGPP */
	"use strict";
	    var objName = "Position2D";
    // Class
    var constructor = function(spec) {
        var that = {};

        var mX = RGPP.System.ChangeableValue({
            name: spec.name + " X",
            defaultValue: spec.x,
            type: "spinner",
            stepValue: 1,
        });

        var mY = RGPP.System.ChangeableValue({
            name: spec.name + " Y",
            defaultValue: spec.y,
            type: "spinner",
            stepValue: 1,
        });

        that.x = getX;
        that.y = getY;
        that.loadChangeableValues = loadChangeableValues;

        function loadChangeableValues(changeableValues) {
            changeableValues.push(mX);
            changeableValues.push(mY);
        }


        function getX() {
            return mX.value();
        }

        function getY() {
            return mY.value();
        }


        return that;
    };

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);