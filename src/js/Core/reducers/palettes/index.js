import {combineReducers} from 'redux'
import data from './data'
import selected from './selected'

const reducer = combineReducers({
    data,
    selected
})

export default reducer
