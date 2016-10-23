'use strict'

import * as actions from './ImagesActions'
import * as types from './actionTypes'
import {
    expect
} from 'chai'

describe('ImagesActions', () => {
    it('should create an action to add an image', () => {
        const image = {
            name: 'hoge',
            description: 'description',
            url: 'url'
        }
        const expectedAction = {
            type: types.ADD_IMAGE,
            data: image
        }
        expect(actions.addImage(image)).to.deep.equal(expectedAction)
    })
})
