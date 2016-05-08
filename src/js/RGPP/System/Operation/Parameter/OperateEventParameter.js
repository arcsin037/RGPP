/**
 * Drawing Parameter. For Using undo and redo.
 *
 * @namespace RGPP.System
 * @class OperateEventParameter
 * @author arcsin
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "OperateEventParameter";

	var constructor = function(event) {
		var that = {};
		var mEvent = event;

		that.getEventIndex = getEventIndex;
		that.getX = getX;
		that.getY = getY;
		that.getEvent = getEvent;
		that.copy = copy;

		function getEventIndex() {
			return mEvent.index();
		}

		function getX() {
			return mEvent.getInitX();
		}

		function getY() {
			return mEvent.getInitY();
		}

		function getEvent() {
			return mEvent;
		}

		function copy() {
			var ret = RGPP.System.OperateEventParameter(mEvent);
			return ret;
		}

		return that;
	};

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });
})((this || 0).self || global);
