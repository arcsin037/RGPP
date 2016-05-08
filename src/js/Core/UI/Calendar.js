/**
 * @class Calendar UI
 * @author arcsin
 */
(function(global) {
	/* global RGPP */
	"use strict";
	    var objName = "Calendar";

    var constructor = function(spec) {
        var that = {};

        var dayOftheWeek = [' Sun ', ' Mon ', ' Tue ', ' Wed ', ' Thr ', ' Fri ', ' Sat '];

        var mDiv = document.createElement("div");
        var cssStyle = RGPP.System.CssStyle.getInstance();
        cssStyle.setRelativeCenterPosition(mDiv);

        var SAVE_NAME = "Schedule Data";

        var date = new Date();
        var mYear = date.getFullYear();
        var mMonth = date.getMonth() + 1;
        var mToday = date.getDate();

        var mPrevYear = mYear;
        var mPrevMonth = mMonth;
        var mPrevDay = mToday;

        var mSelectedYear = mYear;
        var mSelectedMonth = mMonth;
        var mSelectedDay = mToday;

		var scriptUtil = RGPP.System.ScriptUtil.getInstance();
        scriptUtil.outputMsgToConsole("year, month, day" + mYear + ", " + mMonth + ", " + mToday);
        
        that.div = div;
        that.onclickDay = onclickDay;
        that.onclickMonth = onclickMonth;
        that.update = update;
        that.setSelectedDay = setSelectedDay;
        that.setSelectedDate = setSelectedDate;
        that.setPrevDate = setPrevDate;
        that.prevYear = prevYear;
        that.prevMonth = prevMonth;
        that.prevDay = prevDay;

        that.selectedYear = selectedYear;
        that.selectedMonth = selectedMonth;
        that.selectedDay = selectedDay;

        that.getDateFromString = getDateFromString;

        function initialize(year, month) {
            var table = document.createElement('table');
            cssStyle.setRelativeCenterPosition(table);
            table.objName = 'js_calendar';
            that.table = table;
            table.onclick = function(e) {
                var evt = e || window.event;
                var target = evt.target || evt.srcElement;
                if (target.tagName === 'A' &&
                    target.hash.indexOf('#day-') === 0) {
                    return that.onclickDay.apply(that,
                        target.hash.match(/day-(\d+)-(\d+)-(\d+)/));
                }
                else if (target.tagName === 'A' &&
                    target.hash.indexOf('#month-') === 0) {
                    return that.onclickMonth.apply(that,
                        target.hash.match(/month-(\d+)-(\d+)/));
                }
            };
            setDate(year, month);
            setCaption(mSelectedYear, mSelectedMonth);
            setTable(mSelectedYear, mSelectedMonth);
            $(mDiv).append(table);
        }


        function onclickDay(id, year, month, day) {
            mSelectedDay = parseInt(day, 10);

            update(year, month);

            mPrevYear = parseInt(year, 10);
            mPrevMonth = parseInt(month, 10);
            mPrevDay = parseInt(day, 10);

            return false;
        }

        function onclickMonth(id, year, month) {

            update(year, month);

            mPrevYear = parseInt(year, 10);
            mPrevMonth = parseInt(month, 10);

            return false;
        }

        function remove() {
            mDiv.removeChild(that.table);
        }

        function update(year, month) {
            remove();
            initialize(year, month);
        }

        function setDate(year, month) {
            var today = new Date();
            mSelectedMonth = parseInt(month, 10) || (today.getMonth() + 1);
            mSelectedYear = parseInt(year, 10) || today.getFullYear();
        }

        function setCaption(year, month) {
            var caption = document.createElement('caption');
            var div = document.createElement('div');
            var next = document.createElement('a');
            next.href = '#month-' + ((month === 12) ? year + 1 : year) + '-' + (month === 12 ? 1 : month + 1);
            next.objName = 'next';
            next.innerHTML = '>';
            var prev = document.createElement('a');
            prev.href = '#month-' + ((month === 1) ? year - 1 : year) + '-' + (month === 1 ? 12 : month - 1);
            prev.objName = 'prev';
            prev.innerHTML = '<';
            var current = document.createElement('span');
            var text = document.createTextNode(year + '/' + month);
            current.appendChild(text);
            div.appendChild(prev);
            div.appendChild(current);
            div.appendChild(next);
            caption.appendChild(div);
            that.table.appendChild(caption);
        }

        function setTable(year, month) {
            var tbody = document.createElement('tbody');
            var first = new Date(year, month - 1, 1);
            var last = new Date(year, month, 0);
            var first_day = first.getDay();
            var last_date = last.getDate();
            var date = 1;
            var skip = true;

            var deadLineList = RGPP.System.DeadlineList.getInstance();
            var allDataSize = deadLineList.allDataSize();
            var allData = deadLineList.allData();
            var deadlineIndex = deadLineList.deadlineIndex();
            var deadlineDay = [];
            for (var scheduleIndex = 0; scheduleIndex < allDataSize; scheduleIndex += 1) {
                var dateString = allData[scheduleIndex].attrValue(deadlineIndex);
                var dateData = getDateFromString(dateString);
                if (dateData.year === year && dateData.month === month) {
                    deadlineDay.push(dateData.day);
                }
            }

            for (var row = 0; row < 7; row++) {
                var tr = document.createElement('tr');
                for (var col = 0; col < 7; col++) {
                    if (row === 0) {
                        var th = document.createElement('th');
                        var day = dayOftheWeek[col];
                        th.appendChild(document.createTextNode(day));
                        th.objName = 'calendar day-head day' + col;
                        tr.appendChild(th);
                    }
                    else {
                        if (row === 1 && first_day === col) {
                            skip = false;
                        }
                        if (date > last_date) {
                            skip = true;
                        }
                        var td = document.createElement('td');
                        td.objName = 'calendar day' + col;
                        if (!skip) {
                            var a = document.createElement('a');
                            a.href = '#day-' + year + '-' + month + '-' + date;
                            a.appendChild(document.createTextNode(date));
                            td.appendChild(a);
                            if (year === mYear && month === mMonth && date === mToday) {
                                $(a).addClass("current");
                            }

                            for (var i = 0; i < deadlineDay.length; i += 1) {
                                if (deadlineDay[i] === date) {
                                    $(a).addClass("deadline");
                                    break;
                                }
                            }

                            if (year === mPrevYear && month === mPrevMonth && date === mPrevDay) {
                                $(td).removeClass("selected");
                            }

                            if (year === mSelectedYear && month === mSelectedMonth && date === mSelectedDay) {
                                $(td).addClass("selected");
                            }


                            date += 1;
                        }
                        else {
                            td.innerHTML = '<span class="blank">&nbsp;</span>';
                        }
                        tr.appendChild(td);
                    }
                }
                tbody.appendChild(tr);
            }
            that.table.appendChild(tbody);
        }

        function getDateFromString(dateString) {
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
        }

        function div() {
            return mDiv;
        }

        function setSelectedDate(year, month, day) {
            mSelectedYear = parseInt(year, 10);
            mSelectedMonth = parseInt(month, 10);
            mSelectedDay = parseInt(day, 10);
        }

        function setSelectedDay(day) {
            mSelectedDay = parseInt(day, 10);
        }

        function setPrevDate(prevYear, prevMonth, prevDay) {
            mPrevYear = parseInt(prevYear, 10);
            mPrevMonth = parseInt(prevMonth, 10);
            if (prevDay !== undefined) {
                mPrevDay = parseInt(prevDay, 10);
            }
        }

        function prevYear() {
            return mPrevYear;
        }

        function prevMonth() {
            return mPrevMonth;
        }

        function prevDay() {
            return mPrevDay;
        }

        function selectedYear() {
            return mSelectedYear;
        }

        function selectedMonth() {
            return mSelectedMonth;
        }

        function selectedDay() {
            return mSelectedDay;
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
