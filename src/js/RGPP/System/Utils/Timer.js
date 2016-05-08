/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
/* eslint no-console: ["error", {allow: ["time", "timeEnd"]}] */

const LABEL = 'timer'

export default class Timer {
    /**
     * Timer Functions
     *
     * @class The features of measuring the time
     * @author arcsin
     * @constructor
     */
    constructor() {
        const now = global.performance && (
            global.performance.now ||
            global.performance.mozNow ||
            global.performance.msNow ||
            global.performance.oNow ||
            global.performance.webkitNow)

        /**
         * Get current time
         * @method getCurrentTime
         * @return current time
         */
        this.getCurrentTime = () =>
            (now && Reflect.apply(now, window.performance, [])) || (new Date())

        let mPreviousTime = this.getCurrentTime()

        /**
         * Measure frame per second
         * @method measureFPS
         * @return fps {Number} frame per second
         */
        this.measureFPS = () => {
            const diff = this.getCurrentTime() - mPreviousTime
            const fps = 1000 / diff
            mPreviousTime = this.getCurrentTime()
            return fps
        }
    }

    /**
     * Start timer
     * @method start
     */
    start() {
        console.time(LABEL)
    }

    /**
     * Measure elapsed time from start function
     * @method measure
     */
    measure() {
        console.timeEnd(LABEL)
    }
}
