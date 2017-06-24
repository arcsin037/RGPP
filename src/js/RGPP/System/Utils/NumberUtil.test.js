'use strict'

import NumberUtil from './NumberUtil'

import {
    expect
} from 'chai'

describe('NumberUtil', () => {
  describe('#clamp', () => {
    const testCases = [{
      value: 1,
      min: 0,
      max: 2,
      result: 1
    }, {
      value: 1,
      min: -1,
      max: 5,
      result: 1
    }, {
      value: 10,
      min: 0,
      max: 2,
      result: 2
    }, {
      value: 1,
      min: -3,
      max: -1,
      result: -1
    }, {
      value: -5,
      min: -3,
      max: -1,
      result: -3
    }]

    testCases.forEach((testCase) => {
      it(`{value: ${testCase.value} min: ${testCase.min}, max: ${testCase.max}} => ${testCase.result}`, () => {
        expect(NumberUtil.clamp(testCase.value, testCase.min, testCase.max)).to.equal(testCase.result)
      })
    })
  })
})
