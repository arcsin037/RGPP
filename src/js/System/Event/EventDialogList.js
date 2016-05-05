/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "EventDialogList";
	/**
	 * Event Dialog List
	 * @class EventDialogList
	 * @author arcsin
	 * @constructor 
	 */
	var constructor = function(spec) {
		var that = RGPP.System.List();

		// Interface
		that.eventDialogOpen = eventDialogOpen;
		that.updateDialog = updateDialog;
		that.removeDialog = removeDialog;
		that.finalize = finalize;

		function eventDialogOpen(categoryID, mapID, event) {
			var idString = createDialogID(categoryID, mapID, event.id());
			var dialogObj = $("#" + idString);
			var isOpen = $(dialogObj).dialog("isOpen");
			if (isOpen === true) {
				// alert("already open!");
				$(dialogObj).dialog("moveToTop");
			}
			else if (isOpen === false) {
				// alert("re open!");
				$(dialogObj).dialog("moveToTop");
				$(dialogObj).dialog("open");
			}
			else {
				// alert("Open Event Dialog");
				var eventDialog = RGPP.System.EventDialog({
					categoryID: categoryID,
					mapID: mapID,
					event: event
				});
				eventDialog.setID(idString);
				eventDialog.setDialogTitle(
					"Event ID : " + event.id() + " MapID (" + categoryID + ", " + mapID + ")" + " Position (" + event.getInitX() + "," + event.getInitY() + ")");
				eventDialog.open();
				that.push(eventDialog);
			}
			updateDialog();
		}

		function updateDialog() {
			var dialogSize = that.size();
			var dialogData = that.datas();
			for (var dialogIndex = 0; dialogIndex < dialogSize; ++dialogIndex) {
				dialogData[dialogIndex].update();
			}
		}

		function finalize() {
			for (var i = 0; i < that.size(); i += 1) {
				that.data(i).finalize();
			}
			that.clear();
		}

		function removeDialog(categoryID, mapID, event) {
			var idString = createDialogID(categoryID, mapID, event.id());
			var dialogObj = $("#" + idString);

			var size = that.size();
			var eventDialogs = that.datas();
			for (var i = 0; i < size; ++i) {
				if ((categoryID === eventDialogs[i].categoryID()) &&
					(mapID === eventDialogs[i].mapID()) &&
					(event.id() === eventDialogs[i].eventID())) {

					that.remove(i);
					break;
				}

			}

			var isOpen = $(dialogObj).dialog("isOpen");
			if (isOpen === true) {
				// alert("destroy in open");
				$(dialogObj).dialog("destroy");
			}
			else if (isOpen === false) {
				// alert("destroy in close");
				$(dialogObj).dialog("destroy");
			}
		}

		var createDialogID = function(categoryID, mapID, eventID) {
			return "CategoryID_" + categoryID + "_MapID_" + mapID + "_EventDialog_" + eventID;
		};

		return that;
	};

	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);