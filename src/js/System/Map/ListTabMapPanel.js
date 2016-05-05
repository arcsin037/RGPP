/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "ListTabMapPanel";

	/**
	 * List Tab Map Panel
	 * @class ListTabMapPanel
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		// list tab panel
		var that = RGPP.System.ListTabPanel({
			itemListDiv: spec.itemDiv,
			listObject: RGPP.System.MapPanelList.getInstance(),
			changeTabFunc: changeTabFunc,
		});

		// change map
		that.changeMap = changeMap;
		// update current map panel
		that.updateCurrentMapPanel = updateCurrentMapPanel;
		// update all
		that.updateAll = updateAll;

		// Add changeable values script to debug panel
		that.addChangeableValuesScriptToDebugPanel = addChangeableValuesScriptToDebugPanel;
		// clear changeable values per script
		that.clearChangeableValuesPerScript = clearChangeableValuesPerScript;

		var mChangeableValuesDiv = $("<div>");

		/**
		 * Add changeable values script to debug panel
		 * @method addChangeableValuesScriptToDebugPanel
		 * @param changeableValues additional changeable values
		 */
		function addChangeableValuesScriptToDebugPanel(changeableValues) {
			// map panel list
			var mapPanelList = RGPP.System.MapPanelList.getInstance();

			// Only show the current map
			var currentMapPanel = mapPanelList.currentMapPanel();
			if (currentMapPanel === null) {
				return;
			}

			// clear changeable values per script
			clearChangeableValuesPerScript();

			// clear debug panel of current map panel
			currentMapPanel.clearDebugPanel();

			$(mChangeableValuesDiv).append(currentMapPanel.debugPanelDiv());

			for (var scriptIndex = 0; scriptIndex < changeableValues.length; scriptIndex += 1) {
				var changeableValueScript = changeableValues[scriptIndex];
				currentMapPanel.addChangeableValueScript(changeableValueScript);
			}

		}

		/**
		 * clear changeable values per script
		 * @method clearChangeableValuesPerScript
		 */
		function clearChangeableValuesPerScript() {
			$(mChangeableValuesDiv).empty();
		}

		/**
		 * Update all map panel
		 * @method updateAll
		 * @param {number} currentTabIndex current tab index
		 */
		function updateAll(currentTabIndex) {
			// map panel list
			var mapPanelList = RGPP.System.MapPanelList.getInstance();

			// create all map panel
			mapPanelList.createAllMapPanel();
			// update all
			mapPanelList.updateAll();

			that.update(currentTabIndex);
		}

		/**
		 * Update current map panel
		 * @method updateCurrentMapPanel
		 */
		function updateCurrentMapPanel() {
			// Game Manager
			var gm = RGPP.System.GameManager.getInstance();

			// Event Object Manager
			var eom = RGPP.System.EventObjManager.getInstance();

			// Clear Image Data Obj
			RGPP.System.ImageDataManager.getInstance().clearObj();

			// Clear Image Filter
			RGPP.System.ImageFilterInstance.getInstance().resetFilter();

			// Save Changeable Values of Previous Map
			eom.saveChangeableValues();

			// map panel list
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			var currentMapPanel = mapPanelList.currentMapPanel();

			// clear event object manager
			eom.clear();

			if (currentMapPanel !== null) {
				if (!gm.isEmulationMode()) {
					// if mode is debug mode, set focus to current map panel 
					currentMapPanel.setFocus();
				}
				// load current instance sprite of current map panel
				eom.loadCurrentEventObj();

				// update event dialog
				RGPP.System.EventDialogList.getInstance().updateDialog();

				// Load Changeable Values of Current Map
				var scriptVariable = eom.loadChangeableValuesPerScript();

				// add changeable values script to debug panel
				addChangeableValuesScriptToDebugPanel(scriptVariable);

				// load function
				eom.onLoad();

				// current map panel
				currentMapPanel.paintComponent();

				// draw edit system rect
				currentMapPanel.drawEditSystemRect();
			}
			else {
				clearChangeableValuesPerScript();
			}
		}

		/**
		 * change map function
		 * @method changeMap
		 * @param categoryID category ID
		 * @param mapID map ID
		 */
		function changeMap(categoryID, mapID) {
			// Game Manager
			var gm = RGPP.System.GameManager.getInstance();

			// Map panel list
			var mapPanelList = RGPP.System.MapPanelList.getInstance();

			var mapIndex = mapPanelList.searchAllIndexFromIDSet(categoryID, mapID);

			var panel = null;
			var padInfo = null;

			if (gm.isEmulationMode()) {
				panel = RGPP.System.EmulationModeCanvas.getInstance();
			}
			else {
				panel = mapPanelList.currentMapPanel();
			}

			if (panel !== null) {
				padInfo = panel.copyPadInfo();
				panel.resetInput();
			}

			that.changeTab(mapIndex);

			updateCurrentMapPanel();

			if (gm.isEmulationMode()) {
				panel = RGPP.System.EmulationModeCanvas.getInstance();
			}
			else {
				panel = mapPanelList.currentMapPanel();
			}

			if (panel !== null && padInfo !== null) {
				panel.setPadInfo(padInfo);
			}
		}

		/**
		 * Function to call when the tab is switched
		 * @method changeTabFunc
		 * @param tabID tab ID
		 */
		function changeTabFunc(tabID) {
			// Map panel list
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			mapPanelList.setCurrentMapPanel(tabID);
			// update current map panel
			updateCurrentMapPanel();
		}

		/**
		 * initialize
		 * @method initialize_
		 * @private
		 */
		var initialize_ = function() {
			var listTabMapPanelDiv = that.div();
			$(listTabMapPanelDiv).append(mChangeableValuesDiv);
		};

		// initialize
		initialize_();

		return that;
	};
	
	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
