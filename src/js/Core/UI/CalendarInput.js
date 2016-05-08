(function(global) {
	/* global RGPP */
	"use strict";
	    var objName = "CalendarInput";

    var constructor = function(spec) {
        var that = {};
        var mDiv = $("<div>");

        var mInput = $("<input readonly='readonly'>");
        var mButton = null;

        that.div = div;
        that.setValue = setValue;
        that.value = getValue;


        var initialize = function() {
            var oprateCanvas = RGPP.System.OperateCanvas.getInstance();
            var calendarButtonImage = oprateCanvas.loadImage(RGPP.Config.SYSTEM_IMAGE_PATH + "calendar.svg");
            mButton = RGPP.System.Button(calendarButtonImage);

            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            var dateString = [year, month, day].join('/');
            $(mInput).attr("value", dateString);

            $(mDiv).append(mInput);
            $(mDiv).append(mButton.element());

            var calendarModal = RGPP.System.CalendarModal({
                updateFunc: updateValue,
                calendarInput: that,
            });

            var uiOperator = RGPP.System.UIOperator.getInstance();

            uiOperator.registOpener($(mButton.element()), calendarModal);
        };

        var updateValue = function(year, month, day) {
            var valueString = [year, month, day].join('/');
            $(mInput).attr("value", valueString);
        };


        function div() {
            return mDiv;
        }

        function getValue() {
            return $(mInput).attr("value");
        }

        function setValue(valueString) {
            $(mInput).attr("value", valueString);
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