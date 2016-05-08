'use strict'

/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
/**
 * List structure
 * @class List
 * @author arcsin
 * @constructor
 */

/**
 * Item of List
 * @class Item
 * @for List
 */
class Item {
    constructor(data) {
        this.data = data
        this.next = null
        this.prev = null
    }
}

export class List {
    constructor() {
        let mHead = null
        let mCount = 0

        /**
         * push data to list
         * @method push
         * @param data Data to push list.
         */
        this.push = (data) => {
            let head = mHead
            if (mHead === null) {
                mHead = new Item(data)
                head = mHead
                head.next = head
                head.prev = head
            } else {
                const item = new Item(data)
                const prev = head.prev
                head.prev = item
                prev.next = item
                item.prev = prev
                item.next = head
            }
            ++mCount
        }
        /**
         * pop data
         * @method pop
         * @param index
         */
        this.pop = (index) => {
            index = (index === undefined) ? 0 : index

            const n = this.size()
            let wp = mHead
            for (let i = 0; i < n; ++i) {
                if (i === index) {
                    const data = wp.data
                    this.remove(index)
                    return data
                }
                wp = wp.next
            }
            return null
        }
        //return true or false
        this.remove = (index) => {
            if (index === undefined) {
                console.error('please input index')
                return false
            }
            const n = this.size()
            let wp = mHead

            for (let i = 0; i < n; ++i) {
                if (i === index) {
                    const prev = wp.prev
                    const next = wp.next
                    prev.next = next
                    next.prev = prev
                    wp.next = null
                    wp.prev = null
                    wp = null
                    if (i === 0) { //remove head
                        mHead = next
                    }
                    if (mHead.next === null) {
                        mHead = null
                    }
                    mCount -= 1
                    return true
                }
                wp = wp.next
            }
            return false
        }

        this.size = () => mCount

        //return index
        this.insert = (index, data) => {
            let prev = null
            let next = null
            let item = null
            if (index === undefined) {
                return this.push(data)
            }
            const n = this.size()
                //header is null
            if (n === 0) {
                mHead = new Item(data)
                const head = mHead
                head.next = head
                head.prev = head
                ++mCount
                return index
            }

            let wp = mHead
            for (let i = 0; i < n; ++i) {
                if (wp.index() == index) {
                    wp.data = data
                    return index
                } else if (wp.index() > index) {
                    prev = wp.prev
                    next = wp
                    item = new Item(data)
                    prev.next = item
                    next.prev = item
                    item.next = next
                    item.prev = prev
                    if (i === 0) { //less than head index
                        mHead = item
                    }
                    ++mCount
                    return index
                }
                wp = wp.next
            }

            //More than Tail
            prev = wp.prev
            next = wp
            item = new Item(data)
            prev.next = item
            next.prev = item
            item.next = next
            item.prev = prev
            ++mCount
            return index
        }

        //Debug
        this.debugDisplay = () => {
            const n = this.size()

            if (n === 0) {
                console.log('list size is 0')
                return
            }
            let wp = mHead

            for (let i = 0; i < n; ++i) {
                console.log(`${wp.index()}, ${wp.data}`)
                wp = wp.next
            }
        }

        //return array
        this.datas = () => {
            const n = this.size()
            const array = []
            let wp = mHead
            for (let i = 0; i < n; ++i) {
                array[i] = wp.data
                wp = wp.next
            }
            return array
        }

        //return data
        this.data = (index) => {
            if (index >= this.size() || index < 0) {
                console.error('[List.js] return null --- over list size')
                return null
            }
            let wp = mHead
            for (let i = 0; i < index; ++i) {
                wp = wp.next
            }
            return wp.data
        }

        this.clear = () => {
            mHead = null
            mCount = 0
        }

        this.isEmpty = () => {
            if (mCount === 0) {
                return true
            }
            return false
        }

        this.copy = () => {
            const ret = new List()
            let wp = mHead
            for (let i = 0, n = this.size(); i < n; ++i) {
                ret.push(wp.data)
                wp = wp.next
            }
            return ret
        }

        this.sortedDatas = (sortFunction) => {
            const sortedDataArray = this.datas()
            sortedDataArray.sort(sortFunction)
            return sortedDataArray
        }
    }
}

export default List
