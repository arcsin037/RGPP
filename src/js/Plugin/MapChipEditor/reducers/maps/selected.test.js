'use strict'

import * as types from '../../actions/Map/actionTypes'
import {MAP_LAYER_NUM} from '../../constants'
import {
    expect
} from 'chai'
import reducer, { initialState } from './selected'

describe('selected reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })

  it('should handle SET_CURRENT_MAP_ID', () => {
    const currentMapID = 2
    const action = {
      type: types.SET_CURRENT_MAP_ID,
      currentMapID
    }
    const nextState = reducer(undefined, action)

    expect(nextState.get('id')).to.equal(0)
    expect(nextState.get('startX')).to.equal(0)
    expect(nextState.get('startY')).to.equal(0)
    expect(nextState.get('specifyRangeX')).to.equal(1)
    expect(nextState.get('specifyRangeY')).to.equal(1)
    expect(nextState.get('currentMapID')).to.equal(currentMapID)
    expect(nextState.get('currentLayerNo')).to.equal(MAP_LAYER_NUM)
  })

  it('should handle SET_CURRENT_LAYER_NO', () => {
    const currentLayerNo = 2
    const action = {
      type: types.SET_CURRENT_LAYER_NO,
      currentLayerNo
    }
    const nextState = reducer(undefined, action)

    expect(nextState.get('id')).to.equal(0)
    expect(nextState.get('startX')).to.equal(0)
    expect(nextState.get('startY')).to.equal(0)
    expect(nextState.get('specifyRangeX')).to.equal(1)
    expect(nextState.get('specifyRangeY')).to.equal(1)
    expect(nextState.get('currentMapID')).to.equal(0)
    expect(nextState.get('currentLayerNo')).to.equal(currentLayerNo)
  })
})
