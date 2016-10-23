import {ADD_PALETTE} from '../../actions/Palette/actionTypes'

const initialState = []

const createPalette = (state, action) => {
    switch (action.type) {
    case ADD_PALETTE:
        return {
            id: action.id,
            ctx: action.ctx,
            img: action.img,
            col: action.col,
            row: action.row,
            chipWidth: action.chipWidth,
            chipHeight: action.chipHeight
        }
    }
}

const data = (state = initialState, action) => {
    switch (action.type) {
    case ADD_PALETTE:
        return [
            ...state,
            createPalette(state, action)
        ]
    default:
        return state
    }
}

export default data
