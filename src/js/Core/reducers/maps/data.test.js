'use strict'

import * as types from 'Core/actions/Map/actionTypes'
import {
    expect
} from 'chai'
import reducer from './data'

describe('data reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal([])
    })

    it('should handle ADD_MAP', () => {
        const args = {
            id: 0,
            col: 20,
            row: 15,
            chipWidth: 32,
            chipHeight: 32,
            ctx: 'hoge',
            layers: [3]
        }
        const action = Object.assign({
            type: types.ADD_MAP
        }, args)
        expect(reducer([], action)).to.deep.equal([args])
    })
})
