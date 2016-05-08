import Config from './Config'
import Const from './Const/Const.json'
import MW from 'MW'
import System from 'System'
import User from 'User'

const RGPP = {}

RGPP.Const = Const || {}
RGPP.Config = Config || {}
RGPP.System = System || {}
RGPP.MW = MW || {}
RGPP.User = User || {}

export default RGPP
