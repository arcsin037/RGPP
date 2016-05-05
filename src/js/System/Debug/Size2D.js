(function(global) {
	/* global RGPP */
	"use strict";
	    var objName = "Size2D";
    // Class
    var constructor = function(spec) {
        var that = {};

        var mWidth = RGPP.System.ChangeableValue({
            name: spec.name + " Width",
            defaultValue: spec.width,
            type: "spinner",
            stepValue: 1,
        });

        var mHeight = RGPP.System.ChangeableValue({
            name: spec.name + " Height",
            defaultValue: spec.height,
            type: "spinner",
            stepValue: 1,
        });

        that.width = getWidth;
        that.height = getHeight;
        that.loadChangeableValues = loadChangeableValues;

        function loadChangeableValues(changeableValues) {
            changeableValues.push(mWidth);
            changeableValues.push(mHeight);
        }


        function getWidth() {
            return mWidth.value();
        }

        function getHeight() {
            return mHeight.value();
        }


        return that;
    };

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);