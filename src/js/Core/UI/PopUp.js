/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "PopUp";

	/**
	 * Popup element
	 * @class PopUp
	 * @author arcsin
	 * @constructor
	 */
	var constructor = function(spec) {
		var that = {};

		// append element to pop up division
		that.appendElement = appendElement;

		// play effect
		that.playEffect = playEffect;

		// Set fade-in time (ms)
		that.setFadeInMs = setFadeInMs;

		// Set fade-out time (ms)
		that.setFadeOutMs = setFadeOutMs;

		// Set start fade-in time (ms)
		that.setStartFadeInMs = setStartFadeInMs;

		// Set start fade-out time (ms)
		that.setStartFadeOutMs = setStartFadeOutMs;

		// Set high light time (ms)
		that.setHighlightMs = setHighlightMs;

		// Get division of pop up element
		that.div = div;

		/**
		 * initialize
		 * @method initialize_
		 * @private
		 */
		var initialize_ = function() {
			$(mDiv).empty();
			$(mDiv).appendTo("body");
			$(mDiv).hide();
		};

		/**
		 * append element to pop up division
		 * @method appendElement
		 * @param element appending element
		 */
		function appendElement(element) {
			$(mDiv).append(element);
		}

		/**
		 * play effect
		 * @method playEffect
		 */
		function playEffect() {

			clearInterval(mFadeInTimerID);
			clearInterval(mFadeOutTimerID);

			// run the effect
			mFadeInTimerID = setTimeout(function() {
				$(mDiv).removeAttr("style").hide().fadeIn(mFadeInMs, highlightCallback_);
			}, mStartFadeInMs);

			mFadeOutTimerID = setTimeout(function() {
				$(mDiv).removeAttr("style").fadeOut(mFadeOutMs);
			}, mStartFadeOutMs);
		}

		/**
		 * Set fade-in time (ms)
		 * @method setFadeInMs
		 * @param {number} fadeInMs fade-in time (ms)
		 */
		function setFadeInMs(fadeInMs) {
			mFadeInMs = fadeInMs;
		}

		/**
		 * Set fade-out time (ms)
		 * @method setFadeOutMs
		 * @param {number} fadeOutMs fade-out time (ms)
		 */
		function setFadeOutMs(fadeOutMs) {
			mFadeOutMs = fadeOutMs;
		}

		/**
		 * Set start fade-in time (ms)
		 * @method setStartFadeInMs
		 * @param {number} startFadeInMs fade-in start time (ms)
		 */
		function setStartFadeInMs(startFadeInMs) {
			mStartFadeInMs = startFadeInMs;
		}

		/**
		 * Set start fade-out time (ms)
		 * @method setStartFadeOutMs
		 * @param {number} startFadeOutMs fade-out start time (ms)
		 */
		function setStartFadeOutMs(startFadeOutMs) {
			mStartFadeOutMs = startFadeOutMs;
		}

		/**
		 * Set hightlight time (ms)
		 * @method setHighlightMs
		 * @param {number} highlightMs highlight time (ms)
		 */
		function setHighlightMs(highlightMs) {
			mHighlightMs = highlightMs;
		}

		/**
		 * Get division of pop up element
		 * @method div
		 * @return division of pop up
		 */
		function div() {
			return mDiv;
		}

		/**
		 * call back function to highlight
		 * @method highlightCallback_
		 * @private
		 */
		var highlightCallback_ = function() {
			$(mDiv).effect("highlight", {}, mHighlightMs);
		};

		// division of pop up element
		var mDiv = $("<div>");
		// set class
		$(mDiv).attr("class", "popUp");

		// Start fade-in time (ms)
		var mStartFadeInMs = 1000;
		// Start fade-out time (ms)
		var mStartFadeOutMs = 10000;

		// Fade-in time (ms)
		var mFadeInMs = 1000;
		// Fade-out time (ms)
		var mFadeOutMs = 2000;
		// high-light time (ms)
		var mHighlightMs = 1000;

		var mFadeInTimerID = null;
		var mFadeOutTimerID = null;

		// initialize
		initialize_();

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);