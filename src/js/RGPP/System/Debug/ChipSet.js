(function(global) {
	/* global RGPP */
	"use strict";
	    var objName = "ChipSet";
    // Class
    var constructor = function(spec) {
        var that = {};

        var CHIP_SET_CATEGORY_ID = RGPP.System.ChangeableValue({
            name: spec.name + " ChipSet Category ID",
            minValue: -1,
            defaultValue: spec.chipSetCategoryID,
            stepValue: 1,
            type: "spinner"
        });

        var CHIP_SET_ID = RGPP.System.ChangeableValue({
            name: spec.name + " ChipSet ID",
            minValue: -1,
            defaultValue: spec.chipSetID,
            stepValue: 1,
            type: "spinner"
        });

        var CHIP_SET_NO = RGPP.System.ChangeableValue({
            name: spec.name + " ChipSet No",
            minValue: -1,
            defaultValue: spec.chipSetNo,
            stepValue: 1,
            type: "spinner"
        });

        that.categoryID = categoryID;
        that.id = id;
        that.no = no;

        that.loadChangeableValues = loadChangeableValues;

        function loadChangeableValues(changeableValues) {
            changeableValues.push(CHIP_SET_CATEGORY_ID);
            changeableValues.push(CHIP_SET_ID);
            changeableValues.push(CHIP_SET_NO);
        }


        function categoryID() {
            return CHIP_SET_CATEGORY_ID.value();
        }

        function id() {
            return CHIP_SET_ID.value();
        }

        function no() {
            return CHIP_SET_NO.value();
        }

        return that;
    };

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);