'use strict'
import Timer from './Timer'
import {
    expect
} from 'chai'

describe('Timer', () => {

    describe('#measureFPS', () => {
        /**
         * Measuring FPS (Test code)
         */
        function measureFPS(expected_fps, done) {
            const timer = new Timer()
            const interval = parseInt(1000 / expected_fps + 0.5, 10)
            timer.measureFPS()
            setTimeout(() => {
                const fps = timer.measureFPS()
                expect(parseInt(fps + 0.5, 10)).to.equal(expected_fps)
                done()
            }, interval)
        }

        const testCases = [{
            fps: 1
        }, {
            fps: 5
        }, {
            fps: 10
        }, {
            fps: 20
        }]

        testCases.forEach((test) => {
            it(`Test of measuring ${test.fps} FPS`, (done) => {
                measureFPS(test.fps, done)
            })
        })
    })

    describe('#getCurrentTime', () => {
        /**
         * Get current time test (Test code)
         */
        const getCurrentTimeTest = (expected_time, done) => {
            const timer = new Timer()
            const prev = timer.getCurrentTime()
            setTimeout(() => {
                const current = timer.getCurrentTime()
                expect(parseInt((current - prev) + 0.5, 10)).to.equal(expected_time)
                done()
            }, expected_time)
        }
        const testCases = [{
            elapsedTime: 100
        }, {
            elapsedTime: 200
        }, {
            elapsedTime: 300
        }, {
            elapsedTime: 600
        }]

        testCases.forEach((test) => {
            it(`Elapsed Time ${test.elapsedTime} (ms)`, (done) => {
                getCurrentTimeTest(test.elapsedTime, done)
            })
        })
    })
})
