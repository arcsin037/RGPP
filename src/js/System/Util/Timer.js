/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
    /* global RGPP */
    "use strict";
    var objName = "Timer";

    /**
     * Timer Functions
     * 
     * @class The features of measuring the time 
     * @author arcsin
     * @constructor
     */
    var constructor = function() {
        var that = {};

        // Start timer
        that.start = start;
        // Measure elapsed time from start function
        that.measure = measure;
        // Measure frame per second
        that.measureFPS = measureFPS;
        // Get current time
        that.getCurrentTime = getCurrentTime;

        var LABEL = "timer";
        
        var now = global.performance && (
            global.performance.now ||
            global.performance.mozNow ||
            global.performance.msNow ||
            global.performance.oNow ||
            global.performance.webkitNow);

        var mPreviousTime = getCurrentTime();

        /**
         * Start timer
         * @method start
         */
        function start() {
            console.time(LABEL);
        }

        /**
         * Measure elapsed time from start function
         * @method measure
         */
        function measure() {
            console.timeEnd(LABEL);
        }

        /**
         * Measure frame per second
         * @method measureFPS
         * @return fps {Number} frame per second
         */
        function measureFPS() {
            var diff = getCurrentTime() - mPreviousTime;
            var fps = 1000 / diff;
            mPreviousTime = getCurrentTime();
            return fps;
        }
        
        /**
         * Get current time
         * @method getCurrentTime
         * @return current time
         */ 
        function getCurrentTime() {
            return (now && now.call(window.performance)) || (new Date());
        }

        return that;
    };

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);
