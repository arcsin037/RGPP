import {combineReducers} from 'redux'

import images from './images'
import {pluginReducers} from 'Plugin'
import saveData from './saveData'
import scenes from './scenes'
import sounds from './sounds'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const reducer = combineReducers({
  plugin: pluginReducers,
  todos,
  visibilityFilter,
  saveData,
  scenes,
  images,
  sounds
})

export default reducer
