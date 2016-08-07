/**
 * Coordinate System operator
 * @class Coordinate System operator
 * @author arcsin
 * @constructor
 */
export class CoordinateSystem {
    constructor() {
        this.scrollX = 0
        this.scrollY = 0
    }

    setScrollXY(x, y) {
        this.scrollX = x
        this.scrollY = y
    }

    getScrollX() {
        return this.scrollX
    }

    getScrollY() {
        return this.scrollY
    }

    convertMapToScreenX(x) {
        return x + this.scrollX
    }

    convertMapToScreenY(y) {
        return y + this.scrollY
    }

    convertScreenToMapX(x) {
        return x - this.scrollX
    }

    convertScreenToMapY(y) {
        return y - this.scrollY
    }
}

export default CoordinateSystem
