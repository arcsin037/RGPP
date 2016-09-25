import {
    SET_DRAW_MODE
} from '../../actions/Palette/actionTypes'

const initialState = {
    drawMode: 'Pen'
}

const context = (state = initialState, action) => {
    switch (action.type) {
    case SET_DRAW_MODE:
        return {
            drawMode: action.drawMode
        }
    default:
        return state
    }
}

export default context
