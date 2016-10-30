'use strict'

import * as types from '../../actions/Images/actionTypes'
import {
    expect
} from 'chai'
import reducer from './data'

describe('images data reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal([])
    })

    it('should handle ADD_IMAGE', () => {
        const data = {
            name: 'hoge',
            description: 'description',
            url: 'url'
        }
        const action = {
            type: types.ADD_IMAGE,
            data
        }
        expect(reducer([], action)).to.deep.equal([data])
    })
})
