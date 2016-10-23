/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
/* eslint no-console: ["error", {allow: ["time", "timeEnd"]}] */

const LABEL = 'timer'

/**
* Request Animation frame
* @method requestAnimationFrame
*/
export const requestAnimationFrame = (callback, interval) => {
    const reqAnimFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.setTimeout

    reqAnimFrame(callback, interval)
}

export default class Timer {
    /**
     * Timer Functions
     *
     * @class The features of measuring the time
     * @author arcsin
     * @constructor
     */
    constructor() {
        this.now = window.performance && (
            window.performance.now ||
            window.performance.mozNow ||
            window.performance.msNow ||
            window.performance.oNow ||
            window.performance.webkitNow)

        this.previousTime = this.getCurrentTime()
    }

    /**
     * Get current time
     * @method getCurrentTime
     * @return current time
     */
    getCurrentTime() {
        return (this.now && Reflect.apply(this.now, window.performance, [])) || (new Date())
    }

    /**
     * Measure frame per second
     * @method measureFPS
     * @return fps {Number} frame per second
     */
    measureFPS() {
        const diff = this.getCurrentTime() - this.previousTime
        const fps = 1000 / diff
        this.previousTime = this.getCurrentTime()
        return fps
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
