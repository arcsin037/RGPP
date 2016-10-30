'use strict'

import * as actions from './ScenesActions'
import * as types from './actionTypes'
import {
    expect
} from 'chai'

describe('ScenesActions', () => {
    it('should create an action to add a scene', () => {
        const scene = {
            name: 'hoge',
            events: []
        }
        const expectedAction = {
            type: types.ADD_SCENE,
            data: scene
        }
        expect(actions.addScene(scene)).to.deep.equal(expectedAction)
    })
})
