(function(global) {
	/* global RGPP */
	"use strict";
	    var objName = "Strings";
    // Class
    var constructor = function(spec) {
        var that = {};

        var mStrings = [spec.size];

        for (var i = 0; i < spec.size; i += 1) {
            mStrings[i] = RGPP.System.ChangeableValue({
                name: spec.name + " " + i,
                defaultValue: "",
                type: "other",
            });
        }

        that.setValue = setValue;
        that.value = value;
        that.size = size;

        that.loadChangeableValues = loadChangeableValues;

        function loadChangeableValues(changeableValues) {
            for (var i = 0; i < spec.size; i += 1) {
                changeableValues.push(mStrings[i]);
            }
        }


        function value(index) {
            return mStrings[index].value();
        }
        
        function setValue(index, value) {
            mStrings[index].setValue(value);
        }
        
        function size() {
            return spec.size;
        }

        return that;
    };

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);