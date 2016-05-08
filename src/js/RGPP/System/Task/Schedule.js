(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "Schedule";

	var constructor = function(spec) {
		var that = {};

		var mDialog = null;
		var mDiv = $("<div>");

		var mCalendar = RGPP.System.Calendar();

		mCalendar.onclickDay = onclickDay;
		mCalendar.onclickMonth = onclickMonth;

		var mVariousInputData = [];

		var cssStyle = RGPP.System.CssStyle.getInstance();
		var mTaskTable = $("<table>");
		var mDeadlineDiv = $("<div>");

		cssStyle.setRelativeCenterPosition(mTaskTable);
		cssStyle.setRelativeCenterPosition(mDeadlineDiv);

		that.initialize = initialize;
		that.div = div;
		that.switching = switching;
		that.onclickDay = onclickDay;
		that.onclickMonth = onclickMonth;

		function initialize(year, month) {
			$(mDiv).empty();
			$(mDiv).append(mCalendar.div());

			$(mDiv).append(mDeadlineDiv);
			$(mDiv).append(mTaskTable);
			initDeadLineDiv();
			initTaskTable();

			mDialog = $(mDiv).dialog({
				autoOpen: false,
				width: 500,
				height: 400,
				modal: false,
				title: "Schedule",
				buttons: {
					"Save": saveFunction,
					Cancel: cancelFunction,
				}
			});
		}

		function onclickDay(id, year, month, day) {

			mCalendar.setSelectedDay(day);

			mCalendar.update(year, month);

			mCalendar.setPrevDate(year, month, day);

			initialize();

			return false;
		}

		function onclickMonth(id, year, month) {
			mCalendar.update(year, month);

			mCalendar.setPrevDate(year, month);

			initialize();

			return false;
		}

		function div() {
			return mDiv;
		}


		function switching() {
			var isOpen = $(mDialog).dialog("isOpen");
			if (isOpen === true) {
				$(mDialog).dialog("close");
			}
			else if (isOpen === false) {
				initialize();
				$(mDialog).dialog("open");
			}
		}


		var initTaskTable = function() {
			mTaskTable.empty();

			var taskList = RGPP.System.TaskList.getInstance();
			var allDataSize = taskList.allDataSize();
			var allData = taskList.allData();
			var doneIndex = taskList.doneIndex();
			var dateIndex = taskList.dateIndex();
			var descriptionIndex = taskList.descriptionIndex();

			var variousInputIndex = 0;
			mVariousInputData = [];

			for (var scheduleIndex = 0; scheduleIndex < allDataSize; scheduleIndex += 1) {
				var done = allData[scheduleIndex].attrValue(doneIndex);
				if (!done) {
					var dateString = allData[scheduleIndex].attrValue(dateIndex);
					if (sameDate(dateString)) {
						var trElement = $("<tr>");
						var tdCheckBoxField = $("<td>");
						var categoryID = taskList.searchCategoryIDFromIndex(scheduleIndex);
						var dataID = taskList.searchDataIDFromIndex(scheduleIndex);

						var variousInput = RGPP.System.VariousInput({
							type: "checkBox"
						});

						mVariousInputData[variousInputIndex] = {
							categoryID: categoryID,
							dataID: dataID,
							variousInput: variousInput
						};



						$(tdCheckBoxField).append(variousInput.element());
						var tdDescriptionField = $("<td>");
						var description = allData[scheduleIndex].attrValue(descriptionIndex);
						$(tdDescriptionField).append(description);

						$(trElement).append(tdCheckBoxField);
						$(trElement).append(tdDescriptionField);
						$(mTaskTable).append(trElement);

						variousInput.initialize({
							initValue: false
						});

						variousInputIndex += 1;
					}
				}
			}
		};

		var initDeadLineDiv = function() {
			$(mDeadlineDiv).empty();

			var deadLineList = RGPP.System.DeadlineList.getInstance();
			var allDataSize = deadLineList.allDataSize();
			var allData = deadLineList.allData();
			var deadlineIndex = deadLineList.deadlineIndex();
			var descriptionIndex = deadLineList.descriptionIndex();

			for (var scheduleIndex = 0; scheduleIndex < allDataSize; scheduleIndex += 1) {
				var dateString = allData[scheduleIndex].attrValue(deadlineIndex);
				if (sameDate(dateString)) {
					var divElement = $("<div>");
					$(mDeadlineDiv).append(divElement);
					var description = allData[scheduleIndex].attrValue(descriptionIndex);
					$(divElement).append(description);
					cssStyle.setRelativeCenterPosition(divElement);
					cssStyle.setFontColor(divElement, 'red');
				}
			}

		};


		var sameDate = function(dateString) {
			var date = mCalendar.getDateFromString(dateString);

			if (mCalendar.selectedYear() === date.year) {
				if (mCalendar.selectedMonth() === date.month) {
					if (mCalendar.selectedDay() === date.day) {
						return true;
					}
				}
			}
			return false;
		};

		var saveFunction = function() {
			var taskList = RGPP.System.TaskList.getInstance();
			var scriptUtil = RGPP.System.ScriptUtil.getInstance();
			for (var i = 0; i < mVariousInputData.length; i += 1) {
				var categoryID = mVariousInputData[i].categoryID;
				var dataID = mVariousInputData[i].dataID;
				var attrIndex = taskList.doneIndex();
				var value = mVariousInputData[i].variousInput.value();
				scriptUtil.outputMsgToConsole("categoryID = " + categoryID);
				scriptUtil.outputMsgToConsole("dataID = " + dataID);
				scriptUtil.outputMsgToConsole("attrIndex = " + attrIndex);
				scriptUtil.outputMsgToConsole("value = " + value);
				taskList.setData(categoryID, dataID, attrIndex, value);
			}
			taskList.save();

			$(mDialog).dialog("close");
		};

		var cancelFunction = function() {
			$(mDialog).dialog("close");

		};

		initialize();

		return that;
	};

    RGPP.System.exportsAsSingleton({
        name: objName,
        constructorFunc: constructor,
        module: module
    });


})((this || 0).self || global);