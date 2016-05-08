import Config from './Common/Config.json'
import Const from './Common/Const.json'
import MW from 'MW'
import System from 'System'
import User from 'User'

const RGPP = {}

RGPP.Const = Const || {}
RGPP.Config = Config || {}
RGPP.System = System || {}
RGPP.MW = MW || {}
RGPP.User = User || {}

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

    if (RGPP && RGPP.Config) {
        RGPP.Config[configName] = configValue
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
    if (RGPP && RGPP.Config) {
        return RGPP.Config[configName]
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
    if (!(typeof configName === 'string') ||
        configName === 'setConfigParam' ||
        configName === 'getConfigParam') {
        return true
    }
    return false
}

RGPP.Config.setConfigParam = setConfigParam
RGPP.Config.getConfigParam = getConfigParam

export default RGPP
