'use strict'
import * as types from '../../actions/Map/actionTypes'
import {List, Map} from 'immutable'
export const initialState = List([])

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

const data = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_MAP:
      return state.push(Map(action.data))
    case types.LOAD_MAP:
      return state.push(Map(action.data))
    case types.SET_CTX:
      return state.map(s => {
        if (s.get('id') === action.id) {
          return s.set('ctx', action.ctx)
        } else {
          return s
        }
      })
    case types.SET_MAP_CHIP:
      return setMapChip(state, action)
    default:
      return state
  }
}

export default data
