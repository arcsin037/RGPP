import {
    ADD_MAP,
    SET_CTX
} from 'Core/actions/Map/actionTypes'

const createMap = (state, action) => {
    switch (action.type) {
    case ADD_MAP:
        return {
            id: action.id,
            ctx: action.ctx,
            col: action.col,
            row: action.row,
            chipWidth: action.chipWidth,
            chipHeight: action.chipHeight,
            layers: action.layers
        }
    }
}

const setCtx = (state, action) => {
    const nextState = state
    nextState[action.id].ctx = action.ctx
    return nextState
}

const data = (state = [], action) => {
    switch (action.type) {
    case ADD_MAP:
        return [
            ...state,
            createMap(state, action)
        ]
    case SET_CTX:
        return setCtx(state, action)
    default:
        return state
    }
}

export default data
