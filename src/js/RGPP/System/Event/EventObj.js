(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "EventObj";
	var constructor = function(spec) {
		var that = {};

		// private variable
		var mEventBase = spec.eventBase;
		var mEvent = RGPP.System.Event(spec);
		
		// Interface
		that.onLoadGame = onLoadGame;
		that.onLoadMap = onLoadMap;

		that.update = update;
		that.debugUpdate = debugUpdate;
		that.draw = draw;
		that.debugDraw = debugDraw;
		
		// save
		that.saveChangeableValuesPerEvent = saveChangeableValuesPerEvent;
		that.saveChangeableValuesPerScript = saveChangeableValuesPerScript;

		// load changeable value per script
		that.loadChangeableValuesPerScript = loadChangeableValuesPerScript;

		// Getter
		that.event = getEvent;

		function onLoadGame() {
			mEventBase.onLoadGame(mEvent);
		}

		function onLoadMap() {
			mEvent.clearGameObj();
			mEventBase.onLoadMap(mEvent);
		}

		function update() {
			mEventBase.update(mEvent);
		}

		function debugUpdate() {
			mEventBase.debugUpdate(mEvent);
		}

		function draw(ctx) {
			mEventBase.draw(ctx);
		}

		function debugDraw(ctx) {
			mEventBase.debugDraw(ctx);
		}

		function saveChangeableValuesPerEvent() {
			return mEventBase.saveInitValuesFromChangeableValue();
		}

		function saveChangeableValuesPerScript() {
			return mEventBase.saveInitValuesFromChangeableValuePerScript();
		}

		function loadChangeableValuesPerScript(changeableValues) {
			return mEventBase.loadChangeableValuesPerScript(changeableValues);
		}
		
		function getEvent() {
			return mEvent;
		}
		
		return that;
	};

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);