/*
import Spinner from './Spinner'
import {
    expect
} from 'chai'
import jsdom from 'mocha-jsdom'

describe('Spinner', () => {
    let $
    jsdom()

    before(() => {
        $ = require('jquery')
    })

    describe('#element', () => {
        const testCases = [{
            name: 'arg is undefined',
            expectedValue: 'input'
        }, {
            name: 'arg is {}',
            arg: {},
            expectedValue: 'input'
        }, {
            name: 'arg.key = "<input>"',
            arg: {
                key: '<input>'
            },
            expectedValue: 'input'
        }]

        const isEqual = ($element, expectedValue) => {
            if (typeof expectedValue === 'undefined') {
                return $element === expectedValue
            }
            return $element.is(expectedValue)
        }

        testCases.forEach((test) => {

            it('Spinner test', () => {
                const spinner = new Spinner(test.arg, $)
                expect(spinner.getValue()).to.be.undefined

                spinner.setValue(2)

                expect(spinner.getValue()).to.be.undefined
            })

            it(`${test.name} arg.key ver.`, () => {
                const spinner = new Spinner(test.arg, $)
                const $element = spinner.element
                expect(isEqual($element, test.expectedValue)).to.be.true
            })

            it(`${test.name} $element is $("<input>")`, () => {
                const $element = $('<input>')
                test.arg = test.arg || {}
                const uiBase = new Spinner({
                    $element,
                    key: test.arg.key
                }, $)

                expect(uiBase.element).to.equal($element)
            })
        })

    })
})
*/
