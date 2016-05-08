/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

/**
 * Stack structure
 * @class Stack
 * @author arcsin
 * @constructor
 */
export default class Stack {
    constructor() {
        this.items = []
    }
    /**
     * push object to stack
     * @method push
     * @param {object} obj
     */
    push(obj) {
        this.items.push(obj)
    }

    /**
     * pop object to stack
     * @method pop
     * @return object
     */
    pop() {
        if (this.items.length > 0) {
            return this.items.pop()
        }
        return null
    }

    /**
     * size of stack
     * @method size
     * @return size of stack
     */
    size() {
        return this.items.length
    }

    /**
     * clear stack
     * @method clear
     */
    clear() {
        this.items = []
    }

    /**
     * whether the stack is empty
     * @method isEmpty
     */
    isEmpty() {
        if (this.items.length === 0) {
            return true
        }
        return false
    }
}
