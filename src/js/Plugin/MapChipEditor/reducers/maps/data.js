import * as types from '../../actions/Map/actionTypes'
import {MapData} from '../../model/MapData'

const initialState = []

const createMap = (state, action) => {
    const {data} = action

    const mapData = new MapData({
        col: data.col,
        row: data.row,
        chipWidth: data.chipWidth,
        chipHeight: data.chipHeight
    })

    switch (action.type) {
    case types.ADD_MAP:
        return mapData
    case types.LOAD_MAP:
        return mapData
    }
}

const setCtx = (state, action) => {
    const nextState = state
    nextState[action.id].ctx = action.ctx
    return nextState
}

const setMapChip = (state, action) => {
    const nextState = state
    const {
        id,
        currentLayerNo,
        selectedPalette: {
            chipNoArray: selectedChipNoArray
        }
    } = action
    const rangeY = selectedChipNoArray.length
    for (let y = 0; y < rangeY; y += 1) {
        const rangeX = selectedChipNoArray[y].length
        const mapY = action.selectedY + y
        for (let x = 0; x < rangeX; x += 1) {
            const mapX = action.selectedX + x
            nextState[id].layers[currentLayerNo].setData(mapX, mapY, 0, selectedChipNoArray[y][x])
        }
    }
    return nextState
}

export const loadMap = (state, action) => {
    const nextState = action.data
    return nextState
}

const data = (state = initialState, action) => {
    switch (action.type) {
    case types.ADD_MAP:
        return [
            ...state,
            createMap(state, action)
        ]
    case types.SET_CTX:
        return setCtx(state, action)
    case types.SET_MAP_CHIP:
        return setMapChip(state, action)
    case types.LOAD_MAP:
        return loadMap(state, action)
    default:
        return state
    }
}

export default data
