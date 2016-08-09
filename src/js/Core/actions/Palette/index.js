import {
    ADD_PALETTE,
    SET_SELECTION_RANGE
} from './actionTypes'

export const addPalette = ({
    id,
    img
}) => ({
    type: ADD_PALETTE,
    id,
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
