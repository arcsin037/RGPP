'use strict'

import * as types from 'Core/actions/Palette/actionTypes'
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
        initialState.chipNoArray = [
            [0]
        ]
        expect(reducer(undefined, {})).to.deep.equal(initialState)
    })

    it('should handle SET_SELECTION_RANGE', () => {
        const chipNoArray = [
            [1, 2],
            [3, 4]
        ]
        const arg = {
            id: 2,
            startX: 0,
            startY: 32,
            specifyRangeX: 64,
            specifyRangeY: 128,
            chipNoArray
        }
        const action = Object.assign({
            type: types.SET_SELECTION_RANGE
        }, arg)

        const state = new SelectionRange(action)
        state.chipNoArray = chipNoArray

        expect(reducer(undefined, action)).to.deep.equal(state)
    })
})
