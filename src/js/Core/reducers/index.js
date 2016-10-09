import {combineReducers} from 'redux'

import {pluginReducers} from 'Plugin'
import saveData from './saveData'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const reducer = combineReducers({
    plugin: pluginReducers,
    todos,
    visibilityFilter,
    saveData
})

export default reducer
