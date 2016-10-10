import * as types from './actionTypes'

export const addMap = (data) => ({
    type: types.ADD_MAP,
    data
})

export const setCtx = (id, ctx) => ({
    type: types.SET_CTX,
    id,
    ctx
})

export const setMapChip = ({
    id,
    currentLayerNo,
    selectedX,
    selectedY,
    selectedPalette
}) => ({
    type: types.SET_MAP_CHIP,
    id,
    currentLayerNo,
    selectedX,
    selectedY,
    selectedPalette
})

export const setCurrentMapID = (currentMapID) => ({
    type: types.SET_CURRENT_MAP_ID,
    currentMapID
})

export const setCurrentLayerNo = (currentLayerNo) => ({
    type: types.SET_CURRENT_LAYER_NO,
    currentLayerNo
})

export const loadMap = (data) => ({
    type: types.LOAD_MAP,
    data
})
