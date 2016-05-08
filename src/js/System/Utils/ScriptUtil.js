/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
/* eslint no-console: ["error", {allow: ["log", "warn", "error", "trace", "assert"]}] */
/* eslint no-debugger: 0 */
/**
 * Script Utility Functions
 * @class Script Utility Functions
 * @author arcsin
 * @constructor
 */
import RGPP from 'Core'

/**
 * For memolization function
 * @method memolizer
 * @param memo result stack
 * @param {Function} fundamental fundamental function
 */
export const memolizer = (memo, fundamental) => {
    const shell = (n) => {
        let result = memo[n]
        if (typeof result !== 'number') {
            result = fundamental(shell, n)
            memo[n] = result
        }
        return result
    }

    return shell
}

/**
 * Terminate process in debug boot mode
 *
 * @method terminate
 * @param {string} errorMsg error message when the process is terminated
 */
export const terminate = (errorMsg) => {
    // Console error message
    if (RGPP.Config.DEBUG_BOOT_MODE) {
        console.error('!!!Terminated!!!')
        console.error(errorMsg)
        console.trace()
        console.error('!!!!!!!!!!!!!!!!')
        debugBreak()
    }
}

/**
 * Assertion in debug boot mode
 *
 * @method assert
 * @param {Boolean} booleanValue bool value to check
 * @param {string} errorMsg error message to show when the boolean value is false
 */
export const assert = (booleanValue, errorMsg) => {
    if (RGPP.Config.DEBUG_BOOT_MODE) {
        console.assert(booleanValue, errorMsg)
        if (!booleanValue) {
            debugBreak()
            throw new Error(errorMsg)
        }
    }
}

/**
 * Break by debugger
 * @method debugBreak
 */
export const debugBreak = () => {
    debugger
}

/**
 * Get superior function
 * @method superiorFunc
 * @param parent parent object
 * @param {string} functionName function name
 */
export const superiorFunc = (parent, functionName) => {
    const func = parent[functionName]
    return () => Reflect.apply(func, parent, arguments)
}

/**
 * Output message to console in debug boot mode
 * @method outputMsgToConsole
 * @param msg message
 */
export const outputMsgToConsole = (msg) => {
    if (RGPP.Config.DEBUG_BOOT_MODE) {
        console.log(msg)
    }
}

/**
 * Output error message to console in debug boot mode
 * @method outputErrMsgToConsole
 * @param errorMsg error message
 */
export const outputErrMsgToConsole = (errorMsg) => {
    if (RGPP.Config.DEBUG_BOOT_MODE) {
        console.error(errorMsg)
        debugBreak()
    }
}

/**
 * Alert message
 * @method alert
 */
export const alertFunction = (msg) => {
    if (RGPP.Config.DEBUG_BOOT_MODE) {
        if (alert) {
            alert(msg)
        }
    }
}

export default {
    memolizer,
    terminate,
    assert,
    debugBreak,
    superiorFunc,
    outputMsgToConsole,
    outputErrMsgToConsole,
    alertFunction
}
