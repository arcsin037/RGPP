'use strict'

import * as actions from './SoundsActions'
import * as types from './actionTypes'
import {
    expect
} from 'chai'

describe('SoundsActions', () => {
    it('should create an action to add an image', () => {
        const sound = {
            name: 'hoge',
            description: 'description',
            url: 'url'
        }
        const expectedAction = {
            type: types.ADD_SOUND,
            data: sound
        }
        expect(actions.addSound(sound)).to.deep.equal(expectedAction)
    })
})
