(function(global) {
	/* global RGPP */
	"use strict";
	    var objName = "IDSet";
    // Class
    var constructor = function(spec) {
        var that = {};

        var mCategoryID = RGPP.System.ChangeableValue({
            name: spec.name + " Category ID",
            minValue: 0,
            defaultValue: spec.categoryID,
            type: "spinner",
            stepValue: 1,
        });

        var mDataID = RGPP.System.ChangeableValue({
            name: spec.name + " Data ID",
            minValue: 0,
            defaultValue: spec.dataID,
            type: "spinner",
            stepValue: 1,
        });
        
        that.categoryID = getCategoryID;
        that.dataID = getDataID;
        that.loadChangeableValues = loadChangeableValues;
        
        function loadChangeableValues(changeableValues) {
            changeableValues.push(mCategoryID);
            changeableValues.push(mDataID);
        }
        
        
        function getCategoryID() {
            return mCategoryID.value();
        }

        function getDataID() {
            return mDataID.value();
        }


        return that;
    };

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);