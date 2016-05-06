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

// private
//let this.head = null,
// let this.count = 0

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
        this.head = null
        this.count = 0
    }

    /**
     * push data to list
     * @method push
     * @param data Data to push list.
     */
    push(data) {
        let head = this.head
        if (this.head === null) {
            this.head = new Item(data)
            head = this.head
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
        ++this.count
    }

    /**
    *  pop data
    *
    */
    pop(index) {
        index = (index === undefined) ? 0 : index

        const n = this.size()
        let wp = this.head
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
    remove(index) {
        if (index === undefined) {
            console.error('please input index')
            return false
        }
        const n = this.size()
        let wp = this.head

        for (let i = 0; i < n; ++i) {
            if (i === index) {
                let prev = wp.prev
                let next = wp.next
                prev.next = next
                next.prev = prev
                wp.next = null
                wp.prev = null
                wp = null
                if (i === 0) { //remove head
                    this.head = next
                }
                if (this.head.next === null) {
                    this.head = null
                }
                this.count -= 1
                return true
            }
            wp = wp.next
        }
        return false
    }
    
    size() {
        return this.count
    }

    //return index
    insert(index, data) {
        var prev = null
        var next = null
        var item = null
        if (index === undefined) {
            return this.push(data)
        }
        var n = this.size()
            //header is null
        if (n === 0) {
            this.head = new Item(data)
            var head = this.head
            head.next = head
            head.prev = head
            ++this.count
            return index
        }

        var wp = this.head
        for (var i = 0; i < n; ++i) {
            if (wp.index() == index) {
                wp.setData(data)
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
                    this.head = item
                }
                ++this.count
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
        ++this.count
        return index
    }

    //Debug
    debugDisplay() {
        var n = this.size()

        if (n === 0) {
            console.log('list size is 0')
            return
        }
        var wp = this.head

        for (var i = 0; i < n; ++i) {
            console.log(wp.index() + ', ' + wp.data)
            wp = wp.next
        }
    }

    //return array
    datas() {
        var n = this.size()
        var array = []
        var wp = this.head
        for (var i = 0; i < n; ++i) {
            array[i] = wp.data
            wp = wp.next
        }
        return array
    }

    //return data
    data(index) {
        if (index >= this.size() || index < 0) {
            console.error('[List.js] return null --- over list size')
            return null
        }
        var wp = this.head
        for (var i = 0; i < index; ++i) {
            wp = wp.next
        }
        return wp.data
    }

    clear() {
        this.head = null
        this.count = 0
    }

    isEmpty() {
        if (this.count === 0) {
            return true
        }
        return false
    }

    copy() {
        var ret = List()
        var wp = this.head
        for (var i = 0, n = this.size(); i < n; ++i) {
            ret.push(wp.data)
            wp = wp.next
        }
        return ret
    }

    sortedDatas(sortFunction) {
        var sortedDataArray = this.datas()
        sortedDataArray.sort(sortFunction)
        return sortedDataArray
    }

}

export default List
