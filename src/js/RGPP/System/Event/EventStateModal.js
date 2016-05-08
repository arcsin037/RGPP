(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "EventStateModal";
	var constructor = function(event, updateStateComboBoxFunc) {
		var mTbodyElement = null;
		var mInputNameField = null;
		var mEvent = event;

		var mStateNum = 0;
		var mUpdateStateComboBoxFunc = updateStateComboBoxFunc;
		var mModalBody = $("<div>");

		var that = RGPP.System.Modal({
			title: "State of Event ID:" + mEvent.id() + " / " + mEvent.getName(),
			bodyElement: mModalBody,
			footerButton: "Save",
			approveFunc: updateStateFunc
		});

		that.openFunc = openFunc;
		that.closeFunc = closeFunc;

		function initialize() {
			$(mModalBody).empty();
			mStateNum = 0;
			// Creating new map modal
			var eventStateTable = $("<table>");
			$(eventStateTable).addClass("ui-widget ui-widget-content");
			var eventStateThead = $("<thead>");
			var eventStateHeader = $("<tr>");
			$(eventStateHeader).addClass("ui-widget-header");
			var eventIDHeader = $("<th>");
			$(eventIDHeader).append("ID    |");
			var eventNameHeader = $("<th>");
			$(eventNameHeader).append("Key Value");

			$(eventStateHeader).append(eventIDHeader);
			$(eventStateHeader).append(eventNameHeader);

			$(eventStateThead).append(eventStateHeader);
			$(eventStateTable).append(eventStateThead);

			mTbodyElement = document.createElement("tbody");

			var stateSize = mEvent.stateSize();
			var trElements = [stateSize];

			mInputNameField = [stateSize];
			for (var i = 0; i < stateSize; ++i) {
				trElements[i] = $("<tr>");
				$(trElements[i]).append("<td>" + mEvent.stateID(i) + "</td>");
				var tdNameField = $("<td>");
				mInputNameField[i] = $("<input type = 'text'>");
				$(mInputNameField[i]).attr("value", mEvent.stateName(i));
				$(mInputNameField[i]).addClass("text ui-widget-content ui-corner-all");

				$(tdNameField).append(mInputNameField[i]);

				$(trElements[i]).append(tdNameField);
				$(mTbodyElement).append(trElements[i]);
				++mStateNum;
			}

			$(eventStateTable).append(mTbodyElement);

			var plusButton = RGPP.System.Button("+");
			var minusButton = RGPP.System.Button("-");

			$(mModalBody).append(eventStateTable);
			$(mModalBody).append(plusButton.element());
			$(mModalBody).append(minusButton.element());

			var addState = function() {
				var trElement = $("<tr>");
				$(trElement).append("<td>" + mStateNum + "</td>");
				var tdNameField = $("<td>");
				mInputNameField[mStateNum] = $("<input type = 'text'>");
				$(mInputNameField[mStateNum]).attr("value", "State " + mStateNum);
				$(mInputNameField[mStateNum]).addClass("text ui-widget-content ui-corner-all");

				$(tdNameField).append(mInputNameField[mStateNum]);

				$(trElement).append(tdNameField);
				$(mTbodyElement).append(trElement);
				++mStateNum;
			};

			var removeState = function() {
				if (mStateNum > 1) {
					mTbodyElement.removeChild(mTbodyElement.lastChild);
					--mStateNum;
				}
			};

			// After adding body, set click function
			var uiOperator = RGPP.System.UIOperator.getInstance();
			uiOperator.registClickFunction(plusButton.element(), addState);
			uiOperator.registClickFunction(minusButton.element(), removeState);
		}

		function updateStateFunc() {
			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			scriptUtil.outputMsgToConsole("StateNum = " + mStateNum);
			mEvent.updateStateWithInputField(mStateNum, mInputNameField);
			mUpdateStateComboBoxFunc();
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