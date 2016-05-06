'use strict'

import {
    expect
} from 'chai'
import assert from 'assert'
import List from './List'

describe('List', () => {
    describe("#push", () => {
        it('push Number', () => {
            var list = new List()
            var list2 = new List()
            console.log(List)
            console.log(list)
            list.push(2)
            list.push(3)
            list2.push(1)
            expect(list.data(0)).to.equal(2)
            expect(list.data(1)).to.equal(3)
            expect(list2.data(0)).to.equal(1)
            console.log(list.head)
        })
    })
})
