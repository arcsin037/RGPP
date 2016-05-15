import SelectBox from './SelectBox'
import {
    expect
} from 'chai'
import jsdom from 'mocha-jsdom'

describe('SelectBox', () => {
    let $
    jsdom()

    before(() => {
        $ = require('jquery')
    })

    describe('#element', () => {
        const testCases = [{
            name: 'arg is undefined',
            expectedValue: 'select'
        }, {
            name: 'arg is {}',
            arg: {},
            expectedValue: 'select'
        }, {
            name: 'arg.key = "<select>"',
            arg: {
                key: '<select>'
            },
            expectedValue: 'select'
        }]

        const isEqual = ($element, expectedValue) => {
            if (typeof expectedValue === 'undefined') {
                return $element === expectedValue
            }
            return $element.is(expectedValue)
        }

        testCases.forEach((test) => {

            it('SelectBox test', () => {
                const selectBox = new SelectBox(test.arg, $)
                expect(selectBox.selectedIndex).to.be.zero
            })

            it(`${test.name} arg.key ver.`, () => {
                const selectBox = new SelectBox(test.arg, $)
                const $element = selectBox.element
                expect(isEqual($element, test.expectedValue)).to.be.true
            })

            it(`${test.name} $element is $('<select>')`, () => {
                const $element = $('<select>')
                test.arg = test.arg || {}
                const selectBox = new SelectBox({
                    $element,
                    key: test.arg.key
                }, $)

                expect(selectBox.element).to.equal($element)
            })
        })

    })
})
