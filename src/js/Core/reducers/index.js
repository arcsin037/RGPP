import {combineReducers} from 'redux'

import {pluginReducers} from 'Plugin'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const reducer = combineReducers({
    plugin: pluginReducers,
    todos,
    visibilityFilter
})

export default reducer
