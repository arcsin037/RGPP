(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "CategoryModal";
	var constructor = function(updateFunc) {
		var mUpdateFunc = updateFunc;
		var mModalBody = $("<div>");
		var mInput = null;
		var that = RGPP.System.Modal({
			title: "Add Category",
			bodyElement: mModalBody,
			footerButton: "Add",
			approveFunc: updateStateFunc
		});

		that.openFunc = openFunc;
		that.closeFunc = closeFunc;

		function initialize() {
			$(mModalBody).empty();
			var label = $("<label>");
			$(label).append("Category Name");
			mInput = $("<input>");
			$(mModalBody).append(label);
			$(mModalBody).append(mInput);
		}

		function updateStateFunc() {
		    var categoryName = $(mInput).val();
			mUpdateFunc(categoryName);
			that.hide();
		}

		function openFunc() {
			initialize();
			that.open();
		}

		function closeFunc() {
			that.hide();
		}

		initialize();
		return that;
	};
    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);