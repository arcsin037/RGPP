'use strict'

import * as types from 'Core/actions/SaveData/actionTypes'
import reducer, {getImages, getScenes, getSounds} from './saveData'
import {
    expect
} from 'chai'

describe('save data reducer', () => {
    it('should return the initial state', () => {
        const initialState = {
            plugin: {},
            gameObjs: {},
            images: {},
            scenes: {},
            sounds: {}
        }
        expect(reducer(undefined, {})).to.deep.equal(initialState)
    })

    it('should handle SAVE', () => {
        const data = {
            plugin: {hoge: 'hoge'},
            gameObjs: {hoge: 'hoge'},
            images: {hoge: 'hoge'},
            scenes: {hoge: 'hoge'},
            sounds: {hoge: 'hoge'}
        }
        const action = {
            type: types.SAVE,
            data
        }
        expect(reducer([], action)).to.deep.equal(data)
    })

    it('get images', () => {
        const data = {
            name: 'hoge',
            description: 'description',
            url: 'url'
        }
        const state = {
            images: {
                data
            }
        }
        expect(getImages(state)).to.deep.equal(data)
    })
    it('get sounds', () => {
        const data = {
            name: 'hoge',
            description: 'description',
            url: 'url'
        }
        const state = {
            sounds: {
                data
            }
        }
        expect(getSounds(state)).to.deep.equal(data)
    })
    it('get scenes', () => {
        const data = {
            name: 'hoge',
            description: 'description',
            url: 'url'
        }
        const state = {
            scenes: {
                data
            }
        }
        expect(getScenes(state)).to.deep.equal(data)
    })
})
