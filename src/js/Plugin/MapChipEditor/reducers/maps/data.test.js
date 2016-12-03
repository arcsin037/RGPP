'use strict'

import * as types from '../../actions/Map/actionTypes'
import {MapData} from '../../model/MapData'
import {
    expect
} from 'chai'
import reducer, {initialState} from './data'

describe('maps data reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })

  it('should handle ADD_MAP', () => {
    const data = {
      id: 0,
      col: 20,
      row: 15,
      cellWidth: 16,
      cellHeight: 16,
      ctx: 'hoge',
      layers: [3]
    }
    const action = {
      type: types.ADD_MAP,
      data
    }
    const nextState = reducer(undefined, action)
    const mapData = new MapData(data)
    expect(nextState).to.deep.equal([mapData])
  })

  it('should handle LOAD_MAP', () => {
    const data = {
      id: 0,
      col: 20,
      row: 15,
      cellWidth: 16,
      cellHeight: 16,
      ctx: 'hoge',
      layers: [3]
    }
    const action = {
      type: types.LOAD_MAP,
      data
    }
    const mapData = new MapData(data)
    expect(reducer([], action)).to.deep.equal([mapData])
  })
})
