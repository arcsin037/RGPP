(function(global) {
	/* global RGPP */
	"use strict";

    var objName = "WindowBase";

    var mBaseWindowIDSet = RGPP.System.IDSet({
        name: "Base Window",
        categoryID: 1,
        dataID: 1,
    });

    var constructor = function(spec, my) {
        var that;

        my = my || {};
        
        that = RGPP.System.Script();
        
        my.loadChangeableValuesPerScript = loadChangeableValuesPerScript;
        
        that.onLoadMap = onLoadMap;
        that.update = update;
        that.draw = draw;
        that.loadChangeableValuesPerScript = loadChangeableValuesPerScript;
        that.loadChangeableValuesPerEvent = loadChangeableValuesPerEvent;

        that.createWindowImage = createWindowImage;
        that.setPosSize = setPosSize;
        that.windowImage = windowImage;

        var mCenter = RGPP.System.Position2D({
            name: "Center",
            x: 320,
            y: 240,
        });

        var mSize = RGPP.System.Size2D({
            name: "Window",
            width: 100,
            height: 50,
        });

        var mFreeSizeImage = null;


        function onLoadMap(event) {
            createWindowImage();
        }

        function loadChangeableValuesPerEvent() {
            var changeableValues = [];

            mCenter.loadChangeableValues(changeableValues);
            mSize.loadChangeableValues(changeableValues);

            return changeableValues;
        }

        function loadChangeableValuesPerScript() {
            var changeableValues = [];
            mBaseWindowIDSet.loadChangeableValues(changeableValues);
            return changeableValues;
        }

        function update(event) {

        }

        function draw(ctx) {
            setPosSize(mCenter.x(), mCenter.y(), mSize.width(), mSize.height());
        }
        
        function createWindowImage(event, id) {
            mFreeSizeImage = event.createImageObj(id, mBaseWindowIDSet);
            mFreeSizeImage = RGPP.System.FreeSizeImage(mFreeSizeImage);
            return mFreeSizeImage;
        }
        

        function setPosSize(centerX, centerY, windowWidth, windowHeight) {
            mFreeSizeImage.setPosSize(centerX, centerY, windowWidth, windowHeight);
        }

        function windowImage() {
            return mFreeSizeImage;
        }

        return that;
    };


	RGPP.MW.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
