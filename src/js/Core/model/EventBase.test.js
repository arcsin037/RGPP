'use strict'

import EventBase from './EventBase'
import EventState from './EventState'
import {
    expect
} from 'chai'

describe('EventBase', () => {
  it('default constructor', () => {
    const eventState = new EventState({
      id: 0,
      name: 'normal'
    })
    const eventBase = new EventBase()
    expect(eventBase.id).to.equal(0)
    expect(eventBase.name).to.equal('Event')
    expect(eventBase.initSceneId).to.equal(0)
    expect(eventBase.currentStateIndex).to.equal(0)
    expect(eventBase.isLoaded).to.equal(false)
    expect(eventBase.isStateTransition).to.equal(true)
    expect(eventBase.eventStatuses).to.deep.equal({
      normal: eventState
    })
  })

  it('constructor with args', () => {
    const eventState = new EventState({
      id: 0,
      name: 'normal'
    })
    const eventBase = new EventBase({
      id: 2,
      name: 'test-name',
      initSceneId: 3
    })
    expect(eventBase.id).to.equal(2)
    expect(eventBase.name).to.equal('test-name')
    expect(eventBase.initSceneId).to.equal(3)
    expect(eventBase.currentStateIndex).to.equal(0)
    expect(eventBase.isLoaded).to.equal(false)
    expect(eventBase.isStateTransition).to.equal(true)
    expect(eventBase.eventStatuses).to.deep.equal({
      normal: eventState
    })
  })
})
