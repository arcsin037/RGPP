(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "CalendarModal";
	var constructor = function(spec) {
		var mUpdateFunc = spec.updateFunc;
		var mModalBody = $("<div>");

		var mCalendar = RGPP.System.Calendar();

		var cssStyle = RGPP.System.CssStyle.getInstance();
		var mTaskDiv = $("<div>");
		var mDeadlineDiv = $("<div>");

		mCalendar.onclickDay = onclickDay;
		mCalendar.onclickMonth = onclickMonth;

		cssStyle.setRelativeCenterPosition(mTaskDiv);
		cssStyle.setRelativeCenterPosition(mDeadlineDiv);
		var mOpenFlag = false;

		var that = RGPP.System.Modal({
			title: "Calendar",
			bodyElement: mModalBody,
			footerButton: "Set Date",
			approveFunc: updateStateFunc
		});

		that.openFunc = openFunc;
		that.closeFunc = closeFunc;

		function initialize() {
			$(mModalBody).empty();

			if (mOpenFlag) {
				var date = mCalendar.getDateFromString(spec.calendarInput.value());
				mCalendar.setSelectedDate(date.year, date.month, date.day);
				mCalendar.update(date.year, date.month);
				mOpenFlag = false;
			}

			$(mModalBody).append(mCalendar.div());

			$(mModalBody).append(mDeadlineDiv);
			$(mModalBody).append(mDeadlineDiv);
			$(mModalBody).append(mTaskDiv);
			initDeadLineDiv();
			initTaskDiv();
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


		function updateStateFunc() {
			var selectedYear = mCalendar.selectedYear();
			var selectedMonth = mCalendar.selectedMonth();
			var selectedDay = mCalendar.selectedDay();
			mUpdateFunc(selectedYear, selectedMonth, selectedDay);
			that.hide();
		}

		var initTaskDiv = function() {
			mTaskDiv.empty();

			var taskList = RGPP.System.TaskList.getInstance();
			var allDataSize = taskList.allDataSize();
			var allData = taskList.allData();
			var doneIndex = taskList.doneIndex();
			var dateIndex = taskList.dateIndex();
			var descriptionIndex = taskList.descriptionIndex();

			for (var scheduleIndex = 0; scheduleIndex < allDataSize; scheduleIndex += 1) {
				var done = allData[scheduleIndex].attrValue(doneIndex);
				if (!done) {
					var dateString = allData[scheduleIndex].attrValue(dateIndex);
					if (sameDate(dateString)) {
						var divElement = $("<div>");
						var description = allData[scheduleIndex].attrValue(descriptionIndex);
						$(divElement).append(description);

						$(mTaskDiv).append(divElement);
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


		function openFunc() {
			mOpenFlag = true;
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