/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "TabFunction";

	/**
	 * Tab Function
	 * @class TabFunction
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function() {
		var that = {};

		that.addTab = addTab;
		that.removeTab = removeTab;
		that.changeTab = changeTab;

		function addTab(link, panelName, itemList) {
			var tabID = parseInt($(link).attr("tabID"), 10);

			// hide other tabs
			$("#tabs_" + panelName + " li").removeClass("current");
			$("#content_" + panelName + " div").hide();
			var content = itemList.content(tabID);

			// If tab already exist in the list, return
			if ($("#" + $(link).attr("rel")).length != 0) {
				// set the newly added tab as current
				$("#" + $(link).attr("rel")).parent().addClass("current");
				$("#" + $(link).attr("rel") + "_content").show();
				$(content).show();

				return tabID;
			}

			// Create new element
			var div = document.createElement("div");
			$(function() {

				var parentName = "#" + panelName + "_title";
				$("#content_" + panelName).resizable({
					autoHide: true,
					containment: parentName
				});

				$("#" + panelName).resizable({
					alsoResize: "#content_" + panelName
				});
			});
			var cssStyle = RGPP.System.CssStyle.getInstance();
			cssStyle.setPercentSize(div, 100, 100);
			cssStyle.setScroll(div);
			cssStyle.setPadding(div, 5, 5, 0, 0);

			div.contentEditable = true;
			div.focus();
			var panel = itemList.panel(tabID);
			panel.setKeyBoard(div);

			div.id = $(link).attr("rel") + '_content';
			div.tabID = tabID;
			$(div).append(content);
			$("#content_" + panelName).append(div);

			// add new tab and related content
			$("#tabs_" + panelName).append(
				"<li class='current'>" + "<a class='tab' id='" + $(link).attr("rel") + "' href='#" + panelName +
				"' anchorTabID=" + tabID + ">" + $(link).html() + "</a><a href='#" + panelName + "' class='remove'>x</a></li>");

			// set the newly added tab as current
			$("#" + $(link).attr("rel") + "_content").show();
			$(content).show();

			return tabID;
		}

		function removeTab(link, panelName) {
			// Get the tab name
			var tabID = $(link).parent().find(".tab").attr("id");

			// remove tab and related content
			var contentname = tabID + "_content";
			$("#" + contentname).remove();
			$(link).parent().remove();

			// if there is no current tab and if there are still tabs left, show the first one
			if ($("#tabs_" + panelName + " li.current").length == 0 && $("#tabs_" + panelName + " li").length > 0) {

				// find the first tab
				var firsttab = $("#tabs_" + panelName + " li:first-child");
				firsttab.addClass("current");

				// get its link name and show related content
				var firsttabid = $(firsttab).find("a.tab").attr("id");
				$("#" + firsttabid + "_content").show();
			}
			var currentTabID = parseInt($(".current").find(".tab").attr("anchortabid"), 10);
			return currentTabID;
		}

		function changeTab(link, panelName) {
			// Get the tab name
			var contentname = $(link).attr("id") + "_content";

			// hide all other tabs
			$("#content_" + panelName + " div").hide();
			$("#tabs_" + panelName + " li").removeClass("current");
			// show current tab
			$("#" + contentname).show();
			$(link).parent().addClass("current");

			var contentID = parseInt($("#" + contentname)[0].tabID, 10);
			return contentID;
		}

		return that;
	};
	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
