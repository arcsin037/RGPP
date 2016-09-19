import {
    ADD_MAP,
    SET_CTX,
    SET_MAP_CHIP
} from 'Core/actions/Map/actionTypes'

const initialState = []

const createMap = (state, action) => {
    switch (action.type) {
    case ADD_MAP:
        return {
            id: action.id,
            ctx: action.ctx,
            col: action.col,
            row: action.row,
            chipWidth: action.chipWidth,
            chipHeight: action.chipHeight,
            layers: action.layers
        }
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
            nextState[id].layers[currentLayerNo].chipSetNoArray[mapY][mapX] = selectedChipNoArray[y][x]
        }
    }
    return nextState
}

const data = (state = initialState, action) => {
    switch (action.type) {
    case ADD_MAP:
        return [
            ...state,
            createMap(state, action)
        ]
    case SET_CTX:
        return setCtx(state, action)
    case SET_MAP_CHIP:
        return setMapChip(state, action)
    default:
        return state
    }
}

export default data
