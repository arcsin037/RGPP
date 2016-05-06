'use strict'

import Config from './Common/Config.json'
import Const from './Common/Const.json'
import MW from '../MW'
import System from '../System'
import User from '../User'

/**
 * Global Object of RGPP
 *
 * @module RGPP
 *
 * @submodule System
 * @submodule MW
 * @submodule User
 * @main RGPP
 * @class RGPP
 * @author arcsin
 */

/**
 * String of System namespace
 *
 * @property SYSTEM_NAME_SPACE_STRING
 * @type {String}
 * @private
 * @final
 */
const SYSTEM_NAME_SPACE_STRING = 'System',

    /**
     * String of middle-ware namespace
     * @property MW_NAME_SPACE_STRING
     * @type {String}
     * @private
     * @final
     */
    MW_NAME_SPACE_STRING = 'MW',

    /**
     * String of user namespace
     *
     * @property USER_NAME_SPACE_STRING
     * @type {String}
     * @private
     * @final
     */
    USER_NAME_SPACE_STRING = 'User',

    /**
     * String of configutation namespace
     *
     * @property CONF_NAME_SPACE_STRING
     * @type {String}
     * @private
     * @final
     */
    CONF_NAME_SPACE_STRING = 'Config'


/**
 * Whether a reference is defined or not.
 * @method isDefined
 * @param {*} value Reference to check
 * @return {boolean} Whether a reference is defined or not.
 */
const isDefined = (value) => {
    if (typeof value === 'undefined') {
        return false
    }
    return true
}

/**
 * Whether a reference is undefined or not.
 * @method isUndefined
 * @param {*} value Reference to check
 * @return {boolean} Whether a reference is undefined or not.
 */
const isUndefined = (value) => {
    if (isDefined(value)) {
        return false
    }
    return true
}

/**
 * Whether a reference is string or not.
 * @method isString
 * @param {*} value Reference to check
 * @return {Boolean} Whether a reference is string or not.
 */
const isString = (value) => {
    if (typeof value === 'string') {
        return true
    }
    return false
}

/**
 * Whether a reference is integer type or not.
 * @method isIntegerType
 * @param {*} value Reference to check
 * @return {Boolean} Whether a reference is integer type or not.
 */
const isIntegerType = (value) => {
    if (value === parseInt(value, 10)) {
        return true
    }
    return false
}

/**
 * Whether a reference is finite number or not.
 * @method isFiniteNumber
 * @param {*} value Reference to check
 * @return {Boolean} Whether a reference is finite number or not.
 */
const isFiniteNumber = (value) => {
    if (typeof(value) !== 'number' && typeof(value) !== 'string') {
        return false
    } else {
        return (value === parseFloat(value) && isFinite(value))
    }
}

/**
 * Whether a reference is numeric or not.
 * @method isNumeric
 * @param {*} value Reference to check
 * @return {Boolean} Whether a reference is numeric or not. <br/>
 *
 * (e.g. 0, 0.0, -1, '-1.5', '30.0', '20.80', -20.85, .42, 0x89f, '0x89f', 8e5)
 */
const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value)

/**
 * Exports an object to a global object & Exports as a module of Node.js.
 *
 * @method exports
 * @param nameSpaceString {String} String of namespace of name
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
const exports = (nameSpaceString, arg) => {

    const nameSpaceObj = RGPP[nameSpaceString]
    const objName = arg.name

    // check namespace is defined
    if (isUndefined(nameSpaceObj)) {
        console.error('undefined')
        return
    }

    // check multiple definition
    const isMultDefined = isDefined(nameSpaceObj[objName])
    if (isMultDefined) {
        console.error(`RGPP.${nameSpaceString}.${objName} is already defined`)
        return
    }

    // export as module
    exportAsModule(nameSpaceString, arg)

    RGPP[nameSpaceString][objName] = arg.constructorFunc

}

/**
 * Exports an object as a module of Node.js.
 *
 * @method exportAsModule
 * @param nameSpaceString {String} String of namespace
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
const exportAsModule = (nameSpaceString, arg) => {
    if (isDefined(arg.module)) {
        arg.module.exports[nameSpaceString] =
            arg.module.exports[nameSpaceString] || {}

        arg.module.exports[nameSpaceString][arg.name] =
            arg.module.exports[nameSpaceString][arg.name] || arg.constructorFunc

        arg.module.exports[CONF_NAME_SPACE_STRING] =
            arg.module.exports[CONF_NAME_SPACE_STRING] || {}

        arg.module.exports[CONF_NAME_SPACE_STRING].setConfigParam =
            arg.module.exports[CONF_NAME_SPACE_STRING].setConfigParam || setConfigParam
    }
}

/**
 * Exports an object to System namespace.
 * @method exportsAsSystem
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
const exportsAsSystem = (arg) => {
    exports(SYSTEM_NAME_SPACE_STRING, arg)
}

/**
 * Exports an object to MW namespace.
 * @method exportsAsMW
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
const exportsAsMW = (arg) => {
    exports(MW_NAME_SPACE_STRING, arg)
}

/**
 * Exports an object to User namespace.
 * @method exportsAsUser
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
const exportsAsUser = (arg) => {
    exports(USER_NAME_SPACE_STRING, arg)
}

/**
 * Return singleton instance.
 *
 * @method getSingletonInstance
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @return {Object} Singleton instance of an object
 * @private
 */
