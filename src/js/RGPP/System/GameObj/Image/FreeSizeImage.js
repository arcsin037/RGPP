(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "FreeSizeImage";

	var constructor = function(that) {
		var mHitWidth = 0;
		var mHitHeight = 0;

		that.setPosSize = setPosSize;
		that.hitSquareWidth = hitSquareWidth;
		that.hitSquareHeight = hitSquareHeight;

		that.setDivideXY(3, 3);

		function setPosSize(centerX, centerY, windowWidth, windowHeight) {
			mHitWidth = windowWidth;
			mHitHeight = windowHeight;

			var divideWidth = that.divideWidth();
			var divideHeight = that.divideHeight();
			var horizontalWidth = windowWidth - divideWidth * 2;
			var horizontalHeight = windowHeight - divideHeight * 2;
			var scaleX = horizontalWidth / divideWidth;
			var scaleY = horizontalHeight / divideHeight;
			that.setDivideScale(1, 0, scaleX, 1);
			that.setDivideScale(1, 2, scaleX, 1);

			that.setDivideScale(0, 1, 1, scaleY);
			that.setDivideScale(2, 1, 1, scaleY);

			that.setDivideScale(1, 1, scaleX, scaleY);
			that.setCenterXY(centerX, centerY);
		}

		function hitSquareWidth() {
			return mHitWidth;
		}

		function hitSquareHeight() {
			return mHitHeight;
		}

		return that;
	};



    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);
