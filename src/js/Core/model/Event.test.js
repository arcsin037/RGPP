'use strict'

import Event from './Event'
import EventState from './EventState'
import { expect } from 'chai'

describe('Event', () => {
  it('default constructor', () => {
    const eventState = new EventState({
      id: 0,
      name: 'normal'
    })
    const event = new Event()
    expect(event.id).to.equal(0)
    expect(event.name).to.equal('Event')
    expect(event.initSceneId).to.equal(0)
    expect(event.currentStateIndex).to.equal(0)
    expect(event.isLoaded).to.equal(false)
    expect(event.isStateTransition).to.equal(true)
    expect(event.eventStatuses).to.deep.equal({
      normal: eventState
    })
  })

  it('constructor with args', () => {
    const eventState = new EventState({
      id: 0,
      name: 'normal'
    })
    const event = new Event({
      id: 2,
      name: 'test-name',
      initSceneId: 3
    })
    expect(event.id).to.equal(2)
    expect(event.name).to.equal('test-name')
    expect(event.initSceneId).to.equal(3)
    expect(event.currentStateIndex).to.equal(0)
    expect(event.isLoaded).to.equal(false)
    expect(event.isStateTransition).to.equal(true)
    expect(event.eventStatuses).to.deep.equal({
      normal: eventState
    })
  })
})
