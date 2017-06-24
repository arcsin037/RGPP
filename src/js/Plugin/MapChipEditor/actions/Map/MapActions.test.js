'use strict'

import * as actions from './MapActions'
import * as types from './actionTypes'
import {
    expect
} from 'chai'

describe('MapActions', () => {
  it('should create an action to add a map', () => {
    const data = {
      id: 0,
      col: 20,
      row: 15,
      chipWidth: 32,
      chipHeight: 32
    }
    const expectedAction = {
      type: types.ADD_MAP,
      data
    }
    expect(actions.addMap(data)).to.deep.equal(expectedAction)
  })
  it('should create an action to set ctx', () => {
    const id = 0
    const ctx = 'hoge'
    const expectedAction = {
      type: types.SET_CTX,
      id,
      ctx
    }
    expect(actions.setCtx(id, ctx)).to.deep.equal(expectedAction)
  })
  it('should create an action to set map chip', () => {
    const arg = {
      id: 0,
      currentLayerNo: 0,
      selectedX: 0,
      selectedY: 0,
      selectedPalette: {
        id: 2,
        startX: 0,
        startY: 0,
        specifyRangeX: 2,
        specifyRangeY: 2,
        chipNoArray: []
      }
    }
    const expectedAction = Object.assign({
      type: types.SET_MAP_CHIP
    }, arg)
    expect(actions.setMapChip(arg)).to.deep.equal(expectedAction)
  })
  it('should create an action to set current map id', () => {
    const currentMapID = 0
    const expectedAction = {
      type: types.SET_CURRENT_MAP_ID,
      currentMapID
    }
    expect(actions.setCurrentMapID(currentMapID)).to.deep.equal(expectedAction)
  })
  it('should create an action to set current map layer', () => {
    const currentLayerNo = 0
    const expectedAction = {
      type: types.SET_CURRENT_LAYER_NO,
      currentLayerNo
    }
    expect(actions.setCurrentLayerNo(currentLayerNo)).to.deep.equal(expectedAction)
  })
})
