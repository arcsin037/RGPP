'use strict'

import StringUtil from './StringUtil'
import assert from 'assert'
import {
    expect
} from 'chai'

describe('StringUtil', () => {
  describe('#isEmptyString', () => {
    const testCases = [{
      data: '',
      expectedValue: true
    }, {
      data: '',
      expectedValue: true
    }, {
      data: ' ',
      expectedValue: false
    }, {
      data: 'test',
      expectedValue: false
    }, {
      data: false,
      expectedValue: false
    }, {
      data: true,
      expectedValue: false
    }, {
      data: 0,
      expectedValue: false
    }, {
      data: 1,
      expectedValue: false
    }, {
      data: -1,
      expectedValue: false
    }, {
      data: undefined,
      expectedValue: false
    }, {
      data: null,
      expectedValue: false
    }, {
      data: String(),
      expectedValue: true
    }, {
      data: String('test'),
      expectedValue: false
    }, {
      data: {},
      expectedValue: false
    }, {
      data: [],
      expectedValue: false
    }]

    testCases.forEach((test) => {
      const notString = test.expectedValue === false ? 'not' : ''
      it(`${test.data}<${typeof test.data}> is ${notString} Empty String`, () => {
        const result = StringUtil.isEmptyString(test.data)
        expect(result).to.equal(test.expectedValue)
      })
    })
  })

  describe('#substitute', () => {
    const originalStr = 'hellohellohello'

    const testCases = [{
      searchStr: 'll',
      replacementStr: 'mm',
      expectedValue: 'hemmohemmohemmo'
    }, {
      searchStr: 'hello',
      replacementStr: 'hellohello',
      expectedValue: 'hellohellohellohellohellohello'
    }, {
      searchStr: 'll',
      replacementStr: 'll',
      expectedValue: 'hellohellohello'
    }, {
      searchStr: 'll',
      replacementStr: '',
      expectedValue: 'heoheoheo'
    }, {
      searchStr: '',
      replacementStr: '',
      expectedValue: 'hellohellohello'
    }, {
      searchStr: 'hellohellohello',
      replacementStr: '',
      expectedValue: ''
    }]

    testCases.forEach((test) => {
      it(`substitue ${test.searchStr} -> ${test.replacementStr}`, () => {
        const result = StringUtil.substitute(originalStr, test.searchStr, test.replacementStr)
        expect(result).to.equal(test.expectedValue)
      })
    })
  })

  describe('#extractFileNameExceptForExtension', () => {
    const testCases = [{
      fileName: 'test.js',
      expectedValue: 'test'
    }, {
      fileName: 'test',
      expectedValue: 'test'
    }, {
      fileName: 'test.test.js',
      expectedValue: 'test.test'
    }, {
      fileName: 'test.test.test.js',
      expectedValue: 'test.test.test'
    }, {
      fileName: '.js',
      expectedValue: ''
    }, {
      fileName: '',
      expectedValue: ''
    }]

    testCases.forEach((test) => {
      it(`extract ${test.expectedValue} from ${test.fileName}`, () => {
        const result = StringUtil.extractFileNameExceptForExtension(test.fileName)
        expect(result).to.equal(test.expectedValue)
      })
    })

    const assertTestCases = [{
      fileName: 0
    }, {
      fileName: null
    }, {
      fileName: undefined
    }, {
      fileName: {}
    }]

    assertTestCases.forEach((test) => {
      const objectType = test.fileName === null ? null : typeof test.fileName
      it(`Error file name ${objectType}`, () => {
        assert.throws(() =>
                    StringUtil.extractFileNameExceptForExtension(test.fileName),
                    `can not input ${objectType}`)
      })
    })
  })

  describe('#extractExtension', () => {
    const testCases = [{
      fileName: 'test.js',
      expectedValue: 'js'
    }, {
      fileName: 'test',
      expectedValue: ''
    }, {
      fileName: 'test.test.js',
      expectedValue: 'js'
    }, {
      fileName: 'test.test.test.js',
      expectedValue: 'js'
    }, {
      fileName: '.js',
      expectedValue: 'js'
    }, {
      fileName: '',
      expectedValue: ''
    }]

    testCases.forEach((test) => {
      it(`extract ${test.expectedValue} from ${test.fileName}`, () => {
        const result = StringUtil.extractExtension(test.fileName)
        expect(result).to.equal(test.expectedValue)
      })
    })

    const assertTestCases = [{
      fileName: 0
    }, {
      fileName: null
    }, {
      fileName: undefined
    }, {
      fileName: {}
    }]

    assertTestCases.forEach((test) => {
      const objectType = test.fileName === null ? null : typeof test.fileName
      it(`Error file name is ${objectType}`, () => {
        assert.throws(() =>
                    StringUtil.extractExtension(test.fileName),
                    `can not input ${objectType}`)
      })
    })
  })
})
