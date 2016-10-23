'use strict'

import EventState from './EventState'
import {
    expect
} from 'chai'

describe('EventState', () => {
    it ('default constructor', () => {
        const state = new EventState()
        expect(state.id).to.be.undefined
        expect(state.name).to.be.undefined
        expect(state.script).to.be.empty
    })
})
