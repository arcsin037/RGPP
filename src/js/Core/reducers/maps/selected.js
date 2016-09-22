import {
    SET_CURRENT_LAYER_NO,
    SET_CURRENT_MAP_ID
} from 'Core/actions/Map/actionTypes'
import SelectionRange from '../common/SelectionRange'

const initialState = new SelectionRange({id: 0})
initialState.currentMapID = 0
initialState.currentLayerNo = 3

const setCurrentMapID = (state, action) => {
    const nextState = new SelectionRange(state)
    nextState.currentMapID = action.currentMapID
    return nextState
}

const setCurrentLayerNo = (state, action) => {
    const nextState = new SelectionRange(state)
    nextState.currentLayerNo = action.currentLayerNo
    return nextState
}

const selected = (state = initialState, action) => {
    switch (action.type) {
    case SET_CURRENT_MAP_ID:
        return setCurrentMapID(state, action)
    case SET_CURRENT_LAYER_NO:
        return setCurrentLayerNo(state, action)
    default:
        return state
    }
}

export default selected
