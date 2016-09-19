import {SET_SELECTION_RANGE} from 'Core/actions/Palette/actionTypes'
const initialState = {
    id: 0,
    startPixelX: 0,
    startPixelY: 0,
    specifyRangePixelX: 32,
    specifyRangePixelY: 32
}

const selected = (state = initialState, action) => {
    switch (action.type) {
    case SET_SELECTION_RANGE:
        return {
            id: action.id,
            startPixelX: action.startPixelX,
            startPixelY: action.startPixelY,
            specifyRangePixelX: action.specifyRangePixelX,
            specifyRangePixelY: action.specifyRangePixelY
        }
    default:
        return state
    }
}

export default selected
