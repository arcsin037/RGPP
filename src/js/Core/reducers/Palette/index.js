import {combineReducers} from 'redux'
import palettes from './palettes'
import selection from './selection'

const reducer = combineReducers({
    palettes,
    selection
})

export default reducer
