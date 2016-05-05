(function(global) {
	/* global RGPP */
	"use strict";
		var objName = "AnalogClock";
	var mClockImageIDSets = [];

	mClockImageIDSets[0] = RGPP.System.IDSet({
		name: "Clock Image",
		categoryID: 0,
		dataID: 0,
	});

	mClockImageIDSets[1] = RGPP.System.IDSet({
		name: "Second Image",
		categoryID: 0,
		dataID: 3,
	});

	mClockImageIDSets[2] = RGPP.System.IDSet({
		name: "Long Image",
		categoryID: 0,
		dataID: 2,
	});

	mClockImageIDSets[3] = RGPP.System.IDSet({
		name: "Short Image",
		categoryID: 0,
		dataID: 1,
	});


	mClockImageIDSets[4] = RGPP.System.IDSet({
		name: "Cover Image",
		categoryID: 0,
		dataID: 4,
	});


	var constructor = function(spec, my) {
		var that;
		my = my || {};

		// Time
		var mTime = {
			hour: 0,
			minute: 0,
			second: 0,
		};

		// hands of clock
		var mHands = {
			hourAngle: 0,
			minuteAngle: 0,
			secondAngle: 0,
		};

		var ADD_SECONDS = RGPP.System.ChangeableValue({
			name: "add seconds",
			minValue: 1,
			maxValue: 100,
			defaultValue: 1,
			stepValue: 1,
			type: "spinner"
		});

		var mClockPosition = RGPP.System.Position2D({
			name: "Clock",
			x: 320,
			y: 240
		});
		
		var mClockImages = [];


		that = RGPP.System.Script();
		that.onLoadMap = onLoadMap;
		that.update = update;
		that.debugDraw = debugDraw;
		that.draw = draw;
		that.loadChangeableValuesPerEvent = loadChangeableValuesPerEvent;
		that.loadChangeableValuesPerScript = loadChangeableValuesPerScript;

		function onLoadMap(event) {
			for (var i = 0; i < mClockImageIDSets.length; i += 1) {
				mClockImages[i] = event.createImageObj(i, mClockImageIDSets[i]);
				mClockImages[i].setOnScreen(true);
			}
		}

		function loadChangeableValuesPerEvent() {
			var changeableValues = [];
			changeableValues.push(ADD_SECONDS);
			mClockPosition.loadChangeableValues(changeableValues);

			return changeableValues;
		}

		function loadChangeableValuesPerScript() {
			var changeableValues = [];
			for (var i = 0; i < mClockImageIDSets.length; ++i) {
				mClockImageIDSets[i].loadChangeableValues(changeableValues);
			}
			return changeableValues;
		}


		function update(event) {
			for (var i = 0; i < mClockImageIDSets.length; ++i) {
				mClockImages[i].setCenterXY(mClockPosition.x(), mClockPosition.y());
			}
			mTime.second += ADD_SECONDS.value();

			if (mTime.second > 60) {
				mTime.minute += 1;
				mTime.second %= 60;
			}

			if (mTime.minute > 60) {
				mTime.hour += 1;
				mTime.minute %= 60;
			}

			if (mTime.hour > 12) {
				mTime.hour %= 12;
			}

			// get angle
			mHands.hourAngle = (mTime.hour % 12) * (360 / 12);
			mHands.minuteAngle = mTime.minute * (360 / 60);
			mHands.secondAngle = mTime.second * (360 / 60);

			//adjust angle
			mHands.hourAngle += (mTime.minute / 60) * (360 / 12);
			mHands.secondAngle += (mTime.second / 60) * (360 / 60);

			// console.log(mTime.hour + ":" + mTime.minute + ":" + mTime.second);
			// console.log(mHands.hourAngle + ":" + mHands.minuteAngle + ":" + mHands.secondAngle);
		}

		function debugDraw(ctx) {}

		function draw(ctx) {
			mClockImages[1].setDegree(mHands.secondAngle);
			mClockImages[2].setDegree(mHands.minuteAngle);
			mClockImages[3].setDegree(mHands.hourAngle);
		}

		return that;
	};
	RGPP.User.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});
})((this || 0).self || global);
