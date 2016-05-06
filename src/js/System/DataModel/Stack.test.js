'use strict'

import Stack from './Stack'
import {
    expect
} from 'chai'

describe('Stack', () => {
    it('#push', () => {
        const stack = new Stack()
        const stack2 = new Stack()

        stack.push(2)
        stack.push(3)
        stack2.push(1)

        expect(stack.data(0)).to.equal(2)
        expect(stack.data(1)).to.equal(3)
        expect(stack.size()).to.equal(2)

        expect(stack2.data(0)).to.equal(1)
    })
    it('#pop', () => {
        const stack = new Stack()
        const stack2 = new Stack()

        stack.push(2)
        stack.push(3)

        stack2.push(1)
        stack2.pop()

        expect(stack.pop()).to.equal(2)
        expect(stack.data(0)).to.equal(3)
        expect(stack.size()).to.equal(1)

        expect(stack2.pop()).to.equal(null)
    })

})
