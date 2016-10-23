'use strict'

import * as types from '../../actions/Palette/actionTypes'
import {
    expect
} from 'chai'
import reducer from './data'

describe('palettes data reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal([])
    })

    it('should handle ADD_PALETTE', () => {
        const data = {
            id: 0,
            ctx: 'hoge',
            img: 'img',
            col: 20,
            row: 15,
            chipWidth: 16,
            chipHeight: 16
        }
        const action = Object.assign({type: types.ADD_PALETTE}, data)
        expect(reducer([], action)).to.deep.equal([data])
    })
})
