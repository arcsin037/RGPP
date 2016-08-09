import {combineReducers} from 'redux'

import palette from './Palette'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const reducer = combineReducers({
    palette,
    todos,
    visibilityFilter
})

export default reducer
