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

//const SYSTEM_NAME_SPACE_STRING = 'System',

/**
 * String of middle-ware namespace
 * @property MW_NAME_SPACE_STRING
 * @type {String}
 * @private
 * @final
 */
// MW_NAME_SPACE_STRING = 'MW',

/**
 * String of user namespace
 *
 * @property USER_NAME_SPACE_STRING
 * @type {String}
 * @private
 * @final
 */
// USER_NAME_SPACE_STRING = 'User',

/**
 * String of configutation namespace
 *
 * @property CONF_NAME_SPACE_STRING
 * @type {String}
 * @private
 * @final
 */
// CONF_NAME_SPACE_STRING = 'Config'

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
/*
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
*/

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
/*
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
*/

/**
 * Exports an object to System namespace.
 * @method exportsAsSystem
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
/*
const exportsAsSystem = (arg) => {
    exports(SYSTEM_NAME_SPACE_STRING, arg)
}
*/

/**
 * Exports an object to MW namespace.
 * @method exportsAsMW
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
/*
const exportsAsMW = (arg) => {
    exports(MW_NAME_SPACE_STRING, arg)
}
*/

/**
 * Exports an object to User namespace.
 * @method exportsAsUser
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
/*
const exportsAsUser = (arg) => {
    exports(USER_NAME_SPACE_STRING, arg)
}
*/

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
/*
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
*/

/**
 * Exports an object to System namespace as singleton object.
 * @method expotrsAsSystemSingleton
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
/*
const expotrsAsSystemSingleton = (arg) => {
    const singleton = getSingletonInstance(arg)
    exports(SYSTEM_NAME_SPACE_STRING, {
        name: arg.name,
        constructorFunc: singleton,
        module: arg.module
    })
}
*/

/**
 * Exports an object to MW namespace as singleton object.
 * @method expotrsAsMWSingleton
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
/*
const expotrsAsMWSingleton = (arg) => {
    const singleton = getSingletonInstance(arg)
    exports(MW_NAME_SPACE_STRING, {
        name: arg.name,
        constructorFunc: singleton,
        module: arg.module
    })
}
*/

/**
 * Exports to User namespace as singleton object.
 * @method expotrsAsUserSingleton
 * @param arg {Object}
 * @param arg.name {String} An object name
 * @param arg.constructorFunc {Function} A constructor function of an object,
 * @param arg.module {Object} A module of Node.js
 * @private
 */
/*
const expotrsAsUserSingleton = (arg) => {
    const singleton = getSingletonInstance(arg)
    exports(USER_NAME_SPACE_STRING, {
        name: arg.name,
        constructorFunc: singleton,
        module: arg.module
    })
}
*/
