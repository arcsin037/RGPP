import Config from './Config.json'

import TypeUtil from 'RGPP/System/Utils/TypeUtil'

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
    Config[configName] = configValue
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
    return Config[configName]
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
    if (!TypeUtil.isString(configName) ||
        configName === 'setConfigParam' ||
        configName === 'getConfigParam') {
        return true
    }
    return false
}

Config.setConfigParam = setConfigParam
Config.getConfigParam = getConfigParam

export default Config
