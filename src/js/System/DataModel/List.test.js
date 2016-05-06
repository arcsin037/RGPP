'use strict'

import List from './List'
import {
    expect
} from 'chai'

describe('List', () => {
    it('push Number', () => {
        const list = new List()
        const list2 = new List()

        list.push(2)
        list.push(3)
        list2.push(1)

        expect(list.data(0)).to.equal(2)
        expect(list.data(1)).to.equal(3)
        expect(list.size()).to.equal(2)

        expect(list2.data(0)).to.equal(1)
    })
    it('pop', () => {
        const list = new List()
        const list2 = new List()

        list.push(2)
        list.push(3)

        list2.push(1)
        list2.pop()

        expect(list.pop()).to.equal(2)
        expect(list.data(0)).to.equal(3)
        expect(list.size()).to.equal(1)

        expect(list2.pop()).to.equal(null)
    })
})
