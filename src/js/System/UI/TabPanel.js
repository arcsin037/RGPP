(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "TabPanel";

	var constructor = function(panelName) {
		var that = {};
		var mDivTab = null;

		that.div = div;

		function initialize(panelName) {
			// tab panel
			mDivTab = document.createElement("div");
			mDivTab.setAttribute("id", "wrapper");

			// tabs
			var tabList = document.createElement("ul");
			tabList.setAttribute("id", "tabs_" + panelName);
			tabList.setAttribute("class", "tabs");
			// contents
			var contentsList = document.createElement("ul");
			contentsList.setAttribute("id", "content_" + panelName);
			contentsList.setAttribute("class", "content");

			mDivTab.appendChild(tabList);
			mDivTab.appendChild(contentsList);
		}

		function div() {
			return mDivTab;
		}

		initialize(panelName);
		return that;
	};

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);
