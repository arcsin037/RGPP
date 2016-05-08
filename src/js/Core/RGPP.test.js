'use strict'
import RGPP from './index'
import {
    expect
} from 'chai'

describe('RGPP', () => {
    /*
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
    */
})
