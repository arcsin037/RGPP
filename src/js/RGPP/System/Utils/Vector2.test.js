'use strict'
import Vector2 from './Vector2'
import {
    expect
} from 'chai'

describe('Vector2', () => {
  describe('member functions', () => {
    describe('constructor', () => {
      it('no args', () => {
        const vec2 = new Vector2()
        expect(vec2.x).to.equal(0)
        expect(vec2.y).to.equal(0)
      })
      it('with args', () => {
        const vec2 = new Vector2({x: 2, y: 3})
        expect(vec2.x).to.equal(2)
        expect(vec2.y).to.equal(3)
      })
    })
    describe('#norm', () => {
      it('positive number', () => {
        const vec2 = new Vector2({x: 3, y: 4})
        expect(vec2.norm()).to.equal(5)
      })
      it('negative number', () => {
        const vec2 = new Vector2({x: -3, y: -4})
        expect(vec2.norm()).to.equal(5)
      })
    })
    describe('#normalize', () => {
      it('positive number', () => {
        const vec2 = new Vector2({x: 3, y: 4})
        vec2.normalize()
        expect(vec2.x).to.equal(3 / 5)
        expect(vec2.y).to.equal(4 / 5)
      })
      it('negative number', () => {
        const vec2 = new Vector2({x: -3, y: -4})
        vec2.normalize()
        expect(vec2.x).to.equal(-3 / 5)
        expect(vec2.y).to.equal(-4 / 5)
      })
    })
  })
  describe('static funcsions', () => {
    describe('#add', () => {
      it('positive number', () => {
        const vecA = new Vector2({x: 3, y: 4})
        const vecB = new Vector2({x: 2, y: 3})
        const result = Vector2.add(vecA, vecB)
        expect(result.x).to.equal(5)
        expect(result.y).to.equal(7)
      })
      it('positive & negative number', () => {
        const vecA = new Vector2({x: -3, y: 4})
        const vecB = new Vector2({x: 2, y: -3})
        const result = Vector2.add(vecA, vecB)
        expect(result.x).to.equal(-1)
        expect(result.y).to.equal(1)
      })
    })
    describe('#sub', () => {
      it('positive number', () => {
        const vecA = new Vector2({x: 3, y: 4})
        const vecB = new Vector2({x: 2, y: 3})
        const result = Vector2.sub(vecA, vecB)
        expect(result.x).to.equal(1)
        expect(result.y).to.equal(1)
      })
      it('positive & negative number', () => {
        const vecA = new Vector2({x: -3, y: 4})
        const vecB = new Vector2({x: 2, y: -3})
        const result = Vector2.sub(vecA, vecB)
        expect(result.x).to.equal(-5)
        expect(result.y).to.equal(7)
      })
    })
    describe('#dot', () => {
      it('positive number', () => {
        const vecA = new Vector2({x: 3, y: 4})
        const vecB = new Vector2({x: 2, y: 3})
        const result = Vector2.dot(vecA, vecB)
        expect(result).to.equal(18)
      })
      it('positive & negative number', () => {
        const vecA = new Vector2({x: -3, y: 4})
        const vecB = new Vector2({x: 2, y: -3})
        const result = Vector2.dot(vecA, vecB)
        expect(result).to.equal(-18)
      })
    })
    describe('#distanceSquare', () => {
      it('positive number', () => {
        const vecA = new Vector2({x: 3, y: 4})
        const vecB = new Vector2({x: 2, y: 3})
        const result = Vector2.distanceSquare(vecA, vecB)
        expect(result).to.equal(2)
      })
      it('positive & negative number', () => {
        const vecA = new Vector2({x: -2, y: 3})
        const vecB = new Vector2({x: 1, y: -1})
        const result = Vector2.distanceSquare(vecA, vecB)
        expect(result).to.equal(25)
      })
    })
    describe('#distance', () => {
      it('positive number', () => {
        const vecA = new Vector2({x: 3, y: 4})
        const vecB = new Vector2({x: 2, y: 3})
        const result = Vector2.distance(vecA, vecB)
        expect(result).to.equal(Math.sqrt(2))
      })
      it('positive & negative number', () => {
        const vecA = new Vector2({x: -2, y: 3})
        const vecB = new Vector2({x: 1, y: -1})
        const result = Vector2.distance(vecA, vecB)
        expect(result).to.equal(5)
      })
    })
    describe('#multScalar', () => {
      it('integer', () => {
        const vec2 = new Vector2({x: 2, y: 3})
        const result = Vector2.multScalar(3, vec2)
        expect(result.x).to.equal(6)
        expect(result.y).to.equal(9)
      })
      it('float value', () => {
        const vec2 = new Vector2({x: 2, y: 3})
        const result = Vector2.multScalar(1.5, vec2)
        expect(result.x).to.equal(3)
        expect(result.y).to.equal(4.5)
      })
    })
    describe('#negated', () => {
      it('positive number', () => {
        const vec2 = new Vector2({x: 2, y: 3})
        const result = Vector2.negated(vec2)
        expect(vec2.x).to.equal(2)
        expect(vec2.y).to.equal(3)
        expect(result.x).to.equal(-2)
        expect(result.y).to.equal(-3)
      })
      it('negative number', () => {
        const vec2 = new Vector2({x: -3, y: -4})
        const result = Vector2.negated(vec2)
        expect(vec2.x).to.equal(-3)
        expect(vec2.y).to.equal(-4)
        expect(result.x).to.equal(3)
        expect(result.y).to.equal(4)
      })
    })
  })
})
