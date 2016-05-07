'use strict'
import RGPP from './RGPP'
import {
    expect
} from 'chai'

describe('RGPP', () => {
    before(() => {
        console.log('RGPP = ', RGPP)
    })
    const assert = require('assert')

    describe('#System.exportsAsSingleton', () => {

        before((done) => {
            const Test = () => {
                const that = {}
                that.id = 1
                return that
            }
            const Test2 = () => {
                const that = {}
                that.id = 1
                return that
            }

            RGPP.System.exportsAsSingleton({
                name: 'Test',
                constructorFunc: Test
            })
            RGPP.System.exportsAsSingleton({
                name: 'Test2',
                constructorFunc: Test2
            })

            done()
        })

        it('same singleton test', () => {
            const test1 = RGPP.System.Test.getInstance()
            const test2 = RGPP.System.Test.getInstance()
            expect(test1).to.equal(test2)
        })

        it('another singleton test 2', () => {
            const test1 = RGPP.System.Test.getInstance()
            const test2 = RGPP.System.Test2.getInstance()
            assert.strictEqual(test1 === test2, false, 'test1 & test2 are same object')
        })
    })

    describe('#setConfigParam / #getConfigParam', () => {
        const testCases = [{
            configName: 'GAME_NAME',
            configValue: 'Test Game',
            expectedValue: 'Test Game'
        }, {
            configName: 'RESOLUTION_X',
            configValue: 1280,
            expectedValue: 1280
        }, {
            configName: 'RESOLUTION_Y',
            configValue: 960,
            expectedValue: 960
        }, {
            configName: 'DEBUG_BOOT_MODE',
            configValue: false,
            expectedValue: false
        }, {
            configName: 'foo',
            configValue: false,
            expectedValue: false
        }, {
            configName: '',
            configValue: '',
            expectedValue: ''
        }, {
            configName: 'DEFAULT_FONT',
            configValue: '2.5em serif',
            expectedValue: '2.5em serif'
        }, {
            configName: 0,
            configValue: 9,
            expectedValue: undefined
        }, {
            configName: 1,
            configValue: 10,
            expectedValue: undefined
        }, {
            configName: -1,
            configValue: -10,
            expectedValue: undefined
        }, {
            configName: {},
            configValue: {
                test: 'test'
            },
            expectedValue: undefined
        }, {
            configName: [],
            configValue: 'array',
            expectedValue: undefined
        }, {
            configName: undefined,
            configValue: 'undefined',
            expectedValue: undefined
        }, {
            configName: null,
            configValue: null,
            expectedValue: undefined
        }, {
            configName: 'setConfigParam',
            configValue: () => {},
            expectedValue: undefined
        }, {
            configName: 'getConfigParam',
            configValue: () => {},
            expectedValue: undefined
        }, {
            configName: 'getConfigParam2',
            configValue: 2,
            expectedValue: 2
        }]

        testCases.forEach((test) => {
            it(`set ${test.configValue} <${typeof test.configValue}> to ${test.configName} <${typeof test.configName}> => ${test.expectedValue}`,
                () => {
                    RGPP.setConfigParam(test.configName, test.configValue)
                    expect(RGPP.getConfigParam(test.configName)).to.equal(test.expectedValue)
                })
        })
    })

})
