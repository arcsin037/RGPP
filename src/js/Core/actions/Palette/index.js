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
    img,
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
    startPixelX,
    startPixelY,
    specifyRangePixelX,
    specifyRangePixelY
}) => ({
    type: SET_SELECTION_RANGE,
    id,
    startPixelX,
    startPixelY,
    specifyRangePixelX,
    specifyRangePixelY
})
