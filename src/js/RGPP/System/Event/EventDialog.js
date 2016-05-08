(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "EventDialog";

	var constructor = function(spec) {
		var that = {};
		var scriptUtil = RGPP.System.ScriptUtil.getInstance();

		var mDialog = null;
		var mDiv = null;
		var mID = "";
		var mCategoryID = spec.categoryID;
		var mMapID = spec.mapID;
		var mEvent = spec.event;
		var mInputNameField = null;
		var mScriptFieldDiv = null;

		var NAME_FIELD_ID = "EventName";

		var mStateComboBox = null;
		var mScriptComboBoxes = null;
		var mDebugPanel = null;

		var mPrevSelectedIndexOfStateComboBox = null;
		var mPrevSelectedIndexOfScriptComboBox = [];

		that.categoryID = categoryID;
		that.mapID = mapID;
		that.eventID = eventID;

		that.update = update;
		that.setID = setID;
		that.setDialogTitle = setDialogTitle;
		that.open = open;
		that.close = close;
		that.finalize = finalize;

		function initialize() {
			mDiv = $("<div>");

			var bodyDiv = $("<div>");

			var nameFieldDiv = $("<div>");

			var namelabel = $('<label for = "name">');
			namelabel.append("Name");
			var nameFieldID = NAME_FIELD_ID + "_" + mCategoryID + "_" + mMapID + "_" + mEvent.id();

			mInputNameField = $("<input type = 'text'>");
			$(mInputNameField).attr("id", nameFieldID);
			$(mInputNameField).attr("value", mEvent.getName());
			$(mInputNameField).addClass("text ui-widget-content ui-corner-all");

			$(nameFieldDiv).append(namelabel);
			$(nameFieldDiv).append(mInputNameField);

			var stateFieldDiv = $("<div>");
			var statelabel = $('<label for = "state">');
			statelabel.append("State");
			mStateComboBox = RGPP.System.ComboBox({
				id: "StateComboBox_" + mCategoryID + "_" + mMapID + "_" + mEvent.id()
			});
			var currentStateIndex = mEvent.currentStateIndex();
			mStateComboBox.set(currentStateIndex);

			mStateComboBox.setUpdateFunc(stateUpdateFunc);
			mStateComboBox.setSetFunc(stateSetFunc);

			var cssStyle = RGPP.System.CssStyle.getInstance();
			cssStyle.setNonBreaking(mStateComboBox.div());

			mScriptFieldDiv = $("<div>");
			$(mScriptFieldDiv).addClass("borderbox");

			updateScriptComboBoxesDiv();

			var plusButtonForState = RGPP.System.Button("+");

			var modalWindow = RGPP.System.EventStateModal(mEvent, updateStateComboBox);

			$(stateFieldDiv).append(statelabel);
			$(stateFieldDiv).append(mStateComboBox.div());
			$(stateFieldDiv).append(plusButtonForState.element());


			var plusButtonForScript = RGPP.System.Button("+");

			var minusButtonForScript = RGPP.System.Button("-");

			$(bodyDiv).append(nameFieldDiv);
			$(bodyDiv).append(stateFieldDiv);
			$(bodyDiv).append(mScriptFieldDiv);
			$(bodyDiv).append(plusButtonForScript.element());
			$(bodyDiv).append(minusButtonForScript.element());

			$(mDiv).append(bodyDiv);

			mDialog = $(mDiv).dialog({
				autoOpen: true,
				width: 500,
				height: 400,
				modal: false,
				buttons: {
					"Save": saveFunction,
					Cancel: cancelFunction,
				}
			});

			// After adding body, set click function
			var uiOperator = RGPP.System.UIOperator.getInstance();
			uiOperator.registOpener(plusButtonForState.element(), modalWindow);
			uiOperator.registClickFunction(plusButtonForScript.element(), addScriptFunc);
			uiOperator.registClickFunction(minusButtonForScript.element(), removeScriptFunc);

			updateScriptComboBoxes();

			// Updating state after updating Script ComboBoxes.
			updateStateComboBox();
		}


		function update() {
			if (!mEvent.stateTransitionFlag()) {
				return;
			}
			scriptUtil.outputMsgToConsole("Event Dialog update!!!!");
			updateStateComboBox();
		}

		var saveFunction = function() {
			var name = $(mInputNameField).val();
			scriptUtil.outputMsgToConsole("name = " + name);
			var mapPanelList = RGPP.System.MapPanelList.getInstance();
			mEvent.setName(name);
			mEvent.saveInitValuesFromChangeableValue();
			mEvent.saveInitValuesFromChangeableValuePerScript();
			mEvent.updateCurrentStateScript(mScriptComboBoxes);

			mapPanelList.saveCurrentMapPanel();
			close();
		};

		var cancelFunction = function() {
			updateScriptComboBoxesDiv();
			close();
		};

		var updateStateComboBox = function() {
			var stateSize = mEvent.stateSize();

			var stateComboBoxDataImages = [];
			var stateComboBoxDescriptions = [];
			var stateComboBoxValues = [];
			var stateComboBoxTexts = [];

			for (var i = 0; i < stateSize; ++i) {
				stateComboBoxDataImages[i] = "";
				stateComboBoxDescriptions[i] = "";
				stateComboBoxValues[i] = mEvent.stateName(i);
				stateComboBoxTexts[i] = mEvent.stateName(i);
				scriptUtil.outputMsgToConsole("state name[" + i + "] = " + mEvent.stateName(i));
			}

			mStateComboBox.addData(
				stateComboBoxDataImages,
				stateComboBoxDescriptions,
				stateComboBoxValues,
				stateComboBoxTexts);

			mPrevSelectedIndexOfStateComboBox = mStateComboBox.selectedIndex();
			var currentStateIndex = mEvent.currentStateIndex();
			if (stateSize <= currentStateIndex) {
				mEvent.setCurrentStateIndex(0);
				currentStateIndex = 0;
			}
			mStateComboBox.set(currentStateIndex);
		};

		var updateScriptComboBoxField = function() {
			updateScriptComboBoxesDiv();
			updateScriptComboBoxes();
		};

		// This function will be called when the state combo box is changed.
		var stateUpdateFunc = function(selectedIndex) {

			var listTabMapPanel = RGPP.System.ListTabMapPanel.getInstance();
			var eom = RGPP.System.EventObjManager.getInstance();
			
			mEvent.setCurrentStateIndex(mPrevSelectedIndexOfStateComboBox);
			mEvent.updateCurrentStateScript(mScriptComboBoxes);
			
			// Save Changeable Values of Current Map
			eom.saveChangeableValues();
			
			mEvent.setCurrentStateIndex(selectedIndex);
			
			mPrevSelectedIndexOfStateComboBox = selectedIndex;

			updateScriptComboBoxField();

			listTabMapPanel.updateCurrentMapPanel();
		};

		// This function will be called when the state combo box is setted.
		var stateSetFunc = function(selectedIndex) {
			mEvent.setCurrentStateIndex(mPrevSelectedIndexOfStateComboBox);
			mEvent.updateCurrentStateScript(mScriptComboBoxes);
			mEvent.setCurrentStateIndex(selectedIndex);
			mPrevSelectedIndexOfStateComboBox = selectedIndex;
			updateScriptComboBoxField();
		};

		var addScriptFunc = function() {
			mEvent.updateCurrentStateScript(mScriptComboBoxes);
			mEvent.addCurrentStateScript();
			updateScriptComboBoxField();
		};

		var removeScriptFunc = function() {
			mEvent.removeCurrentStateScript();
			updateScriptComboBoxField();
		};

		var updateScriptComboBoxesDiv = function() {

			var scriptNum = mEvent.currentScriptNum();

			mScriptComboBoxes = [scriptNum];
			mDebugPanel = [scriptNum];

			var changeableValues = mEvent.loadChangeableValuesPerEvent();

			$(mScriptFieldDiv).empty();

			for (var comboBoxIndex = 0; comboBoxIndex < scriptNum; ++comboBoxIndex) {
				var scriptItemDiv = $("<div>");
				var scriptlabel = $('<label for = "script">');
				scriptlabel.append("Script " + comboBoxIndex + " | ");
				mScriptComboBoxes[comboBoxIndex] = RGPP.System.ComboBox({
					id: "ScriptComboBox_" +
						mMapID + "_" +
						mEvent.id() + "_" +
						mEvent.currentStateKey() + "_" + comboBoxIndex
				});

				var cssStyle = RGPP.System.CssStyle.getInstance();
				cssStyle.setNonBreaking(mScriptComboBoxes[comboBoxIndex].div());

				$(scriptItemDiv).append(scriptlabel);
				$(scriptItemDiv).append(mScriptComboBoxes[comboBoxIndex].div());
				$(mScriptFieldDiv).append(scriptItemDiv);

				// Changeable value
				mDebugPanel[comboBoxIndex] = RGPP.System.DebugPanel();
				if (changeableValues[comboBoxIndex] !== undefined) {
					for (var changeableValueIndex = 0; changeableValueIndex < changeableValues[comboBoxIndex].length; changeableValueIndex += 1) {
						mDebugPanel[comboBoxIndex].add(changeableValues[comboBoxIndex][changeableValueIndex]);
					}
				}
				$(mScriptFieldDiv).append(mDebugPanel[comboBoxIndex].div());
			}

		};

		var updateScriptComboBoxes = function() {

			var comboBoxNum = mEvent.currentScriptNum();
			var scriptDB = RGPP.System.ScriptDataBase.getInstance();
			var scriptAllData = scriptDB.allData();
			var nameIndex = scriptDB.nameIndex();
			var descriptionIndex = scriptDB.descriptionIndex();
			var scriptDataSize = scriptAllData.length;
			for (var comboBoxIndex = 0; comboBoxIndex < comboBoxNum; ++comboBoxIndex) {
				var scriptComboBoxDataImages = [];
				var scriptComboBoxDescriptions = [];
				var scriptComboBoxValues = [];
				var scriptComboBoxTexts = [];

				for (var scriptIndex = 0; scriptIndex < scriptDataSize; ++scriptIndex) {
					var string = scriptAllData[scriptIndex].id() + ":" + scriptAllData[scriptIndex].attrValue(nameIndex);
					scriptComboBoxDataImages[scriptIndex] = "";
					scriptComboBoxDescriptions[scriptIndex] = scriptAllData[scriptIndex].attrValue(descriptionIndex);
					scriptComboBoxValues[scriptIndex] = string;
					scriptComboBoxTexts[scriptIndex] = string;
				}

				mScriptComboBoxes[comboBoxIndex].setUpdateFunc(scriptComboBoxUpdateFunc);
				mScriptComboBoxes[comboBoxIndex].setSetFunc(scriptComboBoxSetFunc);

				mScriptComboBoxes[comboBoxIndex].addData(
					scriptComboBoxDataImages,
					scriptComboBoxDescriptions,
					scriptComboBoxValues,
					scriptComboBoxTexts);

				var currentScriptCategoryIndex = mEvent.currentScriptCategoryIndex(comboBoxIndex);
				var currentScriptDataIndex = mEvent.currentScriptIndex(comboBoxIndex);
				var currentComboBoxIndex = scriptDB.searchAllIndexFromIndexSet(currentScriptCategoryIndex, currentScriptDataIndex);
				scriptUtil.outputMsgToConsole(
					"[EventDialog.js / updateScriptComboBoxes] " + "currentScriptCategoryIndex = " + currentScriptCategoryIndex + "currentScriptDataIndex = " + currentScriptDataIndex + " comboBoxIndex = " + comboBoxIndex + "idx" + currentComboBoxIndex);
				mPrevSelectedIndexOfScriptComboBox[comboBoxIndex] = currentComboBoxIndex;
				mScriptComboBoxes[comboBoxIndex].set(currentComboBoxIndex);
			}
		};

		var scriptComboBoxUpdateFunc = function(selectedIndex) {
			var eom = RGPP.System.EventObjManager.getInstance();
			var listTabMapPanel = RGPP.System.ListTabMapPanel.getInstance();
			
			scriptUtil.outputMsgToConsole("[EventDialog.js / scriptComboBoxUpdateFunc] selectedIndex = " + selectedIndex);

			// Save Changeable Values of Current Map
			eom.saveChangeableValues();

			mEvent.updateCurrentStateScript(mScriptComboBoxes);
			
			updateScriptComboBoxField();

			listTabMapPanel.updateCurrentMapPanel();

		};

		var scriptComboBoxSetFunc = function(selectedIndex) {};

		// Setter
		function setID(idString) {
			mID = idString;
			$(mDiv).attr('id', mID);
		}

		function setDialogTitle(titleString) {
			$(mDiv).dialog("option", "title", titleString);
		}

		function open() {
			mDialog.dialog("open");
		}

		function close() {
			RGPP.System.EventDialogList.getInstance().removeDialog(mCategoryID, mMapID, mEvent);
		}

		function finalize() {
			mDialog.dialog("destroy");
		}
		
		function categoryID() {
			return mCategoryID;
		}
		
		function mapID() {
			return mMapID;
		}
		
		function eventID() {
			return mEvent.id();
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
