'use strict'

import Scene from './Scene'
import Event from './Event'

import {
    expect
} from 'chai'

describe('Scene', () => {
    it('default constructor', () => {
        const scene = new Scene()
        expect(scene.id).to.equal(0)
        expect(scene.events).to.be.empty
    })
    it('constructor with arg', () => {
        const event = new Event()
        const scene = new Scene({
            id: 1,
            events: [event]
        })
        expect(scene.id).to.equal(1)
        expect(scene.events).to.deep.equal([event])
    })

})
