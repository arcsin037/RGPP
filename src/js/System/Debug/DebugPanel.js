(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "DebugPanel";
	// Class
	var constructor = function() {
		var that = {};

		var mDiv = $("<div>");
		var mFPSElement = $("<p>");
		var mTable = $("<table>");

		$(mDiv).append(mFPSElement);
		$(mDiv).append(mTable);

		that.div = div;
		that.add = add;
		that.setFPS = setFPS;
		that.clear = clear;


		function add(changeableValue) {
			$(mTable).append(changeableValue.trElement());
			changeableValue.initialize();
		}

		function setFPS(fps) {
			mFPSElement.html(fps.toFixed(2) + " fps");
		}

		function clear() {
			$(mDiv).empty();
			setFPS(0);
			$(mTable).empty();

			$(mDiv).append(mFPSElement);
			$(mDiv).append(mTable);
		}

		function div() {
			return mDiv;
		}

		return that;
	};



    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);
