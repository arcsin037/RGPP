'use strict'

import * as types from 'Core/actions/Palette/actionTypes'
import {
    expect
} from 'chai'
import reducer from './selected'

describe('selected reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal({
            currentMapID: 0,
            currentLayerNo: 0
        })
    })

    it('should handle SET_CURRENT_MAP_ID', () => {
        const currentMapID = 2
        const action = {
            type: types.SET_CURRENT_MAP_ID,
            currentMapID
        }
        expect(reducer({}, action)).to.deep.equal({
            currentMapID
        })
    })

    it('should handle SET_CURRENT_LAYER_NO', () => {
        const currentLayerNo = 2
        const action = {
            type: types.SET_CURRENT_LAYER_NO,
            currentLayerNo
        }
        expect(reducer({}, action)).to.deep.equal({
            currentLayerNo
        })
    })
})
