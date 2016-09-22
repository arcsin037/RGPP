import {
    ADD_PALETTE,
    SET_SELECTION_RANGE
} from './actionTypes'

export const addPalette = (ctx, {
    id,
    col,
    row,
    chipWidth,
    chipHeight,
    img
}) => ({
    type: ADD_PALETTE,
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
    type: SET_SELECTION_RANGE,
    id,
    startX,
    startY,
    specifyRangeX,
    specifyRangeY,
    chipNoArray
})
