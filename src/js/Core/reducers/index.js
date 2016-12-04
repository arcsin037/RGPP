import {combineReducers} from 'redux'

import images from './images'
import {pluginReducers} from 'Plugin'
import saveData from './saveData'
import scenes from './scenes'
import sounds from './sounds'

const reducer = combineReducers({
  plugin: pluginReducers,
  saveData,
  scenes,
  images,
  sounds
})

export default reducer
