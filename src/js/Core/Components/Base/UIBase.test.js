'use strict'

import UIBase from './UIBase'
import {
    expect
} from 'chai'
import jsdom from 'mocha-jsdom'

describe('UIBase', () => {
    let $
    jsdom()

    before(() => {
        $ = require('jquery')
    })

    describe('#element', () => {
        const testCases = [{
            name: 'Test of div element',
            arg: {
                key: '<div>'
            },
            expectedValue: 'div'
        }, {
            name: 'Test of input element',
            arg: {
                key: '<input>'
            },
            expectedValue: 'input'
        }, {
            name: 'Test of input element with undefined',
            arg: {
                $element: undefined,
                key: '<input>'
            },
            expectedValue: 'input'
        }, {
            name: 'Test of ul element',
            arg: {
                key: '<ul>'
            },
            expectedValue: 'ul'
        }, {
            name: 'Test of li element',
            arg: {
                key: '<li>'
            },
            expectedValue: 'li'
        }, {
            name: 'Test of empty element',
            expectedValue: undefined
        }]

        const isEqual = ($element, expectedValue) => {
            if (typeof expectedValue === 'undefined') {
                return $element === expectedValue
            }
            return $element.is(expectedValue)
        }

        testCases.forEach((test) => {
            it(`${test.name} arg.key ver.`, () => {
                const uiBase = new UIBase(test.arg, $)
                const $element = uiBase.element
                expect(isEqual($element, test.expectedValue)).to.be.true
            })

            it(`${test.name} arg.$element ver.`, () => {
                const arg = test.arg || {}
                const $element = (arg.key && $(arg.key))
                const uiBase = new UIBase({
                    $element,
                    key: arg.key
                }, $)

                expect(uiBase.element).to.equal($element)
            })
        })

    })
})
