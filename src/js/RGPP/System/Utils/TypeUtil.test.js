'use strict'
import TypeUtil from './TypeUtil'
import {
    expect
} from 'chai'

describe('TypeUtil', () => {
  describe('Type Utility Functions', () => {
    const typeUtil = TypeUtil

    const testCases = [{
      data: '',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: '',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: ' ',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: 'test',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: false,
      isDefined: true,
      isString: false,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: true,
      isDefined: true,
      isString: false,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: NaN,
      isDefined: true,
      isString: false,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: '30.0',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: true
    }, {
      data: '20.80',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: true
    }, {
      data: '-20.85',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: true
    }, {
      data: '-1',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: true
    }, {
      data: '-1.5',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: true
    }, {
      data: '0',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: true
    }, {
      data: '.42',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: true
    }, {
      data: '99,999',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: '1.2.3',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: '0x89f',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: true
    }, {
      data: '#abcdef',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: '\t\t',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: '\n\r',
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: 8e5,
      isDefined: true,
      isString: false,
      isInteger: true,
      isFiniteNumber: true,
      isNumeric: true
    }, {
      data: Infinity,
      isDefined: true,
      isString: false,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: -Infinity,
      isDefined: true,
      isString: false,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: 0.0,
      isDefined: true,
      isString: false,
      isInteger: true,
      isFiniteNumber: true,
      isNumeric: true
    }, {
      data: 0,
      isDefined: true,
      isString: false,
      isInteger: true,
      isFiniteNumber: true,
      isNumeric: true
    }, {
      data: 1,
      isDefined: true,
      isString: false,
      isInteger: true,
      isFiniteNumber: true,
      isNumeric: true
    }, {
      data: -1,
      isDefined: true,
      isString: false,
      isInteger: true,
      isFiniteNumber: true,
      isNumeric: true
    }, {
      data: 0.1,
      isDefined: true,
      isString: false,
      isInteger: false,
      isFiniteNumber: true,
      isNumeric: true
    }, {
      data: -0.1,
      isDefined: true,
      isString: false,
      isInteger: false,
      isFiniteNumber: true,
      isNumeric: true
    }, {
      data: 0x8ef,
      isDefined: true,
      isString: false,
      isInteger: true,
      isFiniteNumber: true,
      isNumeric: true
    }, {
      data: undefined,
      isDefined: false,
      isString: false,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: null,
      isDefined: true,
      isString: false,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: String(),
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: String('test'),
      isDefined: true,
      isString: true,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: {},
      isDefined: true,
      isString: false,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }, {
      data: [],
      isDefined: true,
      isString: false,
      isInteger: false,
      isFiniteNumber: false,
      isNumeric: false
    }]

    describe('#isDefined / #isUnDefined', () => {
      testCases.forEach((test) => {
        const notString = test.isDefined === false ? 'un' : ''
        it(`${test.data} <${typeof test.data}> is ${notString}defined`, () => {
                    // is defined
          const resultIsDefined = typeUtil.isDefined(test.data)
          expect(resultIsDefined).to.equal(test.isDefined)
                        // is undefined
          const resultIsUndefined = typeUtil.isUndefined(test.data)
          expect(resultIsUndefined).to.equal(!test.isDefined)
        })
      })
    })

    describe('#isString', () => {
      testCases.forEach((test) => {
        const notString = test.isString === false ? 'not' : ''
        it(`${test.data} <${typeof test.data}> is ${notString} String`, () => {
          const result = typeUtil.isString(test.data)
          expect(result).to.equal(test.isString)
        })
      })
    })

    describe('#isIntegerType', () => {
      testCases.forEach((test) => {
        const notString = test.isInteger === false ? 'not' : ''
        it(`${test.data} <${typeof test.data}> is ${notString} integer value`, () => {
          const result = typeUtil.isIntegerType(test.data)
          expect(result).to.equal(test.isInteger)
        })
      })
    })

    describe('#isFiniteNumber', () => {
      testCases.forEach((test) => {
        const notString = test.isFiniteNumber === false ? 'not' : ''
        it(`${test.data} <${typeof test.data}> is ${notString} finite number`, () => {
          const result = typeUtil.isFiniteNumber(test.data)
          expect(result).to.equal(test.isFiniteNumber)
        })
      })
    })

    describe('#isNumeric', () => {
      testCases.forEach((test) => {
        const notString = test.isNumeric === false ? 'not' : ''
        it(`${test.data} <${typeof test.data}> is ${notString} numric`, () => {
          const result = typeUtil.isNumeric(test.data)
          expect(result).to.equal(test.isNumeric)
        })
      })
    })
  })
})