const getSingletonInstance = (arg) => {
    let instance = undefined
    return {
        getInstance: (spec) => {
            if (isUndefined(instance)) {
                instance = arg.constructorFunc(spec)
            }
            return instance
        }
    }
}

/**
 * Exports an object to System namespace as singleton object.
 * @method expotrsAsSystemSingleton
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
const expotrsAsSystemSingleton = (arg) => {
    const singleton = getSingletonInstance(arg)
    exports(SYSTEM_NAME_SPACE_STRING, {
        name: arg.name,
        constructorFunc: singleton,
        module: arg.module
    })
}

/**
 * Exports an object to MW namespace as singleton object.
 * @method expotrsAsMWSingleton
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
const expotrsAsMWSingleton = (arg) => {
    const singleton = getSingletonInstance(arg)
    exports(MW_NAME_SPACE_STRING, {
        name: arg.name,
        constructorFunc: singleton,
        module: arg.module
    })
}

/**
 * Exports to User namespace as singleton object.
 * @method expotrsAsUserSingleton
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
const expotrsAsUserSingleton = (arg) => {
    const singleton = getSingletonInstance(arg)
    exports(USER_NAME_SPACE_STRING, {
        name: arg.name,
        constructorFunc: singleton,
        module: arg.module
    })
}

/**
 * Set configuration parameter.
 *
 * @method setConfigParam
 * @param configName {String} Name of configuration parameter
 * @param configValue {*} Value of configuration parameter
 */
const setConfigParam = (configName, configValue) => {
    if (isInValidConfigName(configName)) {
        return
    }

    if (RGPP && RGPP[CONF_NAME_SPACE_STRING]) {
        RGPP[CONF_NAME_SPACE_STRING][configName] = configValue
    }
}

/**
 * Return configuration parameter.
 *
 * @method getConfigParam
 * @param configName {String} Name of configuration parameter
 * @return Configuration parameter / If the configuration name is invalid, return undefined
 */
const getConfigParam = (configName) => {
    if (isInValidConfigName(configName)) {
        return
    }
    if (RGPP && RGPP[CONF_NAME_SPACE_STRING]) {
        return RGPP[CONF_NAME_SPACE_STRING][configName]
    }
}

/**
 * Whether the configuration name is invalid or not.
 *
 * @method isInValidConfigName
 * @param {string} configName Name of configuration parameter
 * @return Whether the configuration name is invalid or not.
 * @private
 */
const isInValidConfigName = (configName) => {
    if (!isString(configName) ||
        configName === 'setConfigParam' ||
        configName === 'getConfigParam') {
        return true
    }
    return false
}

export const RGPP = {
    isDefined,
    isUndefined,
    isString,
    isIntegerType,
    isFiniteNumber,
    isNumeric,
    setConfigParam,
    getConfigParam
}


RGPP.Const = Const
RGPP.Config = Config
RGPP.System = System || {}
RGPP.System.exports = exportsAsSystem
RGPP.System.exportsAsSingleton = expotrsAsSystemSingleton
RGPP.MW = MW || {}
RGPP.MW.exports = exportsAsMW
RGPP.MW.exportsAsSingleton = expotrsAsMWSingleton
RGPP.User = User || {}
RGPP.User.exports = exportsAsUser
RGPP.User.exportsAsSingleton = expotrsAsUserSingleton

export default RGPP
