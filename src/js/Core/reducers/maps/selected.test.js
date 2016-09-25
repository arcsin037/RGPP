'use strict'

import * as types from 'Core/actions/Map/actionTypes'
import {MAP_LAYER_NUM} from 'Core/constants'
import SelectionRange from '../common/SelectionRange'
import {
    expect
} from 'chai'
import reducer from './selected'

describe('selected reducer', () => {
    it('should return the initial state', () => {
        const initialState = new SelectionRange({
            id: 0
        })
        initialState.currentMapID = 0
        initialState.currentLayerNo = MAP_LAYER_NUM
        expect(reducer(undefined, {})).to.deep.equal(initialState)
    })

    it('should handle SET_CURRENT_MAP_ID', () => {
        const currentMapID = 2
        const action = {
            type: types.SET_CURRENT_MAP_ID,
            currentMapID
        }
        const state = new SelectionRange({
            id: 0
        })
        state.currentMapID = currentMapID
        state.currentLayerNo = MAP_LAYER_NUM
        expect(reducer(undefined, action)).to.deep.equal(state)
    })

    it('should handle SET_CURRENT_LAYER_NO', () => {
        const currentLayerNo = 2
        const action = {
            type: types.SET_CURRENT_LAYER_NO,
            currentLayerNo
        }
        const state = new SelectionRange({
            id: 0
        })
        state.currentMapID = 0
        state.currentLayerNo = currentLayerNo
        expect(reducer(undefined, action)).to.deep.equal(state)
    })
})
