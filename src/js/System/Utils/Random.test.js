'use strict'
import Random from './Random'
import {
    expect
} from 'chai'

describe('Random', () => {
    const random = Random
    const MAX_LOOP_NUM = 100
    const testCases = [{
        from: 0,
        to: 1
    }, {
        from: -1,
        to: 1
    }, {
        from: -1.5,
        to: 1.5
    }, {
        from: 0,
        to: 0
    }, {
        from: -100,
        to: 200
    }, {
        from: -5000,
        to: 4000
    }, {
        from: 0.5,
        to: -20.5
    }, {
        from: -0.2,
        to: -0.3
    }, {
        from: -5,
        to: -7
    }, {
        from: 5,
        to: 7
    }, {
        from: 0.5,
        to: 0.2
    }, {
        from: 0.7,
        to: -0.4
    }, {
        from: 10000,
        to: 0
    }, {
        from: 20.5,
        to: -10.5
    }, {
        from: 0,
        to: -1
    }, {
        from: 1.5,
        to: -1.5
    }]

    describe('#createRandFloat', () => {

        testCases.forEach((test) => {
            it(`${test.from} ~ ${test.to}`, () => {

                for (let i = 0; i < MAX_LOOP_NUM; i += 1) {
                    const result = random.createRandFloat({
                        from: test.from,
                        to: test.to
                    })

                    const range = Math.abs(test.to - test.from) / 2
                    const base = (test.from + test.to) / 2
                    expect(result).to.be.closeTo(base, range)

                }
            })

        })
    })

    describe('#createRandInt', () => {
        testCases.forEach((test) => {
            it(`${test.from} ~ ${test.to}`, () => {

                for (let i = 0; i < MAX_LOOP_NUM; i += 1) {
                    const result = random.createRandInt({
                        from: test.from,
                        to: test.to
                    })
                    const fromInteger = parseInt(test.from, 10)
                    const toInteger = parseInt(test.to, 10)
                    const range = Math.abs(toInteger - fromInteger) / 2
                    const base = (fromInteger + toInteger) / 2
                    expect(result).to.be.closeTo(base, range)
                    expect(result).to.be.equal(parseInt(result, 10))
                }
            })

        })

    })

    describe('#createRandSign', () => {
        it('-1 or 1', () => {
            for (let i = 0; i < MAX_LOOP_NUM; i += 1) {
                const value = random.createRandSign()
                const result = value === -1 || value === 1
                expect(result).to.be.ok
            }
        })
    })

})
