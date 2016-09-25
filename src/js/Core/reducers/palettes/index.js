import {combineReducers} from 'redux'
import context from './context'
import data from './data'
import selected from './selected'

const reducer = combineReducers({
    context,
    data,
    selected
})

export default reducer
