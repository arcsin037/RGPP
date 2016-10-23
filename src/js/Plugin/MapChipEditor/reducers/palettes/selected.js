import {
    SET_SELECTION_RANGE
} from '../../actions/Palette/actionTypes'
import SelectionRange from '../common/SelectionRange'

const initialState = new SelectionRange({
    id: 0
})
initialState.chipNoArray = [
    [0]
]

const setSelectionRange = (state, action) => {
    const nextState = new SelectionRange(action.range)
    nextState.chipNoArray = action.range.chipNoArray
    return nextState
}

const selected = (state = initialState, action) => {
    switch (action.type) {
    case SET_SELECTION_RANGE:
        return setSelectionRange(state, action)
    default:
        return state
    }
}

export default selected
