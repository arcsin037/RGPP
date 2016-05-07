import Config from './Common/Config.json'
import Const from './Common/Const.json'
import MW from 'MW'
import System from 'System'
import User from 'User'

const RGPP = {}

RGPP.Const = Const
RGPP.Config = Config
RGPP.System = System
// RGPP.System.exports = exportsAsSystem
// RGPP.System.exportsAsSingleton = expotrsAsSystemSingleton
RGPP.MW = MW
// RGPP.MW.exports = exportsAsMW
// RGPP.MW.exportsAsSingleton = expotrsAsMWSingleton
RGPP.User = User
// RGPP.User.exports = exportsAsUser
// RGPP.User.exportsAsSingleton = expotrsAsUserSingleton

export default RGPP
