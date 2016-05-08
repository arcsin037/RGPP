'use strict'
import RGPP from 'RGPP'
import ScriptUtil from './ScriptUtil'
import assert from 'assert'
import {
    expect
} from 'chai'

describe('ScriptUtil', () => {
    describe('#memolizer', () => {
        describe('fibonacci', () => {
            const fibonacci = ScriptUtil.memolizer([0, 1], (shell, n) => shell(n - 1) + shell(n - 2))

            const testCases = [{
                n: 0,
                expectedValue: 0
            }, {
                n: 1,
                expectedValue: 1
            }, {
                n: 2,
                expectedValue: 1
            }, {
                n: 3,
                expectedValue: 2
            }, {
                n: 4,
                expectedValue: 3
            }, {
                n: 5,
                expectedValue: 5
            }, {
                n: 6,
                expectedValue: 8
            }, {
                n: 7,
                expectedValue: 13
            }, {
                n: 78,
                expectedValue: 8944394323791464
            }]

            testCases.forEach((test) => {
                it(`[${test.n}] is ${test.expectedValue}`, () => {
                    expect(fibonacci(test.n)).to.equal(test.expectedValue)
                })
            })

        })

        describe('factorial', () => {
            const factorial = ScriptUtil.memolizer([1, 1], (shell, n) => n * shell(n - 1))

            const testCases = [{
                n: 0,
                expectedValue: 1
            }, {
                n: 1,
                expectedValue: 1
            }, {
                n: 2,
                expectedValue: 2
            }, {
                n: 3,
                expectedValue: 6
            }, {
                n: 4,
                expectedValue: 24
            }, {
                n: 5,
                expectedValue: 120
            }, {
                n: 6,
                expectedValue: 720
            }, {
                n: 7,
                expectedValue: 5040
            }, {
                n: 10,
                expectedValue: 3628800
            }, {
                n: 18,
                expectedValue: 6402373705728000
            }, {
                n: 19,
                expectedValue: 121645100408832000
            }, {
                n: 56,
                expectedValue: 710998587804863451854045647463724949736497978881168458687447040000000000000
            }, {
                n: 10,
                expectedValue: 3628800
            }]

            testCases.forEach((test) => {
                it(`[${test.n}] is ${test.expectedValue}`, () => {
                    expect(factorial(test.n)).to.equal(test.expectedValue)
                })
            })
        })
    })

    describe('#terminate / #debugBreak / #outputMsgToConsole / #outputErrMsgToConsole', () => {
        const testCases = [{
            debugBootMode: false
        }, {
            debugBootMode: true
        }]

        const message = 'test message'

        const checkNoErrorFunction = (func) => {
            assert.doesNotThrow(() => {
                func(message)
            }, Error, 'Error is occured')
        }

        testCases.forEach((test) => {
            describe(`debug boot mode = ${test.debugBootMode}`, () => {
                before(() => {
                    RGPP.Config.setConfigParam('DEBUG_BOOT_MODE', test.debugBootMode)
                })
                it('#terminate', () => {
                    checkNoErrorFunction(ScriptUtil.terminate)
                })
                it('#debugBreak', () => {
                    checkNoErrorFunction(ScriptUtil.debugBreak)
                })

                it('#outputMsgToConsole', () => {
                    checkNoErrorFunction(ScriptUtil.outputMsgToConsole)
                })

                it('#outputErrMsgToConsole', () => {
                    checkNoErrorFunction(ScriptUtil.outputErrMsgToConsole)
                })
            })
        })
    })

    describe('#assert', () => {
        const message = 'error message'

        const assertTest = (test, debugBootMode) => {
            RGPP.Config.setConfigParam('DEBUG_BOOT_MODE', debugBootMode)
            if (test.assertion) {
                assert.throws(() => {
                    ScriptUtil.assert(test.booleanValue, message)
                }, Error, 'Error is not occured')
            } else {
                assert.doesNotThrow(() => {
                    ScriptUtil.assert(test.booleanValue, message)
                }, Error, 'Error is occured')
            }
        }

        describe('debug boot mode = false', () => {
            const testCases = [{
                booleanValue: false,
                assertion: false
            }, {
                booleanValue: true,
                assertion: false
            }, {
                booleanValue: undefined,
                assertion: false
            }, {
                booleanValue: null,
                assertion: false
            }, {
                booleanValue: 0,
                assertion: false
            }, {
                booleanValue: -1,
                assertion: false
            }, {
                booleanValue: 1,
                assertion: false
            }, {
                booleanValue: NaN,
                assertion: false
            }, {
                booleanValue: '',
                assertion: false
            }, {
                booleanValue: 'test',
                assertion: false
            }, {
                booleanValue: {},
                assertion: false
            }]

            testCases.forEach((test) => {
                it(`value = ${test.booleanValue} / assertion? ${test.assertion}`,
                    () => {
                        assertTest(test, false)
                    })
            })
        })

        describe('debug boot mode = true', () => {
            const testCases = [{
                booleanValue: false,
                assertion: true
            }, {
                booleanValue: true,
                assertion: false
            }, {
                booleanValue: undefined,
                assertion: true
            }, {
                booleanValue: null,
                assertion: true
            }, {
                booleanValue: 0,
                assertion: true
            }, {
                booleanValue: -1,
                assertion: false
            }, {
                booleanValue: 1,
                assertion: false
            }, {
                booleanValue: NaN,
                assertion: true
            }, {
                booleanValue: '',
                assertion: true
            }, {
                booleanValue: 'test',
                assertion: false
            }, {
                booleanValue: {},
                assertion: false
            }, {
                booleanValue: [],
                assertion: false
            }]

            testCases.forEach((test) => {
                it(`value = ${test.booleanValue} / assertion? ${test.assertion}`,
                    () => {
                        assertTest(test, true)
                    })
            })
        })
    })
})
