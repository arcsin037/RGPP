import {combineReducers} from 'redux'

import todos from './todos'
import visibilityFilter from './visibilityFilter'
import Palette from './Palette'

const reducer = combineReducers({
    Palette,
    todos,
    visibilityFilter
})

export default reducer
