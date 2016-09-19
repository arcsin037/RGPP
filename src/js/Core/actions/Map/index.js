import {
    ADD_MAP,
    SET_CTX
} from './actionTypes'

export const ctxArray = []

export const addMap = ({
    id,
    col,
    row,
    chipWidth,
    chipHeight,
    mapLayers
}) => ({
    type: ADD_MAP,
    id,
    col,
    row,
    chipWidth,
    chipHeight,
    layers: mapLayers
})

export const setCtx = (id, ctx) => ({
    type: SET_CTX,
    id,
    ctx
})
