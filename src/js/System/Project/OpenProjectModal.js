(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "OpenProjectModal";

	var constructor = function(spec) {
		var mReadFilePanel = RGPP.System.ReadFilePanel();

		var that = RGPP.System.Modal({
			title: "Open Project",
			bodyElement: mReadFilePanel.div(),
			footerButton: "open",
			approveFunc: approvFunc,
		});

		that.openFunc = openFunc;
		that.closeFunc = closeFunc;

		function initialize() {
			// Creating new map modal

		}

		function approvFunc() {
			var jsonData = mReadFilePanel.data(0);
		    RGPP.System.ProjectOperator.getInstance().uploadProject(jsonData);
			spec.updateFunc();
			that.hide();
		}

		function openFunc() {
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