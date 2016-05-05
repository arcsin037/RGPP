(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "TaskPopUp";

	var constructor = function(spec) {
		var that = RGPP.System.PopUp();

		var initialize = function() {
			// initialize dead line
			initDeadline_();

			// initialize task list
			initTaskList_();
		};

		var initTaskList_ = function() {
			var title = "<div align='center'><B> -----Today's Task list----- </B></div>";
			that.appendElement(title);

			var taskList = RGPP.System.TaskList.getInstance();
			var allDataSize = taskList.allDataSize();
			var allData = taskList.allData();
			var doneIndex = taskList.doneIndex();
			var dateIndex = taskList.dateIndex();
			var descriptionIndex = taskList.descriptionIndex();

			// Set today's task
			for (var scheduleIndex = 0; scheduleIndex < allDataSize; scheduleIndex += 1) {
				var done = allData[scheduleIndex].attrValue(doneIndex);
				if (done) {
					continue;
				}
				var dateString = allData[scheduleIndex].attrValue(dateIndex);
				if (isToday_(dateString)) {
					var pElement = $("<p>");
					var description = allData[scheduleIndex].attrValue(descriptionIndex);
					$(pElement).append(description);
					that.appendElement(pElement);
				}
			}
		};

		var initDeadline_ = function() {
			var deadlineList = RGPP.System.DeadlineList.getInstance();
			var allDataSize = deadlineList.allDataSize();
			var allData = deadlineList.allData();
			var deadlineIndex = deadlineList.deadlineIndex();
			var descriptionIndex = deadlineList.descriptionIndex();
			var minDiffDay = Number.MAX_VALUE;
			var description = null;
			// get Dead line
			for (var scheduleIndex = 0; scheduleIndex < allDataSize; scheduleIndex += 1) {
				var dateString = allData[scheduleIndex].attrValue(deadlineIndex);
				var diffDay = getDiffToDay_(dateString);
				if (diffDay < 0) {
					continue;
				}
				var tmpDescription = allData[scheduleIndex].attrValue(descriptionIndex);
				if (diffDay === minDiffDay) {
					description.push(tmpDescription);
				}
				else if (diffDay < minDiffDay) {
					minDiffDay = diffDay;
					description = [];
					description.push(tmpDescription);
				}

			}


			if (description === null) {
				return;
			}

			var cssStyle = RGPP.System.CssStyle.getInstance();
			// set description
			for (var i = 0; i < description.length; i += 1) {
				var pElement = $("<p>");
				var string = "";
				if (minDiffDay > 0) {
					string = "It is <B>" + minDiffDay + "</B> more days to " + description[i];
					if (minDiffDay < 7) {
						if (minDiffDay < 3) {
							cssStyle.setFontColor(pElement, '#ec6800');
						}
						else {
							cssStyle.setFontColor(pElement, 'blue');
						}
					}
					else {
						cssStyle.setFontColor(pElement, 'green');
					}
				}
				else {
					cssStyle.setFontColor(pElement, 'red');
					string = "The last day of " + description[i];
				}
				$(pElement).append(string);
				that.appendElement(pElement);
			}
		};

		/**
		 * calculating difference between scheduled date and today
		 * 
		 * @method getDiffToDay_
		 * @param scheduledDateString scheduled date string
		 * @private
		 */
		function getDiffToDay_(scheduledDateString) {
			var today = new Date();
			var date1 = new Date(scheduledDateString);

			var diffMs = date1.getTime() - today.getTime();

			var diffDay = Math.floor(diffMs / 86400000);
			diffDay += 1;

			return diffDay;
		}

		/**
		 * calculating difference of today
		 * 
		 * @method getDateFromString_
		 * @param difference between today and plan
		 * @private
		 */
		var getDateFromString_ = function(dateString) {
			var dateArray = dateString.split('/');
			var year = parseInt(dateArray[0], 10);
			var month = parseInt(dateArray[1], 10);
			var day = parseInt(dateArray[2], 10);
			var retDate = {
				year: year,
				month: month,
				day: day
			};
			return retDate;
		};

		/**
		 * Whether date string is today
		 * 
		 * @method isToday_
		 * @param dateString check dateString
		 * @return whether date string is today
		 * @private
		 */
		function isToday_(dateString) {
			var date = getDateFromString_(dateString);

			var today = new Date();
			var year = today.getFullYear();
			var month = today.getMonth() + 1;
			var day = today.getDate();
			if (year === date.year) {
				if (month === date.month) {
					if (day === date.day) {
						return true;
					}
				}
			}
			return false;
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