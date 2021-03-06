import {
    ADD_PALETTE
} from '../../actions/Palette/actionTypes'

const initialState = []

const createPalette = (state, action) => action.data

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
