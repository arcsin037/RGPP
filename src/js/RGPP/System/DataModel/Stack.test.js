'use strict'

import Stack from './Stack'
import {
    expect
} from 'chai'

describe('Stack', () => {
    it('#push / #pop', () => {
        const stack = new Stack()
        const stack2 = new Stack()

        stack.push(2)
        stack.push(3)

        expect(stack.pop()).to.equal(3)
        expect(stack.size()).to.equal(1)
        expect(stack.pop()).to.equal(2)
        expect(stack.pop()).to.equal(null)

        expect(stack2.pop()).to.equal(null)
    })
    it('#isEmpty', () => {
        const stack = new Stack()

        stack.push(2)
        stack.push(3)
        stack.pop()
        expect(stack.isEmpty()).to.equal(false)
        stack.pop()
        expect(stack.isEmpty()).to.equal(true)
    })

})
