import {combineReducers} from 'redux'

import maps from './maps'
import palettes from './palettes'

const reducer = combineReducers({
  maps,
  palettes
})

export default reducer
