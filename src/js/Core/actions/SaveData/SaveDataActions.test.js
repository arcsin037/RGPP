'use strict'

import * as actions from './SaveDataActions'
import * as types from './actionTypes'
import {
    expect
} from 'chai'

describe('SaveDataActions', () => {
    it('should create an action to add an image', () => {
        const saveData = {
            plugin: {hoge: 'hoge'},
            gameObjs: {hoge: 'hoge'},
            images: {hoge: 'hoge'},
            scenes: {hoge: 'hoge'},
            sounds: {hoge: 'hoge'}
        }
        const expectedAction = {
            type: types.ADD_SCENE,
            data: saveData
        }
        expect(actions.save(saveData)).to.deep.equal(expectedAction)
    })
})
