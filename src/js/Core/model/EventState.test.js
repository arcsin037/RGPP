'use strict'

import EventState from './EventState'
import {
    expect
} from 'chai'

describe('EventState', () => {
  it('default constructor', () => {
    const state = new EventState()
    expect(state.id).to.be.undefined
    expect(state.name).to.be.undefined
    expect(state.script).to.be.empty
  })

  it('constructor with args', () => {
    const state = new EventState({id: 2, name: 'test-name'})
    expect(state.id).to.equal(2)
    expect(state.name).to.equal('test-name')
    expect(state.script).to.be.empty
  })
})
