import * as types from './actionTypes'

export const addPalette = (ctx, data) => {
    data.ctx = ctx
    return {
        type: types.ADD_PALETTE,
        data
    }
}

export const setSelectionRange = (range) => ({
    type: types.SET_SELECTION_RANGE,
    range
})

export const setDrawMode = (drawMode) => ({
    type: types.SET_DRAW_MODE,
    drawMode
})

export const loadPalette = (data) => ({
    type: types.LOAD_PALETTE,
    data
})
