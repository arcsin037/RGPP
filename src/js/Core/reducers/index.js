import {combineReducers} from 'redux'

import maps from './maps'
import palettes from './palettes'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const reducer = combineReducers({
    maps,
    palettes,
    todos,
    visibilityFilter
})

export default reducer
