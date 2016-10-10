import * as types from './actionTypes'

export const addPalette = (ctx, {
    id,
    col,
    row,
    chipWidth,
    chipHeight,
    img
}) => ({
    type: types.ADD_PALETTE,
    id,
    ctx,
    col,
    row,
    chipWidth,
    chipHeight,
    img
})

export const setSelectionRange = ({
    id,
    startX,
    startY,
    specifyRangeX,
    specifyRangeY,
    chipNoArray
}) => ({
    type: types.SET_SELECTION_RANGE,
    id,
    startX,
    startY,
    specifyRangeX,
    specifyRangeY,
    chipNoArray
})

export const setDrawMode = (drawMode) => ({
    type: types.SET_DRAW_MODE,
    drawMode
})

export const loadPalette = (data) => ({
    type: types.LOAD_PALETTE,
    data
})
