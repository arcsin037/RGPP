import {
    SET_DRAW_MODE
} from 'Core/actions/Palette/actionTypes'

const initialState = {
    drawMode: 'Pen'
}

const setDrawMode = (state, action) => {
    const nextState = state
    nextState.drawMode = action.drawMode
    return nextState
}

const context = (state = initialState, action) => {
    switch (action.type) {
    case SET_DRAW_MODE:
        return setDrawMode(state, action)
    default:
        return state
    }
}

export default context
