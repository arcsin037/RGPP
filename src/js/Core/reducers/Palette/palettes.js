import {ADD_PALETTE} from 'Core/actions/Palette/actionTypes'

const palette = (state, action) => {
    switch (action.type) {
    case ADD_PALETTE:
        return {
            id: action.id,
            img: action.img
        }
    }
}

const palettes = (state = [], action) => {
    switch (action.type) {
    case ADD_PALETTE:
        return [
            ...state,
            palette(state, action)
        ]
    default:
        return state
    }
}

export default palettes
